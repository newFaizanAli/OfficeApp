"use client";

/**
 * ServicesSection
 * Recreation of the "Our Services" pinned / horizontal-pan section from
 * https://www.buzzinteractive.co/
 */

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADING_LINES = [
    ["We're", "a", "digital", "&", "tech", "agency"],
    ["making", "brands", "people", "remember"],
];

const SERVICES = [
    {
        title: "Designing",
        href: "/design-services",
        items: [
            { label: "Branding", href: "/design-services" },
            { label: "Logo", href: "/design-services" },
            { label: "Print Design", href: "/design-services" },
            { label: "Motion Graphics", href: "/design-services" },
            { label: "UI/UX", href: "/ui-ux-design-services" },
        ],
    },
    {
        title: "CMS Websites",
        href: "/cms-development-services",
        items: [
            { label: "Webflow", href: "/cms-development-services" },
            { label: "Framer", href: "/cms-development-services" },
            { label: "Wordpress", href: "/wordpress-development-services" },
            { label: "Shopify", href: "/shopify-development-services" },
            { label: "Ecommerce Solutions", href: "/ecommerce-website-development" },
        ],
    },
    {
        title: "Product Development",
        href: "/web-development-services",
        items: [
            { label: "Web Apps", href: "/web-development-services" },
            { label: "React Native Development", href: "/react-native-app-development-services" },
            { label: "PHP Development", href: "/php-development-services" },
            { label: "MERN Stack Development", href: "/software-development-services" },
            { label: "QA Solutions", href: "/software-testing-services" },
        ],
    },
    {
        title: "Mobile Apps",
        href: "/mobile-app-development-services",
        items: [
            { label: "Mobile Apps", href: "/mobile-app-development-services" },
            { label: "IOS Mobile Apps", href: "/ios-app-development-services" },
            { label: "Android Mobile Apps", href: "/android-app-development-services" },
            { label: "React Native Mobile Apps", href: "/react-native-app-development-services" },
            { label: "Mobile APP ASO", href: "/mobile-app-development-services" },
        ],
    },
    {
        title: "Marketing",
        href: "/seo-services",
        items: [
            { label: "SEO", href: "/seo-services" },
            { label: "SEM", href: "/sem-services" },
            { label: "Social Media Marketing", href: "/social-media-services" },
            { label: "PPC Marketing", href: "/social-media-services" },
            { label: "On-Page Optimization", href: "/social-media-services" },
        ],
    },
];

export default function ServicesSection() {
    const rootRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    const cardWrapperEls = useRef<HTMLDivElement[]>([]);
    const cardTitleEls = useRef<HTMLAnchorElement[]>([]);
    const cardItemsEls = useRef<HTMLDivElement[]>([]);

    cardWrapperEls.current = [];
    cardTitleEls.current = [];
    cardItemsEls.current = [];

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
                    const itemsEl = cardItemsEls.current[i];
                    const itemLinks = itemsEl ? Array.from(itemsEl.children) : [];
                    const textEls = [titleEl, ...itemLinks].filter(Boolean);

                    if (!wrapper || textEls.length === 0) return;

                    // Initial state visible rakhein ya gsap set ke mutabiq handle karein
                    gsap.set(textEls, { opacity: 1, y: 0 });

                    // Reveal as card enters screen completely
                    const revealTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: wrapper,
                            containerAnimation: tl,
                            start: "left 95%",
                            end: "left 70%",
                            scrub: true,
                        },
                    });

                    fromToAnimation(revealTl, textEls, titleEl, itemLinks);

                    // Hide only when card starts leaving the screen completely
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
                cardItemsEls.current.forEach((itemsEl) => {
                    if (itemsEl) {
                        gsap.set(Array.from(itemsEl.children), {
                            clearProps: "opacity,transform",
                        });
                    }
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    function fromToAnimation(timeline: gsap.core.Timeline, textEls: Element[], titleEl: HTMLAnchorElement | null, itemLinks: Element[]) {
        gsap.set(textEls, { opacity: 0, y: 20 });
        timeline
            .to(titleEl, {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
            })
            .to(
                itemLinks,
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.5,
                    stagger: 0.04,
                },
                "-=0.3"
            );
    }

    return (
        // services
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

                    {/* Add a bottom fade gradient to seamlessly blend the pink into the next section */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div
                    ref={trackRef}
                    className="flex w-full flex-col gap-10 px-6 py-24 will-change-transform sm:px-10 md:px-16 lg:w-max lg:gap-14 lg:px-20"
                >
                    <h2 className="max-w-none text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[1.05] tracking-tight text-neutral-900 lg:whitespace-nowrap">
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
                        <p
                            ref={paragraphRef}
                            className="max-w-[25rem] shrink-0 text-3xl leading-relaxed text-black"
                        >
                            Big ideas. Loud design. Real results. You bring the vision.
                            We&apos;ll wire it into reality.
                        </p>

                        <div className="flex w-full flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:w-max lg:flex-row lg:gap-8">
                            {SERVICES.map((service) => (
                                <div
                                    key={service.title}
                                    ref={(el) => {
                                        if (el) cardWrapperEls.current.push(el);
                                    }}
                                    className="w-full shrink-0 overflow-hidden rounded-3xl border-2 border-black bg-transparent p-12 sm:w-96 lg:w-[35rem]  mx-2"
                                >
                                    <Link
                                        href={service.href}
                                        ref={(el) => {
                                            if (el) cardTitleEls.current.push(el);
                                        }}
                                        className="mb-6 block text-4xl font-medium text-black"
                                    >
                                        {service.title}
                                    </Link>

                                    <div
                                        ref={(el) => {
                                            if (el) cardItemsEls.current.push(el);
                                        }}
                                        className="flex flex-col gap-5"
                                    >
                                        {service.items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="group flex items-center gap-3 text-2xl text-neutral-900 font-medium transition-colors hover:text-neutral-900"
                                            >
                                                <span className="h-0.5 w-0 bg-[#ff2fa8] transition-all duration-300 group-hover:w-5" />
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}