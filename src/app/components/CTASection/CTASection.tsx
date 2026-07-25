"use client";

import { DownloadButton } from "../DownloadButton";

export function CTASection() {
  return (
    <section className="relative py-32 px-8 lg:px-[30px]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-medium tracking-[-0.5px] leading-[1.1] text-foreground mb-4">
          Your agents are waiting.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8">
          Free and open source under Apache 2.0. Download it, point it at a repo, and merge your first agent-written PR tonight.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <DownloadButton />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          macOS · Windows · Linux · nightly builds · no account required
        </p>
      </div>
    </section>
  );
}
