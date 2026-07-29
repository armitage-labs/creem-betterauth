import fs from "node:fs";
import path from "node:path";

fs.mkdirSync(path.join(process.cwd(), "dist", "esm"), { recursive: true });
fs.mkdirSync(path.join(process.cwd(), "dist", "cjs"), { recursive: true });

fs.writeFileSync(
  path.join(process.cwd(), "dist", "esm", "package.json"),
  JSON.stringify({ type: "module" }),
);
fs.writeFileSync(
  path.join(process.cwd(), "dist", "cjs", "package.json"),
  JSON.stringify({ type: "commonjs" }),
);
