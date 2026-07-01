const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "www");
const files = ["index.html", "styles.css", "app.js", "oauth-config.js"];
const dirs = ["assets"];

fs.rmSync(out, { force: true, recursive: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

for (const dir of dirs) {
  const src = path.join(root, dir);
  const dest = path.join(out, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}

console.log(`Built ${path.relative(root, out)} for Capacitor.`);
