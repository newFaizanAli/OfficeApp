"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard, WordRevealParagraph, SkewUpParagraph } from "@/page-comp/about";
gsap.registerPlugin(ScrollTrigger);


function AboutContent() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Word-color reveal blocks (Who We Are intro) */
            const revealBlocks = gsap.utils.toArray<HTMLElement>(".scroll-reveal-block");
            revealBlocks.forEach((block) => {
                const words = block.querySelectorAll(".scroll-reveal-word");
                gsap.to(words, {
                    color: "#09090b",
                    stagger: 0.08,
                    ease: "none",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: 0.5,
                    },
                });
            });

            /* Word rise-in blocks, with a touch of 3D rotation on the X axis */
            const skewElements = gsap.utils.toArray<HTMLElement>("[data-skew-up]");
            skewElements.forEach((el) => {
                const words = el.querySelectorAll(".word");
                gsap.fromTo(
                    words,
                    { y: 40, opacity: 0, rotateX: -60, transformOrigin: "50% 100%" },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1,
                        stagger: 0.02,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            /* Hairline dividers drawing in under each eyebrow */
            const lineMasks = gsap.utils.toArray<HTMLElement>(".line-mask");
            lineMasks.forEach((mask) => {
                gsap.to(mask, {
                    width: "100%",
                    duration: 1.1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: mask,
                        start: "top 90%",
                    },
                });
            });

            if (sectionRef.current) {
                /* Section-wide depth: headline drifts forward on Z as you scroll into it */
                const headline = sectionRef.current.querySelector(".depth-headline");
                if (headline) {
                    gsap.fromTo(
                        headline,
                        { z: -200, opacity: 0, rotateX: 12 },
                        {
                            z: 0,
                            opacity: 1,
                            rotateX: 0,
                            duration: 1.3,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headline,
                                start: "top 85%",
                            },
                        }
                    );
                }

                /* Founder portrait: 3D swing-in (rotateY) combined with a clip reveal */
                const portrait = sectionRef.current.querySelector(".founder-portrait");
                if (portrait) {
                    gsap.fromTo(
                        portrait,
                        {
                            clipPath: "inset(100% 0% 0% 0%)",
                            rotateY: -22,
                            transformPerspective: 1200,
                        },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            rotateY: 0,
                            duration: 1.3,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: portrait,
                                start: "top 85%",
                            },
                        }
                    );

                    /* Gentle continuous parallax tilt while scrolling past it */
                    gsap.to(portrait, {
                        rotateY: 6,
                        rotateX: -3,
                        ease: "none",
                        scrollTrigger: {
                            trigger: portrait,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });
                }

                /* Pull-quote: flips up out of the page like a tilted slab */
                const quote = sectionRef.current.querySelector(".signature-quote");
                if (quote) {
                    gsap.fromTo(
                        quote,
                        {
                            opacity: 0,
                            rotateX: 35,
                            transformPerspective: 1400,
                            transformOrigin: "50% 100%",
                        },
                        {
                            opacity: 1,
                            rotateX: 0,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: quote,
                                start: "top 82%",
                            },
                        }
                    );
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section relative w-full overflow-hidden bg-white text-black px-6 md:px-12 py-24 md:py-32 [perspective:1600px]"
        >
            <div className="mx-auto w-full max-w-7xl relative z-10">

                {/* ---------------- WHO WE ARE ---------------- */}
                <div className="mb-28 md:mb-36">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium whitespace-nowrap">
                            Who We Are
                        </span>
                        <span className="line-mask h-px bg-zinc-300 w-0 flex-1 block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-end [transform-style:preserve-3d]">
                        <h2 className="depth-headline text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extralight leading-[1.15] tracking-tight text-zinc-950">
                            A new-age product solution agency — engineering growth, not just marketing it.
                        </h2>

                        <WordRevealParagraph
                            className="text-xl md:text-2xl"
                            text="We help founders, growing businesses, and organisations discover the right products, shape powerful brands, launch with impact, and scale with intent. With our in-house Infinity Studio, full production capabilities, and a founder-led coaching and funding vision, we don't just market brands — we engineer growth. From product discovery to brand elevation, Palette & Pixel is where ideas turn into scalable businesses."
                        />
                    </div>
                </div>

                {/* ---------------- MISSION / VISION ---------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28 md:mb-36">
                    {/* Mission — inverted black card, tilts toward the cursor */}
                    <TiltCard className="bg-zinc-950 text-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-14 flex flex-col justify-between min-h-[420px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium">
                                Our Mission
                            </span>
                            <span className="line-mask h-px bg-zinc-700 w-0 flex-1 block" />
                        </div>
                        <SkewUpParagraph
                            className="text-2xl md:text-[32px] leading-snug font-normal"
                            text="We exist to build brands that mean something. Not trends. Not noise. Not shortcuts. We turn ideas into products, products into brands, and brands into systems built to scale — with clarity, intention, and execution that actually delivers."
                        />
                    </TiltCard>

                    {/* Vision — white / outlined card, tilts toward the cursor */}
                    <TiltCard glow="dark" className="bg-white text-zinc-950 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-14 flex flex-col justify-between min-h-[420px] border border-zinc-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium">
                                Our Vision
                            </span>
                            <span className="line-mask h-px bg-zinc-300 w-0 flex-1 block" />
                        </div>
                        <SkewUpParagraph
                            className="text-2xl md:text-[32px] leading-snug font-normal text-zinc-700"
                            text="We're building a future where brands are treated like products — designed with purpose, launched with precision, and scaled with structure. A future where founders think deeper, move smarter, and build brands that don't just exist — they lead."
                        />
                    </TiltCard>
                </div>

                {/* ---------------- THE MIND BEHIND ---------------- */}
                <div>
                    <div className="flex items-center gap-4 mb-12">
                        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium whitespace-nowrap">
                            The Mind Behind
                        </span>
                        <span className="line-mask h-px bg-zinc-300 w-0 flex-1 block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 [perspective:1400px]">
                        {/* Portrait — replace src with real founder photo. 3D swing-in + scroll parallax tilt. */}
                        <div className="founder-portrait rounded-[2.5rem] overflow-hidden bg-zinc-100 min-h-[420px] lg:min-h-[520px] [transform-style:preserve-3d]">
                            <img
                                src="https://picsum.photos/seed/founder-portrait/900/1100"
                                alt="Ahmed Amin Malik, Founder of Palette & Pixel"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-12">
                            <div>
                                <h3 className="text-3xl md:text-5xl font-normal tracking-tight text-zinc-950 mb-2">
                                    Ahmed Amin Malik
                                </h3>
                                <p className="text-sm md:text-base tracking-[0.15em] uppercase text-zinc-500 mb-8">
                                    Founder
                                </p>

                                <SkewUpParagraph
                                    className="text-lg md:text-2xl leading-relaxed text-zinc-600 max-w-2xl"
                                    text="With the experience of building a global marketing firm, a hospitality business, tech platforms, and creative event curations — across markets, industries, and scales — our founder believes brands should be built the way products are built: with clarity, structure, testing, and intent."
                                />
                            </div>

                            {/* Triad — a repeated pattern, not an arbitrary sequence. Each tilts on hover. */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
                                {[
                                    ["Strategy", "before noise"],
                                    ["Identity", "before amplification"],
                                    ["Systems", "before scale"],
                                ].map(([lead, rest], i) => (
                                    <TiltCard
                                        key={i}
                                        max={10}
                                        liftZ={16}
                                        glow="dark"
                                        className="rounded-2xl px-1 py-1"
                                    >
                                        <div data-skew-up className="flex flex-col gap-1">
                                            <span className="word inline-block text-xl md:text-2xl font-normal text-zinc-950">
                                                {lead}
                                            </span>
                                            <span className="word inline-block text-sm md:text-base text-zinc-500">
                                                {rest}
                                            </span>
                                        </div>
                                    </TiltCard>
                                ))}
                            </div>

                            <SkewUpParagraph
                                className="text-lg md:text-2xl leading-relaxed text-zinc-600 max-w-2xl"
                                text="At Palette & Pixel, his role is not to chase trends — but to challenge assumptions, sharpen thinking, and guide teams and founders toward decisions that actually move markets. We are not a reset. We are an evolution."
                            />
                        </div>
                    </div>

                    {/* Signature element — the founder's quote. Flips up into place on scroll, tilts gently on hover. */}
                    <div className="[perspective:1400px] mt-20 md:mt-28">
                        <TiltCard
                            max={4}
                            liftZ={12}
                            className="signature-quote relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] px-8 md:px-20 py-16 md:py-24 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -top-10 left-4 md:left-10 text-[220px] md:text-[340px] leading-none font-serif italic text-white/[0.04] select-none pointer-events-none"
                            >
                                "
                            </span>
                            <blockquote className="relative z-10 max-w-4xl mx-auto text-center">
                                <p className="font-serif italic text-white text-3xl sm:text-4xl md:text-5xl leading-snug tracking-tight">
                                    What we learned building brands&hellip; became the reason we rebuilt the system.
                                </p>
                                <footer className="mt-8 text-zinc-500 text-sm md:text-base tracking-[0.15em] uppercase">
                                    Ahmed Amin Malik &mdash; Founder, Palette &amp; Pixel
                                </footer>
                            </blockquote>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutContent