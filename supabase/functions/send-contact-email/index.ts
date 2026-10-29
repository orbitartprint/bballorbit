import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  category?: string;
  subject: string;
  message: string;
  source?: string;
  user_id?: string;
  user_agent?: string;
  company?: string;
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const buildWithdrawalConfirmationEmail = ({
  safeName,
  safeMessage,
}: {
  safeName: string;
  safeMessage: string;
}) => ({
  text: [
    "BballOrbit Practice Planner",
    "",
    "We received your withdrawal declaration",
    "",
    `Hello ${safeName},`,
    "",
    "This email confirms that Basketball Orbit received your withdrawal declaration.",
    "",
    "Submitted details:",
    safeMessage.replace(/<br>/g, "\n"),
    "",
    "This confirmation only confirms receipt. We will review whether the request is within the applicable withdrawal or refund period and follow up if needed.",
    "",
    "Basketball Orbit",
    "info@bballorbit.com",
    "https://app.bballorbit.com/withdrawal",
  ].join("\n"),
  html: `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light">
        <title>We received your withdrawal declaration</title>
      </head>
      <body style="margin:0; padding:0; background:#f6f7f9; color:#171717; font-family:Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; background:#f6f7f9; margin:0; padding:0;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; max-width:560px; background:#ffffff; border:1px solid #e6e8eb; border-radius:12px; overflow:hidden;">
                <tr>
                  <td style="padding:22px 28px; background:#111827; color:#ffffff;">
                    <div style="font-size:18px; line-height:24px; font-weight:700;">
                      BballOrbit Practice Planner
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;">
                    <h1 style="margin:0 0 16px; color:#111827; font-size:24px; line-height:32px; font-weight:700;">
                      We received your withdrawal declaration
                    </h1>
                    <p style="margin:0 0 16px; color:#374151; font-size:16px; line-height:24px;">
                      Hello ${safeName},
                    </p>
                    <p style="margin:0 0 20px; color:#374151; font-size:16px; line-height:24px;">
                      This email confirms that Basketball Orbit received your withdrawal declaration.
                    </p>
                    <div style="margin:0 0 24px; background:#f9fafb; border:1px solid #e6e8eb; border-radius:10px; padding:16px 18px; color:#374151; font-size:14px; line-height:22px;">
                      ${safeMessage}
                    </div>
                    <p style="margin:0 0 16px; color:#4b5563; font-size:14px; line-height:22px;">
                      This confirmation only confirms receipt. We will review whether the request is within the applicable withdrawal or refund period and follow up if needed.
                    </p>
                    <p style="margin:0; color:#6b7280; font-size:13px; line-height:20px;">
                      You can find the withdrawal function here:<br>
                      <a href="https://app.bballorbit.com/withdrawal" style="color:#2d32f1; text-decoration:underline;">https://app.bballorbit.com/withdrawal</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px; background:#f9fafb; border-top:1px solid #e6e8eb; color:#6b7280; font-size:13px; line-height:20px;">
                    <strong style="color:#374151;">Basketball Orbit</strong><br>
                    <a href="mailto:info@bballorbit.com" style="color:#2d32f1; text-decoration:underline;">info@bballorbit.com</a><br>
                    <a href="https://app.bballorbit.com" style="color:#2d32f1; text-decoration:underline;">https://app.bballorbit.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Contact form submission received");

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    const {
      name,
      email,
      category,
      subject,
      message,
      source,
      user_id,
      user_agent,
      company,
    }: ContactFormData = await req.json();

    if (company?.trim()) {
      console.warn(`Honeypot field filled for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Contact form submitted successfully",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({
          error: "Too many submissions. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    if (name.length > 200 || email.length > 255 || subject.length > 500 || message.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again later." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Saving contact message to database");
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again later." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    console.log("Contact message saved successfully");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("Resend API key not configured");
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again later." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const resend = new Resend(resendApiKey);
    const isAppSubmission = source === "practice-planner-app";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCategory = category ? escapeHtml(category) : "Not provided";
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const safeUserId = user_id ? escapeHtml(user_id) : "";
    const safeUserAgent = user_agent ? escapeHtml(user_agent) : "";
    const isWithdrawalSubmission = source === "withdrawal-function";

    const emailTitle = isAppSubmission
      ? "New App Contact Form Submission"
      : isWithdrawalSubmission
        ? "New Withdrawal Declaration"
        : "New Contact Form Submission";
    const emailIntro = isAppSubmission
      ? "This message was sent through the Basketball Orbit Practice Planner app support form."
      : isWithdrawalSubmission
        ? "This message was sent through the Basketball Orbit electronic withdrawal function."
        : "This message was sent through the Basketball Orbit contact form.";

    console.log("Sending email notification");
    const emailResponse = await resend.emails.send({
      from: "Basketball Orbit <info@bballorbit.com>",
      to: ["info@bballorbit.com"],
      replyTo: email,
      subject: `${emailTitle}: ${safeSubject}`,
      html: `
        <h2>${emailTitle}</h2>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Category:</strong> ${safeCategory}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${safeMessage}
        </div>
        ${isAppSubmission ? `
          <hr>
          <p><strong>App context:</strong></p>
          <p><strong>User ID:</strong> ${safeUserId || "Not provided"}</p>
          <p><strong>User agent:</strong> ${safeUserAgent || "Not provided"}</p>
        ` : ""}
        <hr>
        <p><em>${emailIntro}</em></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    if (isWithdrawalSubmission) {
      const confirmationEmail = buildWithdrawalConfirmationEmail({ safeName, safeMessage });
      await resend.emails.send({
        from: "Basketball Orbit <info@bballorbit.com>",
        to: [email],
        subject: "We received your withdrawal declaration",
        text: confirmationEmail.text,
        html: confirmationEmail.html,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send message. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }
};

serve(handler);
