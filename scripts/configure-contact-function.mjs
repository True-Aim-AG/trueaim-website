// Writes api/src/generated-config.js from GitHub repository variables right
// before the function package is uploaded, so the same values serve staging
// and production without touching Azure. None of them is a secret.
import { writeFileSync } from "node:fs";

const values = {
  scriptUrl: process.env.GOOGLE_SCRIPT_URL || "",
  hubspotPortalId: process.env.HUBSPOT_PORTAL_ID || "",
  hubspotFormGuid: process.env.HUBSPOT_FORM_GUID || "",
};
if (!values.scriptUrl) console.log("::warning::GOOGLE_SCRIPT_URL is not set; leads will not reach the sheet");
if (!values.hubspotPortalId || !values.hubspotFormGuid) {
  console.log("::warning::NEXT_PUBLIC_HUBSPOT_PORTAL_ID or HUBSPOT_FORM_GUID is not set; leads will not reach HubSpot");
}
writeFileSync(
  "api/src/generated-config.js",
  Object.entries(values)
    .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};\n`)
    .join(""),
);
