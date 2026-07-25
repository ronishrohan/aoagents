"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Terminal as XTerm } from "@xterm/xterm";

export type { ActiveDemo } from "./types";

type BoardColumnId = "working" | "action" | "pending" | "merge";
type CardTone = "default" | "review" | "blocked" | "ready";
type ActivityState = "running" | "passed" | "failed" | "waiting";
type TrackId = "landing" | "deploy" | "stars" | "icons" | "footer";
type ViewMode = "board" | "orchestrator";

interface PreviewCard {
	activity: string;
	activityState: ActivityState;
	agent: string;
	badge: string | null;
	branch: string;
	column: BoardColumnId;
	checks: string;
	files: string;
	id: string;
	icon: string;
	merging?: boolean;
	pr: string;
	time: string;
	title: string;
	tone: CardTone;
}

type StaticPreviewCard = Omit<PreviewCard, "column" | "id" | "merging">;

interface PreviewColumn {
	cards: StaticPreviewCard[];
	count: number;
	id: BoardColumnId;
	title: string;
}

interface TrackItem {
	id: TrackId;
	label: string;
	summary: string;
}

const repoName = "AgentWrapper/agent-orchestrator";
const repoAvatar = "https://github.com/AgentWrapper.png?size=64";

const previewTokenStyle = {
	"--preview-background": "oklch(0.153 0.006 107.1)",
	"--preview-foreground": "oklch(0.988 0.003 106.5)",
	"--preview-card": "oklch(0.228 0.013 107.4)",
	"--preview-card-foreground": "oklch(0.988 0.003 106.5)",
	"--preview-primary": "oklch(0.93 0.007 106.5)",
	"--preview-primary-foreground": "oklch(0.228 0.013 107.4)",
	"--preview-muted": "oklch(0.286 0.016 107.4)",
	"--preview-muted-foreground": "oklch(0.737 0.021 106.9)",
	"--preview-accent": "oklch(0.286 0.016 107.4)",
	"--preview-border": "oklch(1 0 0 / 10%)",
	"--preview-input": "oklch(1 0 0 / 15%)",
	"--preview-ring": "oklch(0.58 0.031 107.3)",
	"--preview-sidebar": "oklch(0.228 0.013 107.4)",
	"--preview-sidebar-foreground": "oklch(0.988 0.003 106.5)",
	"--preview-sidebar-accent": "oklch(0.286 0.016 107.4)",
	"--preview-sidebar-border": "oklch(1 0 0 / 10%)",
} as CSSProperties;

const columns = [
	{
		id: "working",
		title: "Working",
		count: 9,
		cards: [
			{
				title: "Port Figma board mock into the hero preview",
				branch: "landing/figma-board-preview",
				agent: "Claude",
				icon: "/app-icons/coverage-claude-code.svg",
				activity: "Editing hero preview",
				activityState: "running",
				pr: "PR #318",
				checks: "checks running",
				files: "7 files",
				time: "12m ago",
				badge: null,
				tone: "default",
			},
			{
				title: "Replace leftover Superset app chrome in preview",
				branch: "landing/remove-superset-mock",
				agent: "Codex",
				icon: "/app-icons/coverage-codex.svg",
				activity: "Running tests",
				activityState: "running",
				pr: "PR #319",
				checks: "unit tests queued",
				files: "5 files",
				time: "18m ago",
				badge: "spawning",
				tone: "default",
			},
		],
	},
	{
		id: "action",
		title: "Needs you",
		count: 4,
		cards: [
			{
				title: "Pick final titlebar metrics for the preview",
				branch: "landing/titlebar-metrics",
				agent: "Claude",
				icon: "/app-icons/coverage-claude-code.svg",
				activity: "Agent wants input",
				activityState: "waiting",
				pr: "PR #322",
				checks: "review comments 4",
				files: "1 file",
				time: "46m ago",
				badge: "Changes requested",
				tone: "blocked",
			},
			{
				title: "Confirm whether download labels stay platform-aware",
				branch: "landing/platform-download-copy",
				agent: "Cursor",
				icon: "/app-icons/cursor.svg",
				activity: "Paused for copy decision",
				activityState: "waiting",
				pr: "PR #323",
				checks: "needs product call",
				files: "3 files",
				time: "1h ago",
				badge: "Needs input",
				tone: "blocked",
			},
		],
	},
	{
		id: "pending",
		title: "In review",
		count: 5,
		cards: [
			{
				title: "Preload GitHub stars before hydration",
				branch: "landing/preload-stars",
				agent: "Claude",
				icon: "/app-icons/coverage-claude-code.svg",
				activity: "Checks passed",
				activityState: "passed",
				pr: "PR #324",
				checks: "checks passed",
				files: "2 files",
				time: "1h ago",
				badge: "Changes requested",
				tone: "review",
			},
			{
				title: "Ignore local reference snapshots in deploy payloads",
				branch: "chore/ignore-refs",
				agent: "OpenCode",
				icon: "/app-icons/opencode.svg",
				activity: "Reviewer assigned",
				activityState: "waiting",
				pr: "PR #325",
				checks: "review pending",
				files: "2 files",
				time: "2h ago",
				badge: "Awaiting review",
				tone: "review",
			},
		],
	},
	{
		id: "merge",
		title: "Ready to merge",
		count: 3,
		cards: [
			{
				title: "Ship AO logo in top navigation",
				branch: "landing/topbar-ao-logo",
				agent: "Claude",
				icon: "/app-icons/coverage-claude-code.svg",
				activity: "Approved",
				activityState: "passed",
				pr: "PR #326",
				checks: "approved",
				files: "2 files",
				time: "3h ago",
				badge: "Changes requested",
				tone: "ready",
			},
			{
				title: "Stabilize Vercel framework detection",
				branch: "deploy/vercel-next-config",
				agent: "OpenCode",
				icon: "/app-icons/opencode.svg",
				activity: "Ready to land",
				activityState: "passed",
				pr: "PR #327",
				checks: "merge queue",
				files: "3 files",
				time: "4h ago",
				badge: "Ready",
				tone: "ready",
			},
		],
	},
] satisfies PreviewColumn[];

