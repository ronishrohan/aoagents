"use client";

import { COMPANY } from "@superset/shared/constants";

const AGENT_LOGOS = [
  { name: "claude-code", label: "Claude Code", src: "/app-icons/coverage-claude-code.svg" },
  { name: "codex", label: "Codex", src: "/app-icons/coverage-codex.svg" },
  { name: "opencode", label: "OpenCode", src: "/app-icons/coverage-opencode.svg" },
  { name: "cursor", label: "Cursor", src: "/app-icons/coverage-cursor.svg" },
  { name: "aider", label: "Aider", src: "/app-icons/coverage-aider.png" },
  { name: "gemini", label: "Gemini", src: "/app-icons/coverage-gemini.svg" },
  { name: "copilot", label: "Copilot", src: "/app-icons/coverage-copilot.svg" },
  { name: "vibe", label: "Vibe", src: "/app-icons/vibe.svg" },
];

const AGENT_LOGO_ROWS = [
  AGENT_LOGOS.slice(0, 4),
  AGENT_LOGOS.slice(4, 8),
];

export function TrustedBySection() {
  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-sm font-mono text-muted-foreground tracking-[0.5px]">
            Coverage
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground max-w-3xl mx-auto mb-4">
          Use the agent you already trust.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          AO keeps the workflow the same. 23 harnesses, per-project agent choice.
        </p>

        <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {AGENT_LOGO_ROWS.map((row) => (
            <div
              key={row.map((agent) => agent.name).join("-")}
              className="grid grid-cols-4 divide-x divide-border"
            >
              {row.map((agent) => (
                <div
                  key={agent.name}
                  className="flex h-14 items-center justify-center gap-2.5 px-4 hover:bg-muted/60"
                >
                  <img
                    src={agent.src}
                    alt={agent.label}
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {agent.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
