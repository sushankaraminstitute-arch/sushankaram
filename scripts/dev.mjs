import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const extraArgs = process.argv.slice(2);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendRoot = path.join(projectRoot, "frontend");

const processes = [];

function start(command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: isWindows,
    ...options,
  });

  processes.push(child);
  return child;
}

function stopAll(exitCode = 0) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

const backend = start("node", ["backend/server.js"], {
  cwd: projectRoot,
});
const frontend = start(npmCommand, ["--prefix", frontendRoot, "run", "dev:app", "--", ...extraArgs], {
  cwd: projectRoot,
});

backend.on("exit", (code) => {
  if (code !== null && code !== 0) {
    stopAll(code);
  }
});

frontend.on("exit", (code) => {
  stopAll(code ?? 0);
});

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));

