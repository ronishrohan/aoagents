import { COMPANY } from "@superset/shared/constants";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  FAQPageJsonLd,
  HomeWebPageJsonLd,
  OrganizationJsonLd,
} from "@/components/JsonLd";
import { FAQ_ITEMS } from "./components/FAQSection";
import { HeroSection } from "./components/HeroSection";

const TrustedBySection = dynamic(() =>
  import("./components/TrustedBySection").then((mod) => mod.TrustedBySection),
);
const FeaturesSection = dynamic(() =>
  import("./components/FeaturesSection").then((mod) => mod.FeaturesSection),
);
const VideoSection = dynamic(() =>
  import("./components/VideoSection").then((mod) => mod.VideoSection),
);
const WallOfLoveSection = dynamic(() =>
  import("./components/WallOfLoveSection").then((mod) => mod.WallOfLoveSection),
);
const FAQSection = dynamic(() =>
  import("./components/FAQSection").then((mod) => mod.FAQSection),
);

export const metadata: Metadata = {
  alternates: {
    canonical: COMPANY.MARKETING_URL,
  },
};

export default function Home() {
  return (
    <main className="flex flex-col bg-background">
      <FAQPageJsonLd items={FAQ_ITEMS} />
      <HomeWebPageJsonLd />
      <OrganizationJsonLd />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <WallOfLoveSection />
      <VideoSection />
      <FAQSection />
    </main>
  );
}
