import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "..");
const output = path.join(root, ".vercel", "output");

// 1. Prepare directory structure
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, "static"), { recursive: true });
fs.mkdirSync(path.join(output, "functions", "api"), { recursive: true });

// 2. Copy static files (Vite build output)
execSync("cp -r build/* .vercel/output/static/", { cwd: root, stdio: "inherit" });

// 3. Compile Edge Functions
const funcs = ["v1", "page", "not-found"];
for (const fn of funcs) {
  const funcDir = path.join(output, "functions", "api", `${fn}.func`);
  fs.mkdirSync(funcDir, { recursive: true });
  
  execSync(`npx esbuild api/${fn}.ts --bundle --format=esm --platform=browser --outfile=${funcDir}/index.js`, { cwd: root, stdio: "inherit" });
  
  fs.writeFileSync(path.join(funcDir, ".vc-config.json"), JSON.stringify({
    runtime: "edge",
    entrypoint: "index.js"
  }, null, 2));
}

// 4. Generate minimal config.json
fs.writeFileSync(path.join(output, "config.json"), JSON.stringify({
  version: 3
}, null, 2));

console.log("✅ Vercel Build Output API generated.");
