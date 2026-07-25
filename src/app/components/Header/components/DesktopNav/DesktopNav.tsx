"use client";

import { cn } from "@superset/ui/utils";
import Link from "next/link";
import {
  type NavLink,
  PRODUCT_LINKS,
  RESOURCE_LINKS,
  TOP_LEVEL_LINKS,
} from "../../constants";

const linkClass = cn(
  "h-8 bg-transparent px-3 text-sm font-normal text-muted-foreground hover:bg-accent/40 hover:text-foreground focus:bg-accent/40 focus:text-foreground inline-flex items-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none no-underline",
);

export function DesktopNav() {
  return (
    <nav className="flex items-center gap-1">
      {/* Product links */}
      {PRODUCT_LINKS.map((link) => (
        <NavLinkItem key={link.href} link={link} />
      ))}

      {/* Separator */}
      <div className="h-4 w-px bg-border" />

      {/* Resource links (first two as examples) */}
      <NavLinkItem key={RESOURCE_LINKS[0].href} link={RESOURCE_LINKS[0]} />
      <NavLinkItem key={RESOURCE_LINKS[1].href} link={RESOURCE_LINKS[1]} />

      {/* Top-level links */}
      {TOP_LEVEL_LINKS.map((link) => (
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
