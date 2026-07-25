"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const AGENT_LOGOS = [
  // Clockwise from the top-left.
  { name: "claude-code", label: "Claude Code", src: "/app-icons/harness-claude-code.svg", x: 0, y: 0, entry: { x: 0, y: -130 } },
  { name: "aider", label: "Aider", src: "/app-icons/harness-aider.png", x: 14.3, y: 0, entry: { x: 0, y: -130 } },
  { name: "opencode", label: "OpenCode", src: "/app-icons/harness-opencode.svg", x: 28.6, y: 0, entry: { x: 0, y: -130 } },
  { name: "grok", label: "Grok", src: "/app-icons/harness-grok.png", x: 42.9, y: 0, entry: { x: 0, y: -130 } },
  { name: "droid", label: "Droid", src: "/app-icons/harness-droid.png", x: 57.1, y: 0, entry: { x: 0, y: -130 } },
  { name: "amp", label: "Amp", src: "/app-icons/amp.svg", x: 71.4, y: 0, entry: { x: 0, y: -130 } },
  { name: "agy", label: "Antigravity", src: "/app-icons/harness-agy.png", x: 85.7, y: 0, entry: { x: 0, y: -130 } },
  { name: "crush", label: "Crush", src: "/app-icons/harness-crush.png", x: 100, y: 0, entry: { x: 90, y: -90 } },
  { name: "cursor", label: "Cursor", src: "/app-icons/harness-cursor.svg", x: 100, y: 25, entry: { x: 130, y: 0 } },
  { name: "qwen", label: "Qwen Code", src: "/app-icons/harness-qwen.png", x: 100, y: 50, entry: { x: 130, y: 0 } },
  { name: "copilot", label: "GitHub Copilot", src: "/app-icons/harness-copilot.png", x: 100, y: 75, entry: { x: 130, y: 0 } },
  { name: "goose", label: "Goose", src: "/app-icons/harness-goose.png", x: 100, y: 100, entry: { x: 90, y: 90 } },
  { name: "auggie", label: "Auggie", src: "/app-icons/harness-auggie.png", x: 85.7, y: 100, entry: { x: 0, y: 130 } },
  { name: "continue", label: "Continue", src: "/app-icons/harness-continue.png", x: 71.4, y: 100, entry: { x: 0, y: 130 } },
  { name: "devin", label: "Devin", src: "/app-icons/harness-devin.png", x: 57.1, y: 100, entry: { x: 0, y: 130 } },
  { name: "cline", label: "Cline", src: "/app-icons/harness-cline.png", x: 42.9, y: 100, entry: { x: 0, y: 130 } },
  { name: "codex", label: "Codex", src: "/app-icons/harness-codex.svg", x: 28.6, y: 100, entry: { x: 0, y: 130 } },
  { name: "gemini", label: "Gemini CLI", src: "/app-icons/gemini.svg", x: 14.3, y: 100, entry: { x: 0, y: 130 } },
  { name: "kimi", label: "Kimi Code", src: "/app-icons/harness-kimi.png", x: 0, y: 100, entry: { x: -90, y: 90 } },
  { name: "kiro", label: "Kiro", src: "/app-icons/harness-kiro.png", x: 0, y: 83.3, entry: { x: -130, y: 0 } },
  { name: "kilocode", label: "Kilo Code", src: "/app-icons/harness-kilocode.png", x: 0, y: 66.7, entry: { x: -130, y: 0 } },
  { name: "vibe", label: "Vibe", src: "/app-icons/harness-vibe.png", x: 0, y: 50, entry: { x: -130, y: 0 } },
  { name: "pi", label: "Pi", src: "/app-icons/harness-pi.png", x: 0, y: 33.3, entry: { x: -130, y: 0 } },
  { name: "autohand", label: "Autohand", src: "/app-icons/harness-autohand.png", x: 0, y: 16.7, entry: { x: -130, y: 0 } },
];

export function TrustedBySection() {
  const shouldReduceMotion = useReducedMotion();
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  return (
    <section className="overflow-hidden bg-background py-16 sm:py-24">
      <div className="w-full">
        <motion.div
          className="relative min-h-[360px] overflow-hidden sm:min-h-[440px]"
          onViewportEnter={() => setHasEnteredViewport(true)}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-50 h-px bg-[linear-gradient(90deg,transparent_0%,color-mix(in_oklch,var(--foreground)_32%,transparent)_50%,transparent_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-px bg-[linear-gradient(90deg,transparent_0%,color-mix(in_oklch,var(--foreground)_32%,transparent)_50%,transparent_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-50 w-px bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--foreground)_24%,transparent)_50%,transparent_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-50 w-px bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--foreground)_24%,transparent)_50%,transparent_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--foreground)_4%,transparent),transparent_58%)]"
            aria-hidden="true"
          />

          <h2 className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-2 text-center font-sans text-[clamp(0.9rem,4.7vw,4.75rem)] font-medium tracking-[-0.055em] text-foreground/15">
            <span className="whitespace-nowrap">Use the agents you already trust.</span>
          </h2>

          {AGENT_LOGOS.map((agent, index) => (
            <motion.div
              key={agent.name}
              className="agent-perimeter-logo absolute z-10 hover:z-40"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                translate: "-50% -50%",
              }}
              initial={false}
              animate={
                shouldReduceMotion || hasEnteredViewport
                  ? { x: 0, y: 0, opacity: 1, scale: 1 }
                  : {
                      x: agent.entry.x,
                      y: agent.entry.y,
                      opacity: 0,
                      scale: 0.72,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.62,
                delay: shouldReduceMotion ? 0 : index * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: agent.x === 0 ? 88 : agent.x === 100 ? -88 : 0,
                      y: agent.y === 0 ? 88 : agent.y === 100 ? -88 : 0,
                      scale: 1.06,
                      transition: {
                        duration: 0.24,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
            >
              <img
                src={agent.src}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_8px_18px_rgb(0_0_0/0.3)]"
                loading="lazy"
              />
              <span className="sr-only">{agent.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
