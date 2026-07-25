"use client";

import { AppMockup } from "../AppMockup";

export function ProductDemo() {
	return (
		<div className="relative w-full max-w-full">
			<div
				className="relative min-h-[720px] overflow-hidden bg-card p-3 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] sm:p-4 lg:p-6"
				style={{
					backgroundImage: "url('/hero-background.jpeg')",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<div className="pointer-events-none absolute inset-0 bg-background/35" />
				<div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-foreground/[0.08] blur-3xl" />
				<div className="pointer-events-none absolute inset-[10%] top-[20%] rounded-3xl bg-white/[0.07] blur-[60px]" />
				<AppMockup />
			</div>
		</div>
	);
}
