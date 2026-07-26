import { Battery, GitBranch, Plus, Signal, Wifi } from "lucide-react";
import { AppMockup } from "../components/HeroSection/components/AppMockup";

const tasks = [
  {
    title: "Tighten download page layout",
    branch: "landing/download-cards",
    icon: "/app-icons/coverage-claude-code.svg",
    state: "Working",
    color: "#60a5fa",
  },
  {
    title: "Review mobile companion states",
    branch: "mobile/run-monitor",
    icon: "/app-icons/coverage-codex.svg",
    state: "In review",
    color: "#facc15",
  },
  {
    title: "Ship platform-aware downloads",
    branch: "release/platform-links",
    icon: "/app-icons/opencode.svg",
    state: "Ready",
    color: "#4ade80",
  },
] as const;

export function DesktopAppPreview() {
  return (
    <div className="absolute left-6 top-6 h-[360px] w-[1032px]">
      <AppMockup compactTaskTitles showTitlebarMetrics={false} />
    </div>
  );
}

export function PhoneAppPreview() {
  const visibleTasks = [tasks[2], tasks[0]];

  return (
    <div
      role="img"
      aria-label="Static preview of the Agent Orchestrator mobile Kanban screen in an iPhone frame"
      className="absolute left-6 top-6 h-[500px] w-[242px] rounded-[46px] bg-[#34363a] p-[7px] shadow-[0_28px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
    >
      <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-[#292b2e]" />
      <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-[#292b2e]" />
      <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-[#292b2e]" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[39px] bg-[#0a0b0d] text-white">
        <div className="absolute left-1/2 top-2.5 z-20 h-5 w-[72px] -translate-x-1/2 rounded-full bg-black" />

        <div className="flex h-9 shrink-0 items-center justify-between px-4 pt-1.5 text-[9px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1 text-white/80">
            <Signal className="size-2.5" />
            <Wifi className="size-2.5" />
            <Battery className="size-3" />
          </div>
        </div>

        <div className="flex h-12 shrink-0 items-center px-3">
          <div>
            <p className="text-[13px] font-bold text-[#f4f5f7]">Kanban</p>
            <p className="mt-0.5 text-[8px] text-[#646a73]">ao.local</p>
          </div>
          <span className="ml-auto rounded-full bg-[#74b98a]/15 px-2 py-1 text-[7px] font-semibold text-[#74b98a]">
            Connected
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 px-2.5 pb-2">
          {[
            { value: "2", label: "working", color: "#f59f4c" },
            { value: "1", label: "need you", color: "#e8c14a" },
            { value: "1", label: "mergeable", color: "#74b98a" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/6 bg-[#15171b] px-2 py-1.5"
            >
              <p
                className="font-mono text-[13px] font-extrabold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[6px] font-semibold text-[#646a73]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-2.5 flex h-7 shrink-0 items-center rounded-lg bg-[#121317] px-2.5">
          <img src="/ao-logo.svg" alt="" className="size-3" />
          <span className="ml-1.5 truncate text-[8px] font-semibold text-[#9ba1aa]">
            AgentWrapper / agent-orchestrator
          </span>
          <span className="ml-auto text-[9px] text-[#646a73]">⌄</span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-2.5 pt-2.5">
          {visibleTasks.map((task, index) => (
            <div key={task.branch} className={index > 0 ? "mt-2.5" : ""}>
              <div className="mb-1.5 flex items-center gap-1.5 px-0.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: task.color }}
                />
                <span className="text-[8px] font-bold text-[#9ba1aa]">
                  {index === 0 ? "Ready to merge" : "Working"}
                </span>
                <span className="ml-auto font-mono text-[7px] text-[#646a73]">
                  1
                </span>
              </div>

              <div
                className="rounded-xl border border-white/6 bg-[#15171b] px-2.5 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: task.color }}
                  />
                  <span
                    className="text-[7px] font-semibold"
                    style={{ color: task.color }}
                  >
                    {task.state}
                  </span>
                  <span className="ml-auto font-mono text-[6px] text-[#646a73]">
                    aoagents
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[9px] font-medium leading-3 text-[#f4f5f7]">
                  {task.title}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[#646a73]">
                  <GitBranch className="size-2.5" />
                  <span className="truncate font-mono text-[6px]">
                    {task.branch}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 right-3 grid size-9 place-items-center rounded-full bg-[#4d8dff] text-[#06101f] shadow-lg">
          <Plus className="size-4" />
        </div>

        <div className="flex h-12 shrink-0 items-start justify-around border-t border-white/6 bg-[#121317] px-3 pt-2 text-[7px] text-[#646a73]">
          <span className="text-[#f4f5f7]">Kanban</span>
          <span>Orchestrator</span>
          <span>PRs</span>
          <span>Settings</span>
        </div>
        <div className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}
