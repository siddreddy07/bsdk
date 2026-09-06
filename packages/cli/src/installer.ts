import { spawnSync } from "node:child_process";
import {
  detectPackageManager,
  getInstallArgs,
} from "./utils/package-manager.js";

export function installPackages(packages: string[]) {
  const packageManager = detectPackageManager();

  const result = spawnSync(
    packageManager,
    getInstallArgs(packageManager, packages),
    {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: true,
    }
  );

  if (result.status !== 0) {
    throw new Error("Failed to install packages");
  }

  console.log("Installed successfully:", packages);
}