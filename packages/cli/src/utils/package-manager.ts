export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent ?? "";

  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("bun")) return "bun";

  return "npm";
}

export function getInstallArgs(
  packageManager: PackageManager,
  packages: string[]
) {
  switch (packageManager) {
    case "npm":
      return ["install", ...packages];

    case "pnpm":
    case "yarn":
    case "bun":
      return ["add", ...packages];
  }
}