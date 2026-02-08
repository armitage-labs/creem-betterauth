import fs from "node:fs";
import path from "node:path";

fs.writeFileSync(
	path.join(process.cwd(), "dist", "esm", "package.json"),
	JSON.stringify({ type: "module" }),
);

fs.writeFileSync(
	path.join(process.cwd(), "dist", "cjs", "package.json"),
	JSON.stringify({ type: "commonjs" }),
);
