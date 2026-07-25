import { COMPANY, NAV_ITEMS } from "@superset/shared/constants";

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
}

export const PRODUCT_LINKS: NavLink[] = [
  {
    href: "/#see-it",
    label: "Demo",
    description: "Watch AO run a fleet of agents end to end.",
  },
  {
    href: "/#features",
    label: "Features",
    description: "Delegate, watch, and close the loop.",
  },
];

export const RESOURCE_LINKS: NavLink[] = [
  {
    href: COMPANY.DOCS_URL,
    label: "Documentation",
    description: "Guides, references, and integrations.",
    external: true,
  },
  {
    href: "/changelog",
    label: "Changelog",
    description: "New releases and product updates.",
  },
  {
    href: COMPANY.DISCORD_URL,
    label: "Discord",
    description: "Join the community.",
    external: true,
  },
  {
    href: COMPANY.GITHUB_URL,
    label: "GitHub",
    description: "Open source under Apache 2.0.",
    external: true,
  },
];

export const TOP_LEVEL_LINKS: NavLink[] = [];
