"use client";

import { COMPANY } from "@superset/shared/constants";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { track } from "@/lib/analytics";

interface DownloadButtonProps {
  size?: "sm" | "md";
  className?: string;
}

const RELEASES_URL = `${COMPANY.GITHUB_URL}/releases/latest`;

export function DownloadButton({
  size = "md",
  className = "",
}: DownloadButtonProps) {
  const sizeClasses =
    size === "sm"
      ? "h-8 px-3 text-sm"
      : "px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base";
  const label = size === "sm" ? "Download" : "Download for Mac";

  const buttonClasses = `bg-foreground text-background ${sizeClasses} rounded-2xl tracking-[0.5px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shrink-0 ${className}`;

  const openLatestRelease = () => {
    track("download_clicked");
    window.open(RELEASES_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className={buttonClasses} onClick={openLatestRelease}>
      <HiMiniArrowDownTray className="size-4" />
      {label}
    </button>
  );
}
