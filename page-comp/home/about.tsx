"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WordRevealParagraph = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
        <p className="text-4xl leading-relaxed font-normal">
            {words.map((word, i) => (
                <span
                    key={i}
                    className="scroll-reveal-word text-zinc-300 inline-block mr-[0.25em]"
                >
                    {word}
                </span>
            ))}
        </p>
    );
};

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRevealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (gridRevealRef.current) {
                const words = gridRevealRef.current.querySelectorAll(".scroll-reveal-word");

                gsap.to(words, {
                    color: "#09090b",
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: gridRevealRef.current,
                        start: "top 75%",
                        end: "bottom 45%",
                        scrub: 0.5,
                    },
                });
            }

            const skewElements = gsap.utils.toArray<HTMLElement>("[data-skew-up]");
            skewElements.forEach((el) => {
                const words = el.querySelectorAll(".word");
                gsap.fromTo(
                    words,
                    { y: 40, opacity: 0, rotate: 3 },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 1,
                        stagger: 0.02,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            const lineMasks = gsap.utils.toArray<HTMLElement>(".line-mask");
            lineMasks.forEach((mask) => {
                gsap.to(mask, {
                    width: "100%",
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: mask,
                        start: "top 85%",
                    },
                });
            });

            // 4. Counter animations (Triggers on every scroll hit)
            const counters = gsap.utils.toArray<HTMLElement>(".counter");
            counters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-target") || "0", 10);
                const obj = { value: 0 };

                gsap.fromTo(
                    obj,
                    { value: 0 },
                    {
                        value: target,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 85%",
                            // onEnter, onLeave, onEnterBack, onLeaveBack
                            toggleActions: "restart none restart reset",
                        },
                        onUpdate: () => {
                            counter.innerText = Math.round(obj.value).toString();
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="px-6 md:px-12 section bg-white text-black py-24 relative w-full overflow-hidden"
        >
            <div className="mx-auto w-full relative z-10">
                <div className="mb-20 max-w-7xl mr-auto">
                    <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal leading-[1.18] tracking-tight text-zinc-950">
                        <div className="flex justify-end w-full mb-1 sm:mb-2">
                            <span className="inline-block text-right">
                                The Creatives Behind
                            </span>
                        </div>

                        <div className="block text-left">
                            Your Digital Magic (
                            <span className="mx-1 align-middle inline-block">
                                <svg
                                    className="w-[0.85em] h-[0.85em] inline-block text-zinc-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 4 3 3L6 19l-3-3L15 4Z" />
                                    <path d="m18 2 1 1-1 1-1-1 1-1Z" />
                                    <path d="m21 8 1 1-1 1-1-1 1-1Z" />
                                    <path d="m9 2 1 1-1 1-1-1 1-1Z" />
                                </svg>
                            </span>
                            ) We're not just a digital agency; we're the people who get excited about your big ideas and bring them to life.
                        </div>
                    </div>
                </div>

                <div ref={gridRevealRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    <div className="w-full h-full">
                        <img
                            src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/681338d63992d3052b1b0884_Mask%20group%20(46).webp"
                            alt="Creative agency workspace"
                            className="object-cover w-full h-full rounded-4xl"
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-8">
                        <WordRevealParagraph text="We've grown into one of the best digital agencies and leading tech agencies in the region (and honestly, beyond). Our work has been featured, awarded, and occasionally copied but never ignored." />
                        <WordRevealParagraph text="Why? Because we turn bold ideas into beautiful things that actually work. From sleek websites and sharp branding to SEO that gets attention and campaigns that convert, we bring results. We're the crew you call when you want your brand to stand out without shouting." />
                    </div>
                </div>

                <div id="scroll" className="flex flex-col gap-16">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-6 items-stretch pt-8">
                        {/* Pink Metric Card */}
                        <div className="bg-[#ff007f] text-white p-8 md:p-10 rounded-[4.5rem] min-h-[370px] flex flex-col justify-between">
                            <div className="flex items-baseline gap-1 text-6xl md:text-7xl font-normal tracking-tight">
                                <span data-target="3" className="counter">0</span>
                                <span>%</span>
                            </div>
                            <p className="text-lg md:text-1xl font-medium leading-snug max-w-[240px]">
                                lead gen spike within 3 months. Actual math, not fluff
                            </p>
                        </div>

                        {/* Middle Graphic Card */}
                        <div className="bg-black rounded-[4.5rem] min-h-[320px] overflow-hidden flex items-center justify-center p-6">
                            <img
                                src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/683864da241c2ebc6431d874_ChatGPT%20Image%20May%2028%2C%202025%2C%2003_18_27%20PM%201.webp"
                                alt="Metrics illustration"
                                className="object-contain max-h-[240px] w-auto"
                            />
                        </div>

                        {/* Light Gray Metric Card (Wider Card) */}
                        <div className="bg-[#f4f4f5] text-zinc-900 p-8 md:p-10 rounded-[4.5rem] min-h-[320px] flex flex-col justify-between">
                            <div>
                                <span className="text-zinc-900 text-lg md:text-2xl font-medium block mb-2">
                                    Zero templates.
                                </span>
                                <div className="flex items-baseline gap-1 text-6xl md:text-8xl font-normal tracking-tight text-zinc-950">
                                    <span data-target="100" className="counter">0</span>
                                    <span>%</span>
                                </div>
                            </div>
                            <p data-skew-up className="text-zinc-500 text-base md:text-2xl leading-snug">
                                <span className="word inline-block">custom-built</span>{" "}
                                <span className="word inline-block">interfaces.</span>{" "}
                                <span className="word inline-block">From</span>{" "}
                                <span className="word inline-block">brain</span>{" "}
                                <span className="word inline-block">to</span>{" "}
                                <span className="word inline-block">pixel.</span>{" "}
                                <span className="word inline-block">No</span>{" "}
                                <span className="word inline-block">cookie-clutter</span>{" "}
                                <span className="word inline-block">solutions.</span>
                            </p>
                        </div>
                    </div>

                    {/* 4X aur 95% Card Section */}
                    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 items-stretch  pt-16">
                        {/* Light Gray Card - 4X */}
                        <div className="bg-[#f4f4f5] text-zinc-950 p-8 md:p-10 rounded-[4.5rem] min-h-[350px] flex flex-col justify-between">
                            <div className="flex items-baseline gap-1 text-6xl md:text-8xl font-normal tracking-tight text-zinc-950">
                                <span data-target="4" className="counter">0</span>
                                <span>X</span>
                            </div>
                            <p data-skew-up className="text-zinc-500 text-base md:text-2xl leading-snug max-w-md">
                                <span className="word inline-block">more</span>{" "}
                                <span className="word inline-block">website</span>{" "}
                                <span className="word inline-block">engagement.</span>{" "}
                                <span className="word inline-block">Turns</span>{" "}
                                <span className="word inline-block">out,</span>{" "}
                                <span className="word inline-block">when</span>{" "}
                                <span className="word inline-block">it</span>{" "}
                                <span className="word inline-block">looks</span>{" "}
                                <span className="word inline-block">good</span>{" "}
                                <span className="word inline-block">and</span>{" "}
                                <span className="word inline-block">works,</span>{" "}
                                <span className="word inline-block">people</span>{" "}
                                <span className="word inline-block">click.</span>
                            </p>
                        </div>

                        {/* Vibrant Pink Card - 95% */}
                        <div className="bg-[#ff007f] text-white p-8 md:p-10 rounded-[4.5rem] min-h-[350px] flex flex-col justify-between">
                            <div className="flex items-baseline gap-1 text-6xl md:text-8xl font-normal tracking-tight text-white">
                                <span data-target="95" className="counter">0</span>
                                <span>%</span>
                            </div>
                            <p data-skew-up className="text-white text-base md:text-2xl leading-snug max-w-sm">
                                <span className="word inline-block">of</span>{" "}
                                <span className="word inline-block">clients</span>{" "}
                                <span className="word inline-block">stick</span>{" "}
                                <span className="word inline-block">around.</span>{" "}
                                <span className="word inline-block">If</span>{" "}
                                <span className="word inline-block">you</span>{" "}
                                <span className="word inline-block">actually</span>{" "}
                                <span className="word inline-block">bring</span>{" "}
                                <span className="word inline-block">results</span>{" "}
                                <span className="word inline-block">they</span>{" "}
                                <span className="word inline-block">come</span>{" "}
                                <span className="word inline-block">back.</span>
                            </p>
                        </div>
                    </div>


                    {/* Bottom Card Section (Image & 95% Metric) */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 items-stretch pt-16">
                        {/* Left Image Card (Narrower) */}
                        <div className="bg-black rounded-[4.5rem] min-h-[350px] overflow-hidden flex items-center justify-center p-8">
                            <img
                                src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/6838681ac2810c9de87cdc79_ChatGPT%20Image%20May%2028%2C%202025%2C%2003_20_25%20PM%201.webp"
                                alt="Quality badge illustration"
                                className="object-contain max-h-[250px] w-auto"
                            />
                        </div>

                        {/* Right Light Gray Card - 95% (Wider) */}
                        <div className="bg-[#f4f4f5] text-zinc-950 p-8 md:p-10 rounded-[4.5rem] min-h-[350px] flex flex-col justify-between">
                            <div className="flex items-baseline gap-1 text-6xl md:text-8xl font-normal tracking-tight text-zinc-950">
                                <span data-target="95" className="counter">0</span>
                                <span>%</span>
                            </div>
                            <p data-skew-up className="text-zinc-500 text-base md:text-2xl leading-snug max-w-md">
                                <span className="word inline-block">Projects</span>{" "}
                                <span className="word inline-block">where</span>{" "}
                                <span className="word inline-block">we</span>{" "}
                                <span className="word inline-block">didn't</span>{" "}
                                <span className="word inline-block">settle</span>{" "}
                                <span className="word inline-block">for</span>{" "}
                                <span className="word inline-block">'meh'.</span>{" "}
                                <span className="word inline-block">Generic</span>{" "}
                                <span className="word inline-block">=</span>{" "}
                                <span className="word inline-block">forgettable.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}