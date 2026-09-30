import { spawn } from "node:child_process";

const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm"; //ถ้าเป็น Windows ใช้ pnpm.cmd ถ้าเป็น Mac/Linux ใช้ pnpm

const nextDev = spawn(pnpmCmd, ["dev:next"], { stdio: "inherit", shell: true });
const seedWatch = spawn(pnpmCmd, ["seed:watch"], { stdio: "inherit", shell: true });

function shutdown(code = 0) {
  nextDev.kill();
  seedWatch.kill();
  process.exit(code);
}

nextDev.on("exit", (code) => shutdown(code ?? 0));
seedWatch.on("exit", (code) => shutdown(code ?? 0));

process.on("SIGINT", () => shutdown(130));
process.on("SIGTERM", () => shutdown(143));
