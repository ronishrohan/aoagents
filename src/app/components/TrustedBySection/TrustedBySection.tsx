"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const AGENT_LOGOS = [
  { name: "claude-code", label: "Claude Code", src: "/app-icons/lobe-claude-code.svg", x: 0, y: 0, entry: { x: 0, y: -130 } },
  { name: "codex", label: "Codex", src: "/app-icons/lobe-codex.svg", x: 20, y: 0, entry: { x: 0, y: -130 } },
  { name: "cursor", label: "Cursor", src: "/app-icons/lobe-cursor.svg", x: 40, y: 0, entry: { x: 0, y: -130 }, invert: true },
  { name: "opencode", label: "OpenCode", src: "/app-icons/lobe-opencode.svg", x: 60, y: 0, entry: { x: 0, y: -130 } },
  { name: "gemini-cli", label: "Gemini CLI", src: "/app-icons/lobe-gemini-cli.svg", x: 80, y: 0, entry: { x: 0, y: -130 } },
  { name: "github-copilot", label: "GitHub Copilot", src: "/app-icons/lobe-github-copilot.svg", x: 100, y: 0, entry: { x: 90, y: -90 }, invert: true },
  { name: "amp", label: "Amp", src: "/app-icons/lobe-amp.svg", x: 100, y: 33.3, entry: { x: 130, y: 0 } },
  { name: "kimi", label: "Kimi Code", src: "/app-icons/lobe-kimi.svg", x: 100, y: 66.7, entry: { x: 130, y: 0 } },
  { name: "cline", label: "Cline", src: "/app-icons/lobe-cline.svg", x: 100, y: 100, entry: { x: 90, y: 90 }, invert: true },
  { name: "devin", label: "Devin", src: "/app-icons/lobe-devin.svg", x: 80, y: 100, entry: { x: 0, y: 130 } },
  { name: "goose", label: "Goose", src: "/app-icons/lobe-goose.svg", x: 60, y: 100, entry: { x: 0, y: 130 }, invert: true },
  { name: "qwen", label: "Qwen Code", src: "/app-icons/lobe-qwen.svg", x: 40, y: 100, entry: { x: 0, y: 130 } },
  { name: "grok", label: "Grok", src: "/app-icons/lobe-grok.svg", x: 20, y: 100, entry: { x: 0, y: 130 }, invert: true },
  { name: "kilo-code", label: "Kilo Code", src: "/app-icons/lobe-kilocode.svg", x: 0, y: 100, entry: { x: -90, y: 90 }, invert: true },
  { name: "kiro", label: "Kiro", src: "/app-icons/lobe-kiro.svg", x: 0, y: 66.7, entry: { x: -130, y: 0 } },
  { name: "antigravity", label: "Antigravity", src: "/app-icons/lobe-antigravity.svg", x: 0, y: 33.3, entry: { x: -130, y: 0 } },
];

export function TrustedBySection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEnteredViewport = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section className="overflow-hidden bg-background py-16 sm:py-24">
      <div className="w-full">
        <motion.div
          ref={sectionRef}
          className="relative min-h-[360px] overflow-hidden sm:min-h-[440px]"
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
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={agent.src}
                  alt=""
                  className={`h-[58%] w-[58%] object-contain ${agent.invert ? "invert" : ""}`}
                  loading="lazy"
                />
              </div>
              <span className="sr-only">{agent.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
