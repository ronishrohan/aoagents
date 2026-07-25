"use client";

import { COMPANY } from "@superset/shared/constants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { SocialLinks } from "../SocialLinks";
import { AOLogo } from "../Header/components/AOLogo";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/download") return null;

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[minmax(0,1fr)_auto_auto_auto] md:gap-x-20">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-1">
            <Link
              href="/"
              className="inline-block text-foreground transition-colors hover:text-foreground/80"
            >
              <AOLogo />
            </Link>
            <SocialLinks className="-ml-2" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Open-source orchestration for terminal-native coding agents. Local daemon, isolated worktrees, live sessions, and PR feedback routed to the right worker.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <a
                href={COMPANY.GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span className="text-border">·</span>
              <span>Apache 2.0</span>
            </div>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { href: "/#features", label: "Features" },
              { href: "/#agents", label: "Agents" },
              { href: `${COMPANY.DOCS_URL}/installation/`, label: "Install", external: true },
              { href: `${COMPANY.DOCS_URL}/cli/`, label: "CLI", external: true },
              { href: "/changelog", label: "Changelog" },
            ]}
          />

          <FooterColumn
            title="Docs"
            links={[
              { href: `${COMPANY.DOCS_URL}/`, label: "Overview", external: true },
              { href: `${COMPANY.DOCS_URL}/architecture/`, label: "Architecture", external: true },
              { href: `${COMPANY.DOCS_URL}/plugins/`, label: "Plugins", external: true },
              { href: "/changelog", label: "Changelog" },
            ]}
          />

          <FooterColumn
            title="Community"
            links={[
              { href: COMPANY.GITHUB_URL, label: "GitHub", external: true },
              { href: COMPANY.DISCORD_URL, label: "Discord", external: true },
              { href: COMPANY.X_URL, label: "X", external: true },
              { href: `${COMPANY.GITHUB_URL}/releases`, label: "Releases", external: true },
              { href: "/privacy", label: "Privacy" },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
