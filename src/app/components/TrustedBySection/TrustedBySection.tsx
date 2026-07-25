"use client";

import { COMPANY } from "@superset/shared/constants";

const AGENT_LOGOS = [
  { name: "claude-code", label: "Claude Code", src: "/docs/logos/claude-code.svg" },
  { name: "codex", label: "Codex", src: "/docs/logos/codex.svg" },
  { name: "opencode", label: "OpenCode", src: "/docs/logos/opencode.svg" },
  { name: "cursor", label: "Cursor", src: "/docs/logos/cursor.svg" },
  { name: "aider", label: "Aider", src: "/docs/logos/aider.png" },
  { name: "gemini", label: "Gemini", src: "/app-icons/gemini.svg" },
  { name: "copilot", label: "Copilot", src: "/app-icons/copilot-white.svg" },
  { name: "vibe", label: "Vibe", src: "/app-icons/vibe.svg" },
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

        {/* Agent logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {AGENT_LOGOS.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center justify-center gap-2.5 h-14 rounded-xl border border-border bg-card px-4 hover:border-muted-foreground/30 transition-colors"
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
      </div>
    </section>
  );
}
