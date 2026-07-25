"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./components/MobileNav";
import { DesktopNav } from "./components/DesktopNav";
import { AOLogo } from "./components/AOLogo";

interface HeaderProps {
  ctaButtons: React.ReactNode;
  starCounter?: React.ReactNode;
}

export function Header({ ctaButtons, starCounter }: HeaderProps) {
  const pathname = usePathname();
  if (pathname === "/download") return null;

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <AOLogo />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <DesktopNav />
            <div className="hidden xl:block h-4 w-px bg-border" />
            <div className="hidden xl:block">{starCounter}</div>
            <div className="flex items-center gap-2 shrink-0">{ctaButtons}</div>
          </div>

          <MobileNav ctaButtons={ctaButtons} starCounter={starCounter} />
        </div>
      </div>
    </header>
  );
}