const projectItems: TrackItem[] = [
	{
		id: "landing",
		label: "Landing preview polish",
		summary: "Refresh the hero board, topbar, and landing sections without losing the AO product language.",
	},
	{
		id: "deploy",
		label: "Vercel deploy config",
		summary: "Keep framework detection and deploy payloads boring so every preview goes live cleanly.",
	},
	{
		id: "stars",
		label: "Preload stars and layout metrics",
		summary: "Move remote counts into server-rendered data so hydration does not shift the hero controls.",
	},
	{
		id: "icons",
		label: "Harness icon cleanup",
		summary: "Replace placeholder logos with real harness marks and keep the compatibility showcase readable.",
	},
	{
		id: "footer",
		label: "Footer and video section QA",
		summary: "Verify footer grids, demo video placement, and section order across the landing page.",
	},
];

const incomingCards: StaticPreviewCard[] = [
	{
		title: "Tighten hero window border alignment",
		branch: "landing/window-border-pass",
		agent: "Claude",
		icon: "/app-icons/coverage-claude-code.svg",
		activity: "Editing file",
		activityState: "running",
		pr: "draft",
		checks: "editing",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Repair mobile overflow on landing preview",
		branch: "landing/mobile-preview-overflow",
		agent: "Codex",
		icon: "/app-icons/coverage-codex.svg",
		activity: "Debugging issue",
		activityState: "running",
		pr: "draft",
		checks: "debugging",
		files: "4 files",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Remove stale generated icon imports",
		branch: "cleanup/stale-icon-imports",
		agent: "OpenCode",
		icon: "/app-icons/opencode.svg",
		activity: "Deleting file",
		activityState: "running",
		pr: "draft",
		checks: "cleanup",
		files: "2 files",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Make the kanban loop feel less mechanical",
		branch: "landing/random-kanban-loop",
		agent: "Claude",
		icon: "/app-icons/coverage-claude-code.svg",
		activity: "Tuning animation",
		activityState: "running",
		pr: "draft",
		checks: "animation pass",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Shrink card metadata copy for preview scale",
		branch: "landing/card-density",
		agent: "Cursor",
		icon: "/app-icons/cursor.svg",
		activity: "Editing file",
		activityState: "running",
		pr: "draft",
		checks: "editing",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Verify GitHub avatar fallback in project list",
		branch: "landing/repo-avatar",
		agent: "Codex",
		icon: "/app-icons/coverage-codex.svg",
		activity: "Running tests",
		activityState: "running",
		pr: "draft",
		checks: "tests",
		files: "2 files",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Tune titlebar action spacing against Figma",
		branch: "landing/titlebar-actions",
		agent: "OpenCode",
		icon: "/app-icons/opencode.svg",
		activity: "Measuring layout",
		activityState: "running",
		pr: "draft",
		checks: "layout pass",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Replace placeholder project copy with repo-specific tasks",
		branch: "landing/organic-dummy-data",
		agent: "Claude",
		icon: "/app-icons/coverage-claude-code.svg",
		activity: "Writing copy",
		activityState: "running",
		pr: "draft",
		checks: "copy pass",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
	{
		title: "Smooth card collapse when PRs merge out",
		branch: "landing/merge-collapse-motion",
		agent: "Codex",
		icon: "/app-icons/coverage-codex.svg",
		activity: "Debugging issue",
		activityState: "running",
		pr: "draft",
		checks: "motion debug",
		files: "1 file",
		time: "now",
		badge: null,
		tone: "default",
	},
];

function createInitialCards(): PreviewCard[] {
	return columns.flatMap((column) =>
		column.cards.slice(0, 1).map((card, index) => ({
			...card,
			column: column.id,
			id: `${column.id}-${index}`,
		})),
	);
}

function advanceCard(card: PreviewCard): PreviewCard {
	if (card.column === "working") {
		return {
			...card,
			column: "action",
			activity: card.agent === "Cursor" ? "Agent wants input" : "Paused for decision",
			activityState: "waiting",
			badge: "Needs input",
			tone: "blocked",
			time: "just now",
		};
	}

	if (card.column === "action") {
		return {
			...card,
			column: "pending",
			activity: "Reviewer assigned",
			activityState: "waiting",
			badge: "Awaiting review",
			tone: "review",
			time: "just now",
		};
	}

	return {
		...card,
		column: "merge",
		activity: "Ready to land",
		activityState: "passed",
		badge: "Ready",
		tone: "ready",
		time: "just now",
	};
}

function randomDelay() {
	return 1000 + Math.random() * 2000;
}

function randomItem<T>(items: T[]): T | null {
	if (items.length === 0) return null;
	return items[Math.floor(Math.random() * items.length)] ?? null;
}

function PanelIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" />
			<path d="M11 3v10" stroke="currentColor" />
		</svg>
	);
}

function SearchIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<circle cx="7" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.3" />
			<path d="m9.6 9.6 2.5 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
		</svg>
	);
}

function PinIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
			<path d="M10.8 1.9 14.1 5 12.9 6.2l-.8-.4-2.8 2.8.3 2.2-.8.8-2.7-2.7-2.9 2.9-.8-.8 2.9-2.9-2.7-2.7.8-.8 2.2.3 2.8-2.8-.4-.8 1.8-1.4Z" />
		</svg>
	);
}

function FolderIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M2 4.5h4.2l1 1H14v6.2a1.2 1.2 0 0 1-1.2 1.2H3.2A1.2 1.2 0 0 1 2 11.7V4.5Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.2"
			/>
		</svg>
	);
}

function BranchIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<circle cx="4" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
			<circle cx="4" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
			<circle cx="12" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
			<path d="M4 5v6M8 3.5h1.5A2.5 2.5 0 0 1 12 6v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
			<path d="m7.5 1.8 1.8 1.7-1.8 1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
		</svg>
	);
}

function GridIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M3 3h3v3H3zM10 3h3v3h-3zM3 10h3v3H3zM10 10h3v3h-3z" stroke="currentColor" />
		</svg>
	);
}

function PlusIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
		</svg>
	);
}

function BellIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<path
				d="M10 17.5a2 2 0 0 0 2-1.8H8a2 2 0 0 0 2 1.8ZM4.5 14.8h11l-1.2-1.9V8.5a4.3 4.3 0 0 0-8.6 0v4.4l-1.2 1.9Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.2"
			/>
		</svg>
	);
}

function BeakerIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M6 2.5h4M7 2.5v3.1l-3.1 5.2A1.8 1.8 0 0 0 5.5 13.5h5A1.8 1.8 0 0 0 12.1 10.8L9 5.6V2.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.2"
			/>
		</svg>
	);
}

function FileIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M4 2.5h5l3 3v8H4v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
			<path d="M9 2.5v3h3" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
		</svg>
	);
}

function GitHubIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
			<path d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.78.4.08.55-.18.55-.4 0-.2-.01-.86-.01-1.56-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.16-.28-.16-.68-.56-.01-.57.63-.01 1.08.59 1.23.84.72 1.24 1.87.89 2.33.68.07-.53.28-.89.51-1.09-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.42 7.42 0 0 1 8 3.52c.68 0 1.36.09 1.99.27 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.14-1.87 3.83-3.65 4.04.29.26.54.76.54 1.53 0 1.1-.01 1.99-.01 2.26 0 .22.15.48.55.4A8.15 8.15 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z" />
		</svg>
	);
}

function CheckIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="m3.2 8.2 3.1 3.1 6.5-6.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
		</svg>
	);
}

function WarningIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M8 2.3 14 13H2L8 2.3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
			<path d="M8 6.2v3.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
			<path d="M8 11.7h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
		</svg>
	);
}

function WaitingIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
			<path d="M6.3 5.8v4.4M9.7 5.8v4.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
		</svg>
	);
}

function SettingsIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.52a2 2 0 0 1-1 1.72l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.52a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.8"
			/>
			<circle
				cx="12"
				cy="12"
				r="3"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
		</svg>
	);
}

