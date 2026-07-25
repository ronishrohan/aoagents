"use client";

import { cn } from "@superset/ui/utils";
import Link from "next/link";
import {
  type NavLink,
  PRODUCT_LINKS,
  RESOURCE_LINKS,
} from "../../constants";

const linkClass = cn(
  "h-8 bg-transparent px-3 text-sm font-normal text-muted-foreground hover:bg-accent/40 hover:text-foreground focus:bg-accent/40 focus:text-foreground inline-flex items-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none no-underline",
);

export function DesktopNav() {
  return (
    <nav className="flex items-center gap-1">
      {PRODUCT_LINKS.map((link) => (
        <NavLinkItem key={link.href} link={link} />
      ))}
      <div className="h-4 w-px bg-border" />
      {RESOURCE_LINKS.map((link) => (
        <NavLinkItem key={link.href} link={link} />
      ))}
    </nav>
  );
}

function NavLinkItem({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}
