import { COMPANY } from "@superset/shared/constants";
import type { Metadata } from "next";

const CONTACT_EMAIL = "prateek@untrivial.ai";
const CAL_URL = "https://cal.com/agentwrapper/ao-design-partner";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "AO Design Partner Program",
)}&body=${encodeURIComponent(
  "Hi Prateek,\n\nWe're interested in the AO design partner program.\n\nCompany:\nEngineering team size:\nAgent harnesses we use today (Claude Code / Codex / Cursor / ...):\nWhat we want out of AO:\n",
)}`;

export const metadata: Metadata = {
  title: "Design Partner Program - Agent Orchestrator",
  description:
    "Mission control for your agent fleet: shared sessions, ROI observability, and an engine room your org fully owns. Your engineers get leverage; your leadership gets answers.",
  alternates: {
    canonical: `${COMPANY.MARKETING_URL}/design-partners`,
  },
  openGraph: {
    title: "AO Design Partner Program",
    description:
      "Mission control for your agent fleet: shared sessions, ROI observability, and an engine room your org fully owns.",
    url: `${COMPANY.MARKETING_URL}/design-partners`,
  },
};

const outcomes = [
  {
    title: "8,400+",
    body: "stars in 5 months",
  },
  {
    title: "1,200+",
    body: "forks",
  },
  {
    title: "23",
    body: "agent harnesses",
  },
  {
    title: "Nightly",
    body: "desktop releases",
  },
];

const partnerGets = [
  {
    title: "White-glove onboarding",
    body: "Founder-led setup on your real repos, with the agents you already pay for.",
  },
  {
    title: "Weekly founder access",
    body: "A standing call and a private channel. Your bugs jump a queue that ships nightly.",
  },
  {
    title: "First access to every unlock",
    body: "Teams features land in your workspace before anyone else's.",
  },
  {
    title: "Locked-in pricing",
    body: "Six months of partner pricing at GA. Pilot fees credit toward year one.",
  },
];

const partnerAsks = [
  {
    title: "A paid pilot",
    body: "$500-2,000/month, sized to usage. Month-to-month. Churn is honest signal.",
  },
  {
    title: "A champion and a sponsor",
    body: "One engineer who runs AO weekly. One leader who wants the ROI answer.",
  },
  {
    title: "Real feedback",
    body: "A biweekly working session and honest numbers - including the bad news.",
  },
];

const phases = [
  {
    label: "available now",
    title: "A fleet on every desk",
    body: "The single-player engine. Free, open source, already on your machine.",
    unlocks: [
      "23 harnesses behind one board - Claude Code, Codex, Cursor, and whatever comes next",
      "Every session in its own git worktree; branches never collide",
      "CI failures and review comments route back to the agent that owns the branch",
      "An orchestrator plans the work and spawns the workers",
    ],
  },
  {
    label: "building now - partners get it first",
    title: "Shared mission control",
    body: "The fleet becomes a team sport. Execution stays local; coordination moves to one workspace.",
    unlocks: [
      "Team workspaces - the first cloud layer, opt-in by design",
      "Every session durably captured; hand a running fleet to a teammate",
      "One board for the team: running, merged, needs a human",
    ],
  },
  {
    label: "partners shape the spec",
    title: "The ROI answer",
    body: "What did the agents ship last week? What did it cost? Answered.",
    unlocks: [
      "Token spend by project, agent, and team",
      "Outcomes, not vibes: agent PRs merged, cycle time, human-rescue rate",
      "Transcripts joined with GitHub, CI, reviews, and trackers - reviewable in one place",
    ],
  },
  {
    label: "scoped with partners who need it",
    title: "The engine room",
    body: "The whole engine inside your walls. Your sandboxes. Your policies. Your data.",
    unlocks: [
      "Self-hosted control plane in your VPC",
      "Security policies enforced on every agent; audit trails and SSO across the fleet",
      "The dataset stays yours: full transcripts joined with SCM, CI, and tracker history",
    ],
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium tracking-[-0.5px] text-muted-foreground">
      {children}
    </p>
  );
}

function TextLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-2 text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      {children}
    </a>
  );
}

export default function DesignPartnersPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-[30px] lg:pt-36">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <SectionLabel>Design partner program</SectionLabel>
            <h1 className="mt-5 max-w-5xl text-balance font-sans text-4xl font-normal leading-[0.98] tracking-[-0.5px] text-foreground sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              Your company is the car. We build the engine.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-xl">
              Your engineers already run coding agents. Nobody runs the fleet. AO
              puts every agent, branch, and PR on one board and routes CI failures
              and review comments back to the agent that owns them. More merged
              work from the subscriptions you already pay for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-3xl bg-foreground px-6 py-3 text-base font-semibold tracking-[-0.5px] text-background transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
              >
                Book a discovery call
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={MAILTO_HREF}
                className="inline-flex min-h-11 items-center gap-2 rounded-3xl border border-border bg-background px-6 py-3 text-base font-normal tracking-[-0.5px] text-foreground transition-[transform,background-color] duration-150 hover:bg-muted active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>paid pilots</span>
              <span>month-to-month</span>
              <span>cancel anytime</span>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {outcomes.map((item) => (
              <div
                key={item.title}
                className="py-6"
              >
                <h2 className="text-xl font-medium tracking-[-0.5px] text-foreground">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8 sm:py-20 lg:px-[30px]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionLabel>What your team gets</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.5px] text-foreground sm:text-4xl lg:text-5xl">
              One workspace. Humans and agents, side by side.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-muted-foreground">
            <p>
              Every session shareable. Every outcome measurable. Every transcript
              captured - and owned by your org.
            </p>
            <p>
              Each layer lands in partner workspaces first.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8 sm:py-20 lg:px-[30px]">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>The exchange</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.5px] text-foreground sm:text-4xl lg:text-5xl">
              What you get. What we ask.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="py-4 text-base font-medium tracking-[-0.5px] text-foreground">
                You get
              </p>
              <ul>
                {partnerGets.map((item) => (
                  <li key={item.title} className="py-4">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="py-4 text-base font-medium tracking-[-0.5px] text-foreground">
                We ask
              </p>
              <ul>
                {partnerAsks.map((item) => (
                  <li key={item.title} className="py-4">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 max-w-4xl text-sm leading-7 text-muted-foreground">
            Best fit: 10-100 engineers. Multiple agent subscriptions in use.
            Leadership asking what the spend produces. AO ships a new build every
            night - what we promise, you watch arrive.
          </p>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8 sm:py-20 lg:px-[30px]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>What your team gets</SectionLabel>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {phases.map((phase) => (
              <article
                key={phase.title}
                className="py-6"
              >
                <p className="text-sm font-medium tracking-[-0.5px] text-muted-foreground">
                  {phase.label}
                </p>
                <h2 className="mt-4 text-2xl font-medium tracking-[-0.5px] text-foreground">
                  {phase.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {phase.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {phase.unlocks.map((unlock) => (
                    <li
                      key={unlock}
                      className="text-sm leading-7 text-muted-foreground"
                    >
                      {unlock}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8 sm:py-20 lg:px-[30px]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 py-8 lg:flex-row lg:items-center">
          <div>
            <SectionLabel>Your engineers get leverage.</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.5px] text-foreground sm:text-4xl">
              Your leadership gets answers.
            </h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-3xl bg-foreground px-6 py-3 text-base font-semibold tracking-[-0.5px] text-background transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              Book a discovery call
            </a>
            <TextLink href={MAILTO_HREF}>{CONTACT_EMAIL}</TextLink>
          </div>
        </div>
      </section>
    </main>
  );
}
