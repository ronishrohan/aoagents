"use client";

import { COMPANY } from "@superset/shared/constants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/download") return null;

  return (
    <footer className="bg-card">
      <div className="px-8 lg:px-[30px]">
        <div className="max-w-7xl mx-auto py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="select-none font-sans text-5xl font-medium leading-none tracking-[-0.5px] text-foreground sm:text-6xl">
              <span className="block">Spawn Agents</span>
              <span className="block">Step Away</span>
              <span className="block">Ship Faster</span>
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-y divide-border">
            <FooterColumn
              title="Product"
              links={[
                { href: "/#features", label: "Features" },
                { href: "/#agents", label: "Agents" },
                { href: `${COMPANY.DOCS_URL}/installation/`, label: "Install", external: true },
                { href: `${COMPANY.DOCS_URL}/cli/`, label: "CLI", external: true },
                { href: "/changelog", label: "Changelog" },
                { href: "/design-partners", label: "Design Partners" },
              ]}
            />

            <FooterColumn
              title="Docs"
              links={[
                { href: `${COMPANY.DOCS_URL}/`, label: "Overview", external: true },
                { href: `${COMPANY.DOCS_URL}/architecture/`, label: "Architecture", external: true },
                { href: `${COMPANY.DOCS_URL}/plugins/`, label: "Plugins", external: true },
                { href: `${COMPANY.GITHUB_URL}/releases`, label: "Releases", external: true },
                { href: "/privacy", label: "Privacy" },
              ]}
            />

            <FooterColumn
              title="Community"
              links={[
                { href: COMPANY.GITHUB_URL, label: "GitHub", external: true },
                { href: COMPANY.DISCORD_URL, label: "Discord", external: true },
                { href: COMPANY.X_URL, label: "X", external: true },
              ]}
            />
          </div>
          </div>
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

const FOOTER_ROW_COUNT = 6;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="min-w-0">
      <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground">
        {title}
      </p>
      <ul className="divide-y divide-border">
        {Array.from({ length: FOOTER_ROW_COUNT }).map((_, index) => {
          const link = links[index];

          return (
          <li key={link?.href ?? `${title}-empty-${index}`}>
            {!link ? (
              <div className="min-h-11 px-4 py-3" aria-hidden="true" />
            ) : link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="flex min-h-11 items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
