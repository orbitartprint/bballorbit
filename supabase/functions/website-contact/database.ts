import { ContactServiceError } from "./handler.ts";

/** PostgREST returns 204, without JSON, for SQL functions returning void. */
export function createContactDatabase(url: string, serviceKey: string, fetcher: typeof fetch = fetch) {
  return async function rpc<T>(name: string, parameters: Record<string, unknown> = {}): Promise<T> {
    const response = await fetcher(`${url}/rest/v1/rpc/${name}`, {
      method: "POST", headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(parameters), signal: AbortSignal.timeout(10_000),
    });
    const result = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      if (result?.message === "CONTACT_RATE_LIMITED") throw new ContactServiceError(429, "Too many submissions. Please try again later.");
      if (result?.message === "IDEMPOTENCY_CONFLICT") throw new ContactServiceError(409, "This submission changed. Please refresh and try again.");
      throw new Error("Contact database request failed.");
    }
    return result as T;
  };
}
