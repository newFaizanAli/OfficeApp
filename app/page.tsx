"use client";

import { CoreIdentity, Overview, Hero, Marquee, ClosingBanner } from "@/page-comp/home";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <CoreIdentity />
      <Overview />
      <Marquee />
      {/* <SelectedWork /> */}
      {/* <Services /> */}
      {/* <About /> */}
      {/* <Testimonial /> */}
      <ClosingBanner />
    </div>
  );
}