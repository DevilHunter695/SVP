import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CoreBeliefs } from "@/components/home/CoreBeliefs";
import { BrandStory } from "@/components/home/BrandStory";

export const metadata: Metadata = {
  title: "Sri Venture Partners — We Fix What Others Fear To Touch",
  description:
    "An MSME distressed-asset investment fund transforming Non Performing Assets into Performing Assets through patient capital, restructuring, and operational execution. MSME :: Capital :: Propel.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreBeliefs />
      <BrandStory />
    </>
  );
}
