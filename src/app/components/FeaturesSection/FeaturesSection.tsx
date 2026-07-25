"use client";

import { FeatureDemo } from "./components/FeatureDemo";
import { DelegationDemo } from "./components/DelegationDemo/DelegationDemo";
import { FeedbackLoopDemo } from "./components/FeedbackLoopDemo/FeedbackLoopDemo";
import { FleetBoardDemo } from "./components/FleetBoardDemo/FleetBoardDemo";
import { HarnessCoverageDemo } from "./components/HarnessCoverageDemo/HarnessCoverageDemo";
import { FEATURES } from "./constants";

const DEMO_COMPONENTS = [
	DelegationDemo,
	FleetBoardDemo,
	FeedbackLoopDemo,
	HarnessCoverageDemo,
];

const FEATURE_BACKGROUNDS = [
	"/feature3.png",
	"/feature.png",
	"/feature4.png",
	"/feature2.png",
] as const;

export function FeaturesSection() {
	return (
		<section className="relative px-4 py-16 sm:px-8 sm:py-20 lg:px-[30px] lg:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Feature Rows */}
				<div className="space-y-20 sm:space-y-24 lg:space-y-32">
					{FEATURES.map((feature, index) => {
						const isReversed = index % 2 === 1;
						const DemoComponent = DEMO_COMPONENTS[index];
						return (
							<div
								key={feature.title}
								className={`grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 ${
									isReversed ? "lg:direction-rtl" : ""
								}`}
							>
								{/* Text Content */}
								<div
									className={`space-y-6 ${isReversed ? "lg:order-2 lg:text-right" : "lg:order-1"}`}
								>
									<div className="space-y-4">
										<span className="text-sm font-mono text-muted-foreground tracking-[0.5px]">
											{feature.tag}
										</span>
										<h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.5px] text-foreground">
											{feature.title}
										</h3>
									</div>
									<p
										className={`text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[500px] ${isReversed ? "lg:ml-auto" : ""}`}
									>
										{feature.description}
									</p>
								</div>

								{/* Demo */}
								<div className={`${isReversed ? "lg:order-1" : "lg:order-2"}`}>
									<FeatureDemo
										className={index === 3 ? "overflow-visible" : ""}
										backgroundImage={
											FEATURE_BACKGROUNDS[index % FEATURE_BACKGROUNDS.length]
										}
									>
										{DemoComponent && <DemoComponent />}
									</FeatureDemo>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