function WindowTitlebar({
	mergedCount,
	onNewTask,
	onViewChange,
	runningCount,
	viewMode,
	waitingCount,
}: {
	mergedCount: number;
	onNewTask: () => void;
	onViewChange: (mode: ViewMode) => void;
	runningCount: number;
	viewMode: ViewMode;
	waitingCount: number;
}) {
	return (
		<div className="flex h-10 shrink-0 items-center border-b border-[var(--preview-border)] bg-[var(--preview-background)] pl-3 pr-1.5">
			<div className="relative z-50 flex items-center gap-2">
				<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
				<span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
				<span className="h-3 w-3 rounded-full bg-[#28c840]" />
			</div>
			<div className="ml-5 flex min-w-0 items-center gap-2">
				<span className="truncate text-[12px] font-bold tracking-[-0.5px] text-[var(--preview-muted-foreground)]">
					{repoName}
				</span>
				<span className="rounded border border-[var(--preview-border)] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-[var(--preview-muted-foreground)]/70">
					{mergedCount} PRs merged
				</span>
				<span className="rounded border border-[var(--preview-border)] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-[var(--preview-muted-foreground)]/70">
					{runningCount} agents running
				</span>
				<span className="rounded border border-[var(--preview-border)] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-[var(--preview-muted-foreground)]/70">
					{waitingCount} waiting
				</span>
			</div>
			<div className="ml-auto flex items-center gap-1.5">
				<button
					type="button"
					onClick={() => onViewChange(viewMode === "orchestrator" ? "board" : "orchestrator")}
					className={`inline-flex h-[28px] items-center gap-2 rounded-[6px] border px-3 text-[12px] font-semibold transition-[background-color,border-color,color,transform] active:scale-[0.96] ${
						viewMode === "orchestrator"
							? "border-[var(--preview-ring)] bg-[var(--preview-muted)] text-[var(--preview-foreground)]"
							: "border-[var(--preview-border)] text-[var(--preview-muted-foreground)] hover:bg-[var(--preview-muted)]"
					}`}
				>
					<BeakerIcon className="h-4 w-4" />
					Orchestrator
				</button>
				<button
					type="button"
					onClick={onNewTask}
					className="inline-flex h-[28px] items-center gap-2 rounded-[8px] bg-[var(--preview-primary)] px-3 text-[12px] font-semibold text-[var(--preview-primary-foreground)] transition-transform active:scale-[0.96]"
				>
					<PlusIcon className="h-4 w-4" />
					New task
				</button>
				<button
					type="button"
					className="grid h-[28px] w-[28px] place-items-center rounded-[6px] border border-[var(--preview-border)] text-[var(--preview-muted-foreground)] transition-transform active:scale-[0.96]"
					aria-label="Notifications"
				>
					<BellIcon className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
}

function Sidebar({
	onSelectTrack,
	selectedTrackId,
}: {
	onSelectTrack: (trackId: TrackId) => void;
	selectedTrackId: TrackId;
}) {
	return (
		<aside className="flex w-[178px] shrink-0 flex-col border-r border-[var(--preview-sidebar-border)] bg-[var(--preview-sidebar)] text-[var(--preview-muted-foreground)]">
			<div className="flex h-[36px] items-center gap-2 px-3">
				<img
					src="/ao-logo.svg"
					alt=""
					width={18}
					height={18}
					aria-hidden="true"
					className="h-[18px] w-[18px]"
					draggable="false"
				/>
				<div className="min-w-0 flex-1 truncate text-[12px] font-semibold tracking-[-0.5px] text-[var(--preview-sidebar-foreground)]">
					AO
				</div>
				<PanelIcon className="h-3.5 w-3.5 shrink-0 text-[var(--preview-muted-foreground)]" />
			</div>

			<div className="px-3 pt-2">
				<div className="flex h-[18px] items-center gap-1.5 text-[9px] text-[var(--preview-muted-foreground)]/70">
					<SearchIcon className="h-3 w-3" />
					<span>Search</span>
				</div>
				<div className="mt-2 flex h-[18px] items-center gap-1.5 text-[9px] text-[var(--preview-muted-foreground)]/70">
					<PinIcon className="h-3 w-3" />
					<span>Pinned</span>
				</div>
			</div>

			<div className="mt-6 space-y-4 px-2.5">
				<div>
					<div className="mb-2 flex items-center justify-between px-0.5 text-[9px] font-bold tracking-[-0.5px] text-[var(--preview-muted-foreground)]/70">
						<span>Workspaces</span>
						<span className="text-[13px] font-normal">+</span>
					</div>
				</div>
				<div>
					<div className="mb-2 flex items-center justify-between px-0.5 text-[9px] font-bold tracking-[-0.5px] text-[var(--preview-muted-foreground)]/70">
						<span>Projects</span>
						<span className="text-[13px] font-normal">+</span>
					</div>
					<div className="flex h-[18px] items-center gap-1.5 text-[10px] text-[var(--preview-foreground)]">
						<img
							src={repoAvatar}
							alt=""
							width={14}
							height={14}
							aria-hidden="true"
							className="h-3.5 w-3.5 rounded-sm"
							draggable="false"
						/>
						<span className="min-w-0 flex-1 truncate">{repoName}</span>
						<GridIcon className="h-3.5 w-3.5 text-[var(--preview-muted-foreground)]" />
						<BranchIcon className="h-3.5 w-3.5 text-[var(--preview-muted-foreground)]" />
					</div>
					<div className="mt-0.5 space-y-0 pl-3">
						{projectItems.map((item) => (
							<button
								type="button"
								key={item.id}
								onClick={() => onSelectTrack(item.id)}
								className={`h-[22px] w-full truncate rounded-[4px] px-2 py-1 text-left text-[10px] leading-[14px] transition-colors ${
									item.id === selectedTrackId
										? "bg-[var(--preview-sidebar-accent)] text-[var(--preview-sidebar-foreground)]"
										: "text-[var(--preview-muted-foreground)] hover:bg-[var(--preview-sidebar-accent)] hover:text-[var(--preview-sidebar-foreground)]"
								}`}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="mt-auto border-t border-[var(--preview-sidebar-border)] px-3 py-3">
				<div className="flex items-center gap-1.5 text-[11px] text-[var(--preview-muted-foreground)]">
					<SettingsIcon className="h-3.5 w-3.5" />
					<span>Settings</span>
				</div>
			</div>
		</aside>
	);
}

function Topbar({
	mergedCount,
	selectedTrack,
	viewMode,
}: {
	mergedCount: number;
	selectedTrack: TrackItem;
	viewMode: ViewMode;
}) {
	return (
		<div className="flex h-[53px] shrink-0 items-center border-b border-[var(--preview-border)] bg-[var(--preview-card)] px-4">
			<div className="min-w-0">
				<div className="truncate text-[12px] font-bold tracking-[-0.5px] text-[var(--preview-muted-foreground)]">
					{viewMode === "orchestrator" ? "Orchestrator" : "Board"}, {selectedTrack.label.toLowerCase()}
				</div>
				<div className="mt-0.5 max-w-[420px] truncate text-[10px] text-[var(--preview-muted-foreground)]/75">
					{selectedTrack.summary}
				</div>
			</div>
			<div className="ml-auto grid grid-cols-2 gap-2 font-mono text-[10px] tabular-nums tracking-[0.5px] text-[var(--preview-muted-foreground)]/75">
				<span className="rounded border border-[var(--preview-border)] px-2 py-1">CI 2 failed</span>
				<span className="rounded border border-[var(--preview-border)] px-2 py-1">{mergedCount} Merged</span>
			</div>
		</div>
	);
}

function BoardCard({
	card,
	onMerge,
	onOpen,
}: {
	card: PreviewCard;
	onMerge: (id: string) => void;
	onOpen: (card: PreviewCard) => void;
}) {
	const [canPressScale, setCanPressScale] = useState(true);
	const prMatch = card.pr.match(/PR\s+#(\d+)/i);
	const prStatus =
		card.tone === "ready"
			? "approved"
			: card.tone === "review"
				? "in review"
				: card.tone === "blocked"
					? "changes requested"
					: "open";
	const prClass =
		card.tone === "ready"
			? "text-[#86efac]"
			: card.tone === "blocked"
				? "text-[#fdba74]"
				: card.tone === "review"
					? "text-[#fcd34d]"
					: "text-[#9ca3af]";

	return (
		<motion.div
			layout
			layoutId={`${card.id}-${card.column}`}
			role="button"
			tabIndex={0}
			aria-label={`Open ${card.title} agent status`}
			onClick={() => onOpen(card)}
			onPointerDownCapture={(event) => {
				const target = event.target as HTMLElement;
				setCanPressScale(!target.closest("button"));
			}}
			onPointerLeave={() => setCanPressScale(true)}
			onPointerUp={() => setCanPressScale(true)}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onOpen(card);
				}
			}}
			whileTap={canPressScale ? { scale: 0.96 } : undefined}
			initial={{ opacity: 0, scale: 0.98, y: -8 }}
			animate={
				card.merging
					? { opacity: 0, scale: 0.96, y: -8 }
					: { opacity: 1, scale: 1, y: 0 }
			}
			exit={{ opacity: 0, scale: 0.96, y: -8 }}
			transition={{
				duration: 0.45,
				ease: [0.22, 1, 0.36, 1],
				layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
			}}
			className="cursor-pointer rounded-[8px] border border-[var(--preview-border)] bg-[var(--preview-card)] p-[15px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] outline-none transition-colors hover:bg-[var(--preview-muted)] focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
		>
			<div className="flex items-start gap-2">
				<img
					src={card.icon}
					alt=""
					width={16}
					height={16}
					aria-hidden="true"
					className="mt-0.5 h-4 w-4 shrink-0"
					draggable="false"
				/>
				<div className="min-w-0 pr-2 text-[12px] font-medium leading-[16px] text-[var(--preview-card-foreground)]">
					{card.title}
				</div>
			</div>
			<div className="mt-3 text-[10px] leading-4 text-[var(--preview-muted-foreground)]">
				<div className="flex items-center gap-1.5 py-1.5">
					<BranchIcon className="h-3 w-3 shrink-0" />
					<span className="truncate font-mono">{card.branch}</span>
				</div>
				{prMatch ? (
					<div className={`flex items-center gap-1.5 border-t border-[var(--preview-border)] py-1.5 ${prClass}`}>
						<GitHubIcon className="h-3 w-3 shrink-0" />
						<span className="font-mono">#{prMatch[1]}</span>
						<span className="truncate">{prStatus}</span>
					</div>
				) : null}
			</div>
			{card.tone === "ready" ? (
				<div className="mt-3 flex items-center justify-between gap-2">
					<button
						type="button"
						onClick={(event) => {
							event.stopPropagation();
							onMerge(card.id);
						}}
						className="inline-flex h-7 items-center justify-center rounded-[6px] bg-[var(--preview-primary)] px-2.5 text-[10px] font-semibold text-[var(--preview-primary-foreground)] transition-transform active:scale-[0.96]"
					>
						Review and merge PR
					</button>
					<span className="shrink-0 text-[10px] text-[var(--preview-muted-foreground)]">{card.time}</span>
				</div>
			) : (
				<div className="mt-3 flex items-center justify-between">
					<span
						className={`inline-flex items-center gap-1.5 text-[10px] ${
							card.activityState === "passed"
								? "text-[#86efac]"
								: card.activityState === "failed"
									? "text-[#f87171]"
									: card.activityState === "waiting"
										? "text-[#fcd34d]"
										: "text-[#9ca3af]"
						}`}
					>
						{card.activityState === "passed" ? (
							<CheckIcon className="h-3 w-3" />
						) : card.activityState === "failed" ? (
							<WarningIcon className="h-3 w-3" />
						) : card.activityState === "waiting" ? (
							<WaitingIcon className="h-3 w-3" />
						) : (
							<span className="h-3 w-3 animate-spin rounded-full border border-[#4b5563] border-t-[#d1d5db]" />
						)}
						{card.activity}
					</span>
					<span className="text-[10px] text-[var(--preview-muted-foreground)]">{card.time}</span>
				</div>
			)}
		</motion.div>
	);
}

function BoardColumn({
	cards,
	count,
	onMerge,
	onOpen,
	title,
}: {
	cards: PreviewCard[];
	count: number;
	onMerge: (id: string) => void;
	onOpen: (card: PreviewCard) => void;
	title: string;
}) {
	return (
		<section className="flex min-h-0 min-w-0 flex-col border-r border-[var(--preview-border)] last:border-r-0">
			<div className="flex items-center border-b border-[var(--preview-border)] px-3 py-2.5">
				<div className="text-[11px] font-semibold tracking-[-0.5px] text-[var(--preview-muted-foreground)]">{title}</div>
				<div className="ml-2 text-[10px] tabular-nums text-[var(--preview-muted-foreground)]">{count}</div>
			</div>
			<div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2 scrollbar-hide">
				<AnimatePresence initial={false}>
					{cards.map((card) => (
						<BoardCard
							key={`${card.id}-${card.column}`}
							card={card}
							onMerge={onMerge}
							onOpen={onOpen}
						/>
					))}
				</AnimatePresence>
			</div>
		</section>
	);
}

function CloseIcon({ className = "" }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
		</svg>
	);
}

function AgentTerminalDisplay({ card }: { card: PreviewCard }) {
	const terminalElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = terminalElementRef.current;
		if (!element) return;

		element.replaceChildren();
		const cols = 72;
		const block = (text: string) => `\x1b[48;2;17;24;39m\x1b[37m ${text.padEnd(cols - 2, " ")} \x1b[0m\r\n`;

		const terminal = new XTerm({
			allowProposedApi: false,
			cols,
			convertEol: true,
			cursorBlink: false,
			disableStdin: true,
			fontFamily: 'Menlo, Monaco, "Courier New", monospace',
			fontSize: 11,
			lineHeight: 1.35,
			rows: 15,
			scrollback: 0,
			theme: {
				background: "oklch(0.153 0.006 107.1)",
				black: "oklch(0.153 0.006 107.1)",
				blue: "#93c5fd",
				brightBlack: "#6b7280",
				brightBlue: "#bfdbfe",
				brightGreen: "#bbf7d0",
				brightYellow: "#fde68a",
				cursor: "#d1d5db",
				foreground: "oklch(0.737 0.021 106.9)",
				green: "#86efac",
				red: "#fca5a5",
				white: "#f9fafb",
				yellow: "#fcd34d",
			},
		});

		terminal.open(element);
		terminal.write(block(card.title.toLowerCase()));
		terminal.write("I'll inspect the branch, check the current agent output, and keep\r\n");
		terminal.write("the fix scoped to this worktree.\r\n\r\n");
		terminal.write("\x1b[36m⏺ Read\x1b[0m(src/app/components/HeroSection/...)\r\n");
		terminal.write("  \x1b[2m⎿  opened preview component and current task state\x1b[0m\r\n\r\n");
		terminal.write(`\x1b[36m⏺ Bash\x1b[0m(${card.checks})\r\n`);
		terminal.write(`  \x1b[2m⎿  ${card.activity.toLowerCase()} · ${card.files.toLowerCase()}\x1b[0m\r\n\r\n`);
		terminal.write("\x1b[36m⏺ Edit\x1b[0m(agent status surface)\r\n");
		terminal.write(
			card.tone === "ready"
				? "  \x1b[32m⎿  ready to summarize and merge\x1b[0m\r\n\r\n"
				: "  \x1b[33m⎿  waiting on final agent output\x1b[0m\r\n\r\n",
		);
		terminal.write("checking whether this needs a patch, a review reply, or a merge\r\n");
		const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
		let spinnerIndex = 0;
		const renderSpinner = () => {
			const frame = spinnerFrames[spinnerIndex % spinnerFrames.length];
			spinnerIndex += 1;
			terminal.write(`\r\x1b[2K\x1b[35m${frame}\x1b[0m Thinking`);
			terminal.scrollToBottom();
		};
		renderSpinner();
		terminal.scrollToBottom();
		const spinnerInterval = window.setInterval(renderSpinner, 140);

		return () => {
			window.clearInterval(spinnerInterval);
			terminal.dispose();
		};
	}, [card]);

	return (
		<div className="mt-4 overflow-hidden rounded-xl border border-[var(--preview-border)] bg-[var(--preview-background)] p-3">
			<div
				ref={terminalElementRef}
				className="pointer-events-none h-[236px] select-none overflow-hidden [font-feature-settings:'liga'_0] [&_.xterm-viewport]:!overflow-hidden"
			/>
		</div>
	);
}

