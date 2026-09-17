import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const distribution = JSON.parse(await readFile(new URL("src/data/appDistribution.json", root), "utf8"));
const release = process.argv.includes("--release");
const allowedHosts = { ios: "apps.apple.com", android: "play.google.com" };
assert.equal(distribution.downloadPageUrl, "https://app.bballorbit.com/app");
assert.equal(distribution.webAppUrl, "https://app.bballorbit.com/");
assert.deepEqual(distribution.stores.map(({ id }) => id), ["ios", "android"]);

for (const store of distribution.stores) {
  await access(new URL(`public${store.badge}`, root));
  if (store.url === null) {
    assert.ok(!release, `${store.name}: public URL is missing. Release blocked until Apple approval and URL verification.`);
    console.log(`${store.name}: intentionally inactive in the local preview.`);
    continue;
  }
  const url = new URL(store.url);
  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, allowedHosts[store.id]);
  assert.equal(url.username + url.password, "");
  if (store.id === "ios") {
    assert.match(url.pathname, /\/id[1-9]\d{6,}$/);
  } else {
    assert.equal(url.pathname, "/store/apps/details");
    assert.equal(url.searchParams.get("id"), "com.bballorbit.practiceplanner");
  }
  console.log(`${store.name}: URL structure valid.`);
}
console.log(release ? "Distribution configuration is ready for release validation." : "Local app distribution checks passed.");
