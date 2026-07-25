"use client";

import { AppMockup } from "../AppMockup";

export function ProductDemo() {
	return (
		<div className="relative w-full max-w-full">
			<div
				className="relative overflow-hidden bg-card p-3 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)] sm:p-4 lg:p-6"
				style={{
					backgroundImage: "url('/hero-background.jpeg')",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<div className="pointer-events-none absolute inset-0 bg-background/35" />
				<div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-foreground/[0.08] blur-3xl" />
				<div className="relative mx-auto w-full py-6 sm:py-8 lg:py-10">
					<div className="relative">
						<div className="absolute inset-[10%] top-[20%] rounded-3xl bg-white/[0.07] blur-[60px] pointer-events-none" />
						<div className="relative overflow-x-auto rounded-2xl scrollbar-hide">
							<AppMockup />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
