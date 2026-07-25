"use client";

import { COMPANY, HERO_SUBHEADLINE, TAGLINE } from "@superset/shared/constants";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { DownloadButton } from "../DownloadButton";
import { ProductDemo } from "./components/ProductDemo";

export function HeroSection() {
  const demoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start 0.45", "start 0"],
  });

  return (
    <div>
      <div className="flex flex-col items-center pt-24 sm:pt-32 lg:pt-36 overflow-hidden">
        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[30px]">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-5 sm:space-y-7">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-normal tracking-[0.5px] leading-[0.96] text-foreground max-w-6xl mx-auto text-balance">
                {TAGLINE}
              </h1>
              <p
                id="hero-subheadline"
                className="text-base sm:text-xl font-normal leading-8 text-muted-foreground max-w-4xl mx-auto text-balance"
              >
                {HERO_SUBHEADLINE}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <DownloadButton />
              <button
                type="button"
                className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base tracking-[0.5px] font-normal bg-background border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                onClick={() => window.open(COMPANY.GITHUB_URL, "_blank")}
                aria-label="Star on GitHub"
              >
                Star on GitHub
                <FaGithub className="size-4" />
              </button>
            </div>
          </div>

          <div
            ref={demoRef}
            className="relative w-full mt-12 sm:mt-16 lg:mt-20"
          >
            <ProductDemo scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
