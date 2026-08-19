"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TICKER_WORDS_DESKTOP = [
    "Future",
    "Tomorrow",
    "Next-Gen",
    "Scale",
];

const TICKER_WORDS_MOBILE = [
    "Future",
    "Tomorrow",
    "Next-Gen",
    "Scale",
];

const VIDEO_SRC =
    "https://buzz-interactive.b-cdn.net/Buzz%20Interactive%20Showreel%20(1).mp4";

const START_CLIP_PATH = "polygon(20% 1%, 88% 40%, 99% 99%, 0% 74%)";
const END_CLIP_PATH = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const START_WIDTH = "60%";
const START_HEIGHT = 320;
const TRACK_HEIGHT_VH = 220;

/* ------------------------------------------------------------------ */
/*  Vertical "slot machine" ticker                                   */
/* ------------------------------------------------------------------ */

function Ticker({
    words,
    textClassName,
    wrapperClassName,
}: {
    words: string[];
    textClassName: string;
    wrapperClassName?: string;
}) {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        const items = Array.from(inner.children) as HTMLElement[];
        if (!items.length) return;

        let tl: gsap.core.Timeline;

        const build = () => {
            tl?.kill();

            const itemHeight = items[0].offsetHeight;
            outer.style.height = `${itemHeight}px`;
            gsap.set(inner, { y: 0 });

            tl = gsap.timeline({ repeat: -1, delay: 1.2 });

            items.forEach((_, i) => {
                if (i === items.length - 1) return;
                tl.to(inner, {
                    y: -(itemHeight * (i + 1)),
                    duration: 0.9,
                    ease: "power3.inOut",
                }).to({}, { duration: 1.3 });
            });

            tl.set(inner, { y: 0 });
        };

        build();
        const onResize = () => build();
        window.addEventListener("resize", onResize);

        return () => {
            tl?.kill();
            window.removeEventListener("resize", onResize);
        };
    }, [words]);

    return (
        <div ref={outerRef} className={`overflow-hidden inline-block align-bottom ${wrapperClassName || ""}`}>
            <div ref={innerRef} className="flex flex-col">
                {[...words, words[0]].map((word, i) => (
                    <div
                        key={`${word}-${i}`}
                        className={`${textClassName} font-normal tracking-tight leading-[1.05] py-1 whitespace-nowrap`}
                    >
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AgencyHeroPage() {
    const trackRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const track = trackRef.current;
        const videoEl = videoWrapperRef.current;
        if (!track || !videoEl) return;

        const ctx = gsap.context(() => {
            gsap.to(videoEl, {
                width: "100%",
                height: "100vh",
                clipPath: END_CLIP_PATH,
                ease: "none",
                scrollTrigger: {
                    trigger: track,
                    start: "top 60%",
                    end: "bottom bottom",
                    scrub: true,
                },
            });
        }, track);

        return () => ctx.revert();
    }, []);

    const toggleAudio = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    };

    return (
        <main className="w-full bg-white text-black selection:bg-black selection:text-white">
            <section className="relative w-full pt-10 md:pt-12">
                <div className="w-full px-4 md:px-8 pb-10">
                    <h1 className="font-extralight tracking-tight text-4xl md:text-6xl lg:text-7xl pt-16 leading-[1.05]">
                        <span className="inline-block">Shaping the </span>{" "}
                        <span className="inline-block">Brands of </span>{" "}

                        <Ticker
                            words={TICKER_WORDS_DESKTOP}
                            textClassName="text-4xl md:text-6xl lg:text-7xl"
                            wrapperClassName="hidden md:inline-block"
                        />
                        <Ticker
                            words={TICKER_WORDS_MOBILE}
                            textClassName="text-4xl"
                            wrapperClassName="block md:hidden mt-2"
                        />
                    </h1>

                    <p className="mt-5 max-w-xl text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
                        We turn ideas into products, products into brands, and brands into systems built to scale.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                            href="#contact"
                            className="rounded-full bg-black px-5 py-3 text-xs md:text-sm font-medium text-white transition-opacity hover:opacity-80"
                        >
                            Let’s Build Together
                        </a>
                        <a
                            href="#work"
                            className="rounded-full border border-black/20 px-5 py-3 text-xs md:text-sm font-medium text-black transition-colors hover:border-black"
                        >
                            Explore Our Work
                        </a>
                    </div>
                </div>

                <div ref={trackRef} className="relative -mt-16 md:-mt-20" style={{ height: `${TRACK_HEIGHT_VH}vh` }}>
                    <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
                        <div
                            ref={videoWrapperRef}
                            style={{
                                clipPath: START_CLIP_PATH,
                                width: START_WIDTH,
                                height: START_HEIGHT,
                                willChange: "clip-path, width, height",
                            }}
                            className="relative overflow-hidden bg-black shadow-2xl"
                        >
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                className="h-full w-full object-cover"
                            >
                                <source src={VIDEO_SRC} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <button
                                onClick={toggleAudio}
                                aria-label={muted ? "Unmute video" : "Mute video"}
                                className="absolute bottom-6 right-6 z-35 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
                            >
                                {muted ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}