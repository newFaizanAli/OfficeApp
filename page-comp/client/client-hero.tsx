"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ClientsOrb from "./clients-orb";


export default function ClientsHero() {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(
                ".hero-eyebrow",
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.8 }
            )
                .fromTo(
                    ".hero-line",
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
                    "-=0.4"
                )
                .fromTo(
                    ".hero-intro",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
                    "-=0.5"
                );
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative min-h-screen w-full overflow-hidden bg-paper"
        >
            <div className="pointer-events-none absolute inset-0 opacity-90">
                <ClientsOrb />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 md:px-10">
                <p className="hero-eyebrow font-sans text-[11px] font-medium uppercase tracking-widest2 text-mute">
                    Clients &amp; Collaborators
                </p>

                <h1 className="mt-8 max-w-4xl font-sans text-[13vw] font-extralight leading-[0.95] tracking-tight text-ink md:text-[6.2vw]">
                    <span className="hero-line block">Brands that don&apos;t</span>
                    <span className="hero-line block">just get noticed —</span>
                    <span className="hero-line block italic text-mute">
                        they get remembered.
                    </span>
                </h1>

                <p className="hero-intro mt-10 max-w-xl font-sans text-base font-extralight leading-relaxed text-ink/80 md:text-lg">
                    From global technology leaders to ambitious local ventures, our
                    work spans industries, markets, and scales.
                </p>

                <div className="hero-intro mt-16 flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-mute">
                    <span className="h-px w-10 bg-ink/30" />
                    Scroll to explore
                </div>
            </div>
        </section>
    );
}