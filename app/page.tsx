"use client";

import { About, BellowHero, Hero, Marquee, SelectedWork, Services, Testimonial } from "@/page-comp/home";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <BellowHero />
      {/* <Marquee />
      <SelectedWork />
      <Services />
      <About />
      <Testimonial /> */}
    </div>
  );
}