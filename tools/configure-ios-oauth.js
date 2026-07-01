const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "oauth-config.js");
const plistPath = path.join(root, "ios", "App", "App", "Info.plist");

function readRedirectScheme() {
  const config = fs.readFileSync(configPath, "utf8");
  const match = config.match(/redirectUri:\s*"([^"]+)"/);
  if (!match) return "";
  const redirectUri = match[1];
  if (redirectUri.includes("PASTE_IOS_CLIENT_ID")) return "";
  return redirectUri.split(":")[0];
}

const scheme = readRedirectScheme();
if (!scheme) {
  console.log("Skipped iOS OAuth scheme: add the Gmail iOS client ID in oauth-config.js first.");
  process.exit(0);
}

if (!fs.existsSync(plistPath)) {
  console.log("Skipped iOS OAuth scheme: ios/App/App/Info.plist does not exist yet.");
  process.exit(0);
}

let plist = fs.readFileSync(plistPath, "utf8");
if (plist.includes(`<string>${scheme}</string>`)) {
  console.log(`iOS OAuth scheme already configured: ${scheme}`);
  process.exit(0);
}

const block = `\n\t<key>CFBundleURLTypes</key>\n\t<array>\n\t\t<dict>\n\t\t\t<key>CFBundleURLName</key>\n\t\t\t<string>Gmail OAuth</string>\n\t\t\t<key>CFBundleURLSchemes</key>\n\t\t\t<array>\n\t\t\t\t<string>${scheme}</string>\n\t\t\t</array>\n\t\t</dict>\n\t</array>\n`;

plist = plist.replace(/\n<\/dict>\s*<\/plist>\s*$/, `${block}</dict>\n</plist>\n`);
fs.writeFileSync(plistPath, plist);
console.log(`Configured iOS OAuth scheme: ${scheme}`);