function AgentMetaItem({
	children,
	Icon,
}: {
	children: ReactNode;
	Icon: (props: { className?: string }) => ReactNode;
}) {
	return (
		<div className="flex min-w-0 items-center gap-2 rounded-lg border border-[var(--preview-border)] bg-[var(--preview-muted)] px-3 py-2 text-[10px] text-[var(--preview-muted-foreground)]">
			<Icon className="h-3.5 w-3.5 shrink-0 text-[var(--preview-foreground)]" />
			<span className="truncate">{children}</span>
		</div>
	);
}

function AgentStatusModal({
	card,
	onClose,
}: {
	card: PreviewCard | null;
	onClose: () => void;
}) {
	return (
		<AnimatePresence initial={false}>
			{card ? (
				<>
					<motion.div
						key="agent-status-titlebar-blur"
						className="absolute inset-x-0 bottom-auto top-0 z-40 h-10 bg-black/35 backdrop-blur-[1px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
						onClick={onClose}
					/>
					<motion.div
						key="agent-status-overlay"
						className="absolute inset-x-0 bottom-0 top-10 z-40 grid place-items-center bg-black/35 p-8 backdrop-blur-[1px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
						onClick={onClose}
					>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label={`${card.title} agent status`}
						className="w-[520px] max-w-full rounded-2xl border border-[var(--preview-border)] bg-[var(--preview-card)] p-4 text-[var(--preview-card-foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] outline-none"
						initial={{ opacity: 0, scale: 0.99 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.99 }}
						transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
						onClick={(event) => event.stopPropagation()}
					>
						<div className="flex items-start gap-3">
							<img
								src={card.icon}
								alt=""
								width={24}
								height={24}
								aria-hidden="true"
								className="mt-0.5 h-6 w-6"
								draggable="false"
							/>
							<div className="min-w-0 flex-1">
								<div className="text-[13px] font-semibold tracking-[-0.5px] text-[var(--preview-foreground)]">
									{card.agent} worker
								</div>
								<div className="mt-1 truncate font-mono text-[10px] tabular-nums text-[var(--preview-muted-foreground)]">
									{card.branch} · {card.pr}
								</div>
							</div>
							<button
								type="button"
								onClick={onClose}
								className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[var(--preview-muted-foreground)] transition-[background-color,color,transform] hover:bg-[var(--preview-muted)] hover:text-[var(--preview-foreground)] active:scale-[0.96]"
								aria-label="Close agent status"
							>
								<CloseIcon className="h-4 w-4" />
							</button>
						</div>

						<div className="mt-4 grid grid-cols-2 gap-2">
							<AgentMetaItem Icon={BranchIcon}>{card.branch}</AgentMetaItem>
							<AgentMetaItem Icon={FileIcon}>{card.files} changed</AgentMetaItem>
							<AgentMetaItem Icon={GitHubIcon}>{card.pr}</AgentMetaItem>
							<AgentMetaItem
								Icon={
									card.activityState === "passed"
										? CheckIcon
										: card.activityState === "failed"
											? WarningIcon
											: WaitingIcon
								}
							>
								{card.activity}
							</AgentMetaItem>
						</div>

						<AgentTerminalDisplay card={card} />
					</motion.div>
				</motion.div>
				</>
			) : null}
		</AnimatePresence>
	);
}

