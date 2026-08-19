"use client";

import { About, CoreIdentity, CorePillars, Hero, Marquee, SelectedWork, Services, Testimonial } from "@/page-comp/home";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <CoreIdentity />
      {/* <CorePillars />
      <Marquee /> */}
      {/* <SelectedWork /> */}
      {/* <Services /> */}
      {/* <About />
      <Testimonial /> */}
    </div>
  );
}