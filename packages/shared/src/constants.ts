export const COMPANY = {
  NAME: "Superset",
  MARKETING_URL: "https://superset.sh",
  DOCS_URL: "https://docs.superset.sh",
  GITHUB_URL: "https://github.com/superset-sh/superset",
  STATUS_URL: "https://status.superset.sh",
  TRUST_URL: "https://trust.superset.sh",
  MAIL_TO: "mailto:support@superset.sh",
  X_URL: "https://x.com/superset_sh",
  LINKEDIN_URL: "https://linkedin.com/company/superset-sh",
  YOUTUBE_URL: "https://youtube.com/@superset_sh",
  DISCORD_URL: "https://discord.gg/cZeD9WYcV7",
  EMAIL_DOMAIN: "@superset.sh",
  FOUNDERS_MAIL_TO: "mailto:founders@superset.sh",
  FOUNDERS_EMAIL: "founders@superset.sh",
  REPORT_ISSUE_URL: "https://github.com/superset-sh/superset/issues/new",
} as const;

export const THEME_STORAGE_KEY = "superset-theme";
export const POSTHOG_COOKIE_NAME = "ph_phc_";

// Unused in landing page but imported by some pages
export const OPEN_ROLES = [] as { title: string; url: string; location: string }[];

export const PLATFORMS = {
  MACOS: "macos",
  WINDOWS: "windows",
  LINUX: "linux",
} as const;

export const GITHUB_STARS_URL = "https://api.github.com/repos/superset-sh/superset";

export const DOWNLOAD_URL_MAC_ARM64 = "https://github.com/superset-sh/superset/releases/latest";
export const DOWNLOAD_URL_MAC_X64 = "https://github.com/superset-sh/superset/releases/latest";
