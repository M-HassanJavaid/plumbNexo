const { compile } = require("@tailwindcss/node");
const { Scanner } = require("@tailwindcss/oxide");
const fs = require("fs");
const path = require("path");

async function buildCss() {
  const rootDir = path.resolve(__dirname, "..");
  const srcFile = path.resolve(rootDir, "src/styles/globals.src.css");
  const outFile = path.resolve(rootDir, "src/app/globals.css");

  if (!fs.existsSync(srcFile)) {
    console.error(`Source CSS not found: ${srcFile}`);
    process.exit(1);
  }

  const css = fs.readFileSync(srcFile, "utf-8");

  console.log("Compiling Tailwind CSS v4...");
  const compiler = await compile(css, {
    from: srcFile,
    base: rootDir,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      {
        base: path.resolve(rootDir, "src"),
        pattern: "**/*.{js,jsx,ts,tsx}",
        negated: false,
      },
    ],
  });

  const candidates = scanner.scan();
  console.log(`Scanned ${candidates.length} candidates from src/`);

  const compiledCss = compiler.build(candidates);

  fs.writeFileSync(outFile, compiledCss, "utf-8");
  console.log(`Wrote compiled CSS to src/app/globals.css (${(compiledCss.length / 1024).toFixed(1)} KB)`);
}

buildCss().catch((err) => {
  console.error("Failed to build CSS:", err);
  process.exit(1);
});
