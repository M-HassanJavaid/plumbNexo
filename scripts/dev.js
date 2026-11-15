const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

function runBuildCss() {
  try {
    const buildScript = require("./build-css.js");
  } catch (e) {
    // build-css executes on require
  }
}

// Initial build
const { execSync } = require("child_process");
try {
  execSync(`node "${path.join(__dirname, "build-css.js")}"`, {
    stdio: "inherit",
    cwd: rootDir,
  });
} catch (e) {
  console.error("Initial CSS build failed:", e);
}

// Watch src for changes with debounce
let debounceTimer = null;
fs.watch(path.join(rootDir, "src"), { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (filename.includes("globals.css")) return; // Don't trigger loop
  if (!/\.(js|jsx|ts|tsx|css)$/.test(filename)) return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    try {
      execSync(`node "${path.join(__dirname, "build-css.js")}"`, {
        stdio: "inherit",
        cwd: rootDir,
      });
    } catch (err) {
      console.error("Rebuilding CSS failed:", err.message);
    }
  }, 200);
});

// Launch Next.js dev server
const nextDev = spawn(
  process.platform === "win32" ? "cmd.exe" : "npx",
  process.platform === "win32" ? ["/c", "npx", "next", "dev"] : ["next", "dev"],
  {
    stdio: "inherit",
    cwd: rootDir,
  }
);

nextDev.on("close", (code) => {
  process.exit(code || 0);
});
