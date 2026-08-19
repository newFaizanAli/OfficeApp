"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADING_LINES = [
    ["What", "We", "Do"],
    ["Creative", "ideas.", "Powerful", "experiences."],
];

const SERVICES = [
    {
        number: "01",
        title: "Product Hunting & Positioning",
        description: "We find the opportunity before the noise. Research, validation, and positioning built to solve real problems — not just look good.",
        href: "/product-positioning",
    },
    {
        number: "02",
        title: "Brand Development & Identity",
        description: "We build brands around products meant to last. Identity systems that feel intentional, not accidental.",
        href: "/design-services",
    },
    {
        number: "03",
        title: "Product Launch & Campaigning",
        description: "We don’t just launch — we create momentum. Because the market remembers strong entrances.",
        href: "/seo-services",
    },
    {
        number: "04",
        title: "Pre & Post Production (Infinity Studio)",
        description: "Everything your product needs to be seen, heard, and felt. Production without dependency. Creativity without limits.",
        href: "/mobile-app-development-services",
    },
    {
        number: "05",
        title: "Power Marketing",
        description: "Marketing built to perform — not just exist. Visibility is power — when it converts.",
        href: "/social-media-services",
    },
    {
        number: "06",
        title: "Brand Elevation & Funding",
        description: "We elevate brands — and back potential. We don’t just advise growth. We enable it.",
        href: "/software-development-services",
    },
];

export default function ServicesSection() {
    const rootRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    const cardWrapperEls = useRef<HTMLDivElement[]>([]);
    const cardTitleEls = useRef<HTMLAnchorElement[]>([]);
    const cardDescEls = useRef<HTMLParagraphElement[]>([]);

    cardWrapperEls.current = [];
    cardTitleEls.current = [];
    cardDescEls.current = [];

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // ---- Desktop: pinned + horizontal pan ----
            mm.add("(min-width: 1024px)", () => {
                const track = trackRef.current;
                const pinEl = pinRef.current;

                if (!track || !pinEl) return;

                const getMaxScroll = () =>
                    Math.max(0, track.scrollWidth - pinEl.offsetWidth);

                const st = ScrollTrigger.create({
                    trigger: rootRef.current,
                    start: "top top",
                    end: () => `+=${getMaxScroll() + window.innerHeight * 0.6}`,
                    scrub: 1,
                    pin: pinEl,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: () => `+=${getMaxScroll() + window.innerHeight * 0.6}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(
                    track,
                    {
                        x: () => -getMaxScroll(),
                        ease: "none",
                        duration: 3,
                    },
                    0.12
                );

                const cardTriggers: ScrollTrigger[] = [];

                cardWrapperEls.current.forEach((wrapper, i) => {
                    const titleEl = cardTitleEls.current[i];
                    const descEl = cardDescEls.current[i];
                    const textEls = [titleEl, descEl].filter(Boolean);

                    if (!wrapper || textEls.length === 0) return;

                    gsap.set(textEls, { opacity: 1, y: 0 });

                    const revealTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: wrapper,
                            containerAnimation: tl,
                            start: "left 95%",
                            end: "left 70%",
                            scrub: true,
                        },
                    });

                    fromToAnimation(revealTl, textEls, titleEl, descEl);

                    const hideTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: wrapper,
                            containerAnimation: tl,
                            start: "right 30%",
                            end: "right 5%",
                            scrub: true,
                        },
                    });

                    hideTl.to(textEls, {
                        opacity: 0,
                        y: -20,
                        ease: "power2.in",
                        duration: 0.5,
                        stagger: 0.03,
                    });

                    if (revealTl.scrollTrigger) cardTriggers.push(revealTl.scrollTrigger);
                    if (hideTl.scrollTrigger) cardTriggers.push(hideTl.scrollTrigger);
                });

                return () => {
                    cardTriggers.forEach((trigger) => trigger.kill());
                    st.kill();
                };
            });

            mm.add("(max-width: 1023px)", () => {
                if (trackRef.current) {
                    gsap.set(trackRef.current, { x: 0 });
                }

                cardTitleEls.current.forEach((el) => {
                    if (el) gsap.set(el, { clearProps: "opacity,transform" });
                });
                cardDescEls.current.forEach((el) => {
                    if (el) gsap.set(el, { clearProps: "opacity,transform" });
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    function fromToAnimation(
        timeline: gsap.core.Timeline,
        textEls: Element[],
        titleEl: HTMLAnchorElement | null,
        descEl: HTMLParagraphElement | null
    ) {
        gsap.set(textEls, { opacity: 0, y: 20 });
        timeline
            .to(titleEl, {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
            })
            .to(
                descEl,
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.5,
                },
                "-=0.3"
            );
    }

    return (
        <section ref={rootRef} className="relative bg-white">
            <div
                ref={pinRef}
                className="relative flex min-h-screen w-full items-center overflow-hidden lg:h-screen lg:min-h-0"
            >
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div
                        className="absolute -left-[10%] bottom-[-10%] h-[75%] w-[70%] rounded-full opacity-80 blur-[90px]"
                        style={{
                            background:
                                "radial-gradient(circle, #ff2fa8 0%, rgba(255,47,168,0.3) 50%, rgba(255,255,255,0) 80%)",
                        }}
                    />
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white via-white/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div
                    ref={trackRef}
                    className="flex w-full flex-col gap-10 px-6 py-30 will-change-transform sm:px-10 md:px-16 lg:w-max lg:gap-14 lg:px-20"
                >
                    <h2 className="max-w-none text-[clamp(2rem,4.5vw,4.2rem)] font-medium leading-[1.05] tracking-tight text-neutral-900 lg:whitespace-nowrap">
                        {HEADING_LINES.map((line, li) => (
                            <span key={li} className="block py-1">
                                {line.map((word, wi) => (
                                    <span
                                        key={wi}
                                        className="mr-[0.28em] inline-block align-top"
                                    >
                                        <span className="inline-block">
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>

                    <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-8">
                        <div className="flex flex-col gap-6 max-w-[25rem] shrink-0">
                            <p
                                ref={paragraphRef}
                                className="text-2xl leading-relaxed text-black"
                            >
                                Big ideas. Loud design. Real results. You bring the vision.
                                We&apos;ll wire it into reality.
                            </p>
                            <div>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition-colors hover:text-[#ff2fa8]"
                                >
                                    See All Services <span>→</span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:w-max lg:flex-row lg:gap-8">
                            {SERVICES.map((service) => (
                                <div
                                    key={service.title}
                                    ref={(el) => {
                                        if (el) cardWrapperEls.current.push(el);
                                    }}
                                    className="w-full shrink-0 overflow-hidden rounded-3xl border-2 border-black bg-transparent p-8 sm:w-90 lg:w-[30rem] mx-2 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-sm font-bold text-[#ff2fa8] mb-3">
                                            {service.number}
                                        </div>
                                        <Link
                                            href={service.href}
                                            ref={(el) => {
                                                if (el) cardTitleEls.current.push(el);
                                            }}
                                            className="mb-4 block text-2xl lg:text-3xl font-medium text-black"
                                        >
                                            {service.title}
                                        </Link>
                                    </div>

                                    <p
                                        ref={(el) => {
                                            if (el) cardDescEls.current.push(el);
                                        }}
                                        className="text-base text-neutral-700 leading-relaxed mt-4"
                                    >
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}