function OrchestratorView({
	cards,
	onNewTask,
	selectedTrack,
}: {
	cards: PreviewCard[];
	onNewTask: () => void;
	selectedTrack: TrackItem;
}) {
	const activeCards = cards.filter((card) => !card.merging);
	const workingCards = activeCards.filter((card) => card.column === "working");
	const waitingCards = activeCards.filter((card) => card.column === "action");
	const readyCards = activeCards.filter((card) => card.column === "merge");
	const leadWorker = workingCards[0] ?? activeCards[0];

	return (
		<div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.05fr)_minmax(260px,0.65fr)] overflow-hidden bg-[var(--preview-background)]">
			<section className="flex min-h-0 flex-col border-r border-[var(--preview-border)] p-4">
				<div className="flex items-center gap-3">
					<div className="grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--preview-border)] bg-[var(--preview-muted)] text-[var(--preview-foreground)]">
						<BeakerIcon className="h-5 w-5" />
					</div>
					<div className="min-w-0">
						<div className="text-[13px] font-semibold tracking-[-0.5px] text-[var(--preview-foreground)]">
							AO Orchestrator
						</div>
						<div className="truncate text-[10px] text-[var(--preview-muted-foreground)]">
							Planning workers for {selectedTrack.label.toLowerCase()}
						</div>
					</div>
				</div>

				<div className="mt-5 rounded-[10px] border border-[var(--preview-border)] bg-[var(--preview-card)] p-4">
					<div className="mb-3 text-[11px] font-semibold tracking-[-0.5px] text-[var(--preview-muted-foreground)]">
						Current plan
					</div>
					<div className="space-y-3 text-[12px] leading-5 text-[var(--preview-foreground)]">
						<div className="flex gap-2">
							<CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#86efac]" />
							<span>Read project context and split the track into worker-sized branches.</span>
						</div>
						<div className="flex gap-2">
							<span className="mt-1 h-3 w-3 shrink-0 animate-spin rounded-full border border-[#4b5563] border-t-[#d1d5db]" />
							<span>
								Keep {workingCards.length || 1} worker{workingCards.length === 1 ? "" : "s"} moving while routing blockers back here.
							</span>
						</div>
						<div className="flex gap-2">
							<WaitingIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#fcd34d]" />
							<span>
								Escalate {waitingCards.length} decision{waitingCards.length === 1 ? "" : "s"} and queue {readyCards.length} approved PR{readyCards.length === 1 ? "" : "s"} for merge.
							</span>
						</div>
					</div>
				</div>

				<div className="mt-4 min-h-0 flex-1 rounded-[10px] border border-[var(--preview-border)] bg-[var(--preview-card)] p-4 font-mono text-[11px] leading-5 text-[var(--preview-muted-foreground)]">
					<div className="text-[var(--preview-muted-foreground)]">ao orchestrator</div>
					<div className="mt-3 text-[var(--preview-foreground)]">
						<span className="text-[#60a5fa]">track</span> {selectedTrack.id}
					</div>
					<div className="mt-2 text-[var(--preview-foreground)]">
						<span className="text-[#60a5fa]">next</span>{" "}
						{leadWorker ? `watch ${leadWorker.branch}` : "spawn first worker"}
					</div>
					<div className="mt-2 text-[var(--preview-muted-foreground)]">
						Workers report back here when checks fail, reviews arrive, or a branch is ready to land.
					</div>
				</div>
			</section>

			<aside className="flex min-h-0 flex-col bg-[var(--preview-background)] p-4">
				<div className="text-[11px] font-semibold tracking-[-0.5px] text-[var(--preview-muted-foreground)]">
					Worker queue
				</div>
				<div className="mt-3 space-y-2 overflow-y-auto scrollbar-hide">
					{activeCards.slice(0, 4).map((card) => (
						<div key={card.id} className="rounded-[8px] border border-[var(--preview-border)] bg-[var(--preview-card)] p-3">
							<div className="flex items-center gap-2">
								<img
									src={card.icon}
									alt=""
									width={14}
									height={14}
									aria-hidden="true"
									className="h-3.5 w-3.5"
									draggable="false"
								/>
								<div className="min-w-0 flex-1 truncate text-[11px] font-medium text-[var(--preview-card-foreground)]">
									{card.title}
								</div>
							</div>
							<div className="mt-2 truncate font-mono text-[10px] text-[var(--preview-muted-foreground)]">
								{card.branch}
							</div>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={onNewTask}
					className="mt-4 inline-flex h-8 items-center justify-center gap-2 rounded-[8px] bg-[var(--preview-primary)] px-3 text-[12px] font-semibold text-[var(--preview-primary-foreground)] transition-transform active:scale-[0.96]"
				>
					<PlusIcon className="h-4 w-4" />
					Spawn worker
				</button>
			</aside>
		</div>
	);
}

export function AppMockup() {
	const [cards, setCards] = useState<PreviewCard[]>(createInitialCards);
	const [mergedCount, setMergedCount] = useState(18);
	const [boardVersion, setBoardVersion] = useState(0);
	const [selectedTrackId, setSelectedTrackId] = useState<TrackId>("landing");
	const [selectedCard, setSelectedCard] = useState<PreviewCard | null>(null);
	const [viewMode, setViewMode] = useState<ViewMode>("board");
	const incomingIndex = useRef(0);
	const selectedTrack =
		projectItems.find((item) => item.id === selectedTrackId) ?? projectItems[0];

	const mergeCard = useCallback((id: string) => {
		setCards((current) =>
			current.map((card) => (card.id === id ? { ...card, merging: true } : card)),
		);

		window.setTimeout(() => {
			setCards((current) => current.filter((card) => card.id !== id));
			setMergedCount((current) => current + 1);
		}, 520);
	}, []);

	const spawnRandomTask = useCallback(() => {
		setViewMode("board");
		setCards((current) => {
			const existingTitles = new Set(current.map((card) => card.title));
			const startIndex = Math.floor(Math.random() * incomingCards.length);
			const templateOffset = incomingCards.findIndex((_, offset) => {
				const candidate = incomingCards[(startIndex + offset) % incomingCards.length];
				return candidate ? !existingTitles.has(candidate.title) : false;
			});

			if (templateOffset < 0) return current;

			const templateIndex = (startIndex + templateOffset) % incomingCards.length;
			const template = incomingCards[templateIndex];
			if (!template) return current;

			incomingIndex.current += 1;
			return [
				{
					...template,
					badge: "New task",
					column: "working",
					id: `manual-${Date.now()}-${incomingIndex.current}`,
					time: "now",
				},
				...current,
			];
		});
	}, []);

	const selectTrack = useCallback((trackId: TrackId) => {
		setSelectedTrackId(trackId);
		setSelectedCard(null);
		setViewMode("board");
		setBoardVersion((current) => current + 1);
		setCards(createInitialCards());
	}, []);

	const selectedCardId = selectedCard?.id ?? null;

	useEffect(() => {
		let timeoutId: number;

		const scheduleNext = () => {
			timeoutId = window.setTimeout(runStep, randomDelay());
		};

		const runStep = () => {
			setCards((current) => {
				const chosen = randomItem(
					current.filter((card) => !card.merging && card.id !== selectedCardId),
				);

				let next = current;
				if (chosen) {
					if (chosen.column === "merge") {
						window.setTimeout(() => mergeCard(chosen.id), 0);
					} else {
						next = current.map((card) =>
							card.id === chosen.id ? advanceCard(card) : card,
						);
					}
				}

				const workingCount = next.filter((card) => card.column === "working").length;
				const activeCount = next.filter((card) => !card.merging).length;
				if (workingCount < 2 && activeCount < 7 && Math.random() < 0.5) {
					const existingTitles = new Set(next.map((card) => card.title));
					const templateOffset = incomingCards.findIndex((_, offset) => {
						const candidate =
							incomingCards[(incomingIndex.current + offset) % incomingCards.length];
						return candidate ? !existingTitles.has(candidate.title) : false;
					});

					if (templateOffset >= 0) {
						const templateIndex =
							(incomingIndex.current + templateOffset) % incomingCards.length;
						const template = incomingCards[templateIndex];
						if (template) {
							incomingIndex.current = templateIndex + 1;
							next = [
								{
									...template,
									column: "working",
									id: `incoming-${incomingIndex.current}`,
								},
								...next,
							];
						}
					}
				}

				return next;
			});

			scheduleNext();
		};

		scheduleNext();
		return () => window.clearTimeout(timeoutId);
	}, [mergeCard, selectedCardId]);

	const runningCount = cards.filter((card) => card.column === "working").length;
	const waitingCount = cards.filter((card) => card.column === "action").length;
	const boardColumns = columns.map((column) => {
		const columnCards = cards.filter((card) => card.column === column.id);
		return {
			...column,
			cards: columnCards,
			count: columnCards.length,
		};
	});

	return (
		<div
			className="relative w-full min-w-[1024px] select-none overflow-hidden rounded-xl border border-[var(--preview-border)] bg-[var(--preview-background)] font-sans tracking-[-0.5px] text-[var(--preview-foreground)] antialiased shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] [&_.font-mono]:tracking-normal"
			style={{ ...previewTokenStyle, aspectRatio: "1024 / 615" }}
		>
			<div className="flex h-full flex-col">
				<WindowTitlebar
					mergedCount={mergedCount}
					onNewTask={spawnRandomTask}
					onViewChange={setViewMode}
					runningCount={runningCount}
					viewMode={viewMode}
					waitingCount={waitingCount}
				/>
				<div className="flex min-h-0 flex-1">
					<Sidebar
						onSelectTrack={selectTrack}
						selectedTrackId={selectedTrack.id}
					/>
					<div className="flex min-w-0 flex-1 flex-col bg-[var(--preview-background)]">
						<Topbar
							mergedCount={mergedCount}
							selectedTrack={selectedTrack}
							viewMode={viewMode}
						/>
						{viewMode === "orchestrator" ? (
							<OrchestratorView
								cards={cards}
								onNewTask={spawnRandomTask}
								selectedTrack={selectedTrack}
							/>
						) : (
							<LayoutGroup key={`${selectedTrack.id}-${boardVersion}`}>
								<div className="grid min-h-0 flex-1 grid-cols-4 overflow-hidden">
									{boardColumns.map((column) => (
										<BoardColumn
											key={column.title}
											{...column}
											onMerge={mergeCard}
											onOpen={setSelectedCard}
										/>
									))}
								</div>
							</LayoutGroup>
						)}
					</div>
				</div>
			</div>
			<AgentStatusModal
				card={selectedCard}
				onClose={() => setSelectedCard(null)}
			/>
		</div>
	);
}
