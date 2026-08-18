'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote:
            "Buzz Interactive delivered exceptional results on our complex project. Their attention to detail and understanding of our needs was impressive. We couldn't be happier with the final outcome!",
        name: 'Usman Khan',
        title: 'CEO — Aams',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a4a475aae4a9755ba15537_logo.avif',
    },
    {
        quote:
            'Hiring Buzz was a no-brainer. We stopped interviewing other agencies halfway through the call.',
        name: 'CMO',
        title: 'fast-growing SaaS startup',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a4a475aae4a9755ba15537_logo.avif',
    },
    {
        quote:
            "Working with Buzz was an absolute pleasure. They brought innovative solutions to the table and executed the project flawlessly. I'm very satisfied with how everything turned out.",
        name: 'Jamal Khan',
        title: 'Level Up Vista',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a570ff961175f5f8ca_Group%201171278092.svg',
    },
    {
        quote:
            'Within two weeks, the difference was obvious. Our site started converting, our social actually worked, and we stopped crying into analytics dashboards.',
        name: 'Head of Growth',
        title: 'eCommerce brand',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a570ff961175f5f8ca_Group%201171278092.svg',
    },
    {
        quote:
            "The team at Buzz Interactive exceeded our expectations on this challenging project. Their professionalism, expertise, and dedication ensured a smooth experience and an outstanding end result.",
        name: 'Aleem Ashraf',
        title: 'Chat Pandas',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a470893b92602c93c7_Group%201171278095.svg',
    },
    {
        quote:
            'The process was efficient, collaborative, and somehow fun. Also, their decks are terrifyingly good. Like, make-your-team-feel-bad good.',
        name: 'Brand Manager',
        title: 'enterprise fintech platform',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a470893b92602c93c7_Group%201171278095.svg',
    },
    {
        quote:
            "I'm extremely impressed with the work Buzz Interactive did for us. Despite the tight timeline and unique requirements, they delivered quality results on time and beyond what we envisioned.",
        name: 'Amna Iqbal',
        title: 'Himalayan Salt',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a5ce59f314ca21f872_Group%201171278096.svg',
    },
    {
        quote:
            "Buzz took our 'sort-of idea' and turned it into an actual brand people care about. It's wild how fast it clicked.",
        name: 'Startup Co-founder',
        title: 'pre-launch product',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a5ce59f314ca21f872_Group%201171278096.svg',
    },
    {
        quote:
            "Thank you, Buzz, for turning our vision into reality. Your team's creativity and commitment made all the difference. The final product is exactly what we were hoping for.",
        name: 'Waheed',
        title: 'Samad Group',
        avatar:
            'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/680895a54f998dd515c06790_Group%201171278097.svg',
    },
];

const AUTOPLAY_DELAY = 4500;
const SLIDE_DURATION = 0.65;

export default function Testimonial() {
    const [index, setIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const directionRef = useRef<1 | -1>(1);

    const clearAutoplay = useCallback(() => {
        if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    }, []);

    const scheduleAutoplay = useCallback(() => {
        clearAutoplay();
        autoplayTimer.current = setTimeout(() => {
            goTo(index + 1, 1);
        }, AUTOPLAY_DELAY);
    }, [index, clearAutoplay]);

    const goTo = useCallback(
        (target: number, dir: 1 | -1) => {
            if (isAnimating.current) return;
            const nextIndex = ((target % testimonials.length) + testimonials.length) % testimonials.length;
            isAnimating.current = true;
            directionRef.current = dir;

            gsap.to(contentRef.current, {
                x: -dir * 150,
                opacity: 0,
                duration: SLIDE_DURATION * 0.45,
                ease: 'power2.in',
                onComplete: () => {
                    setIndex(nextIndex);
                },
            });
        },
        []
    );

    useEffect(() => {
        const dir = directionRef.current;
        const el = contentRef.current;

        gsap.set(el, { x: dir * 150, opacity: 0 });

        const anim = gsap.to(el, {
            x: 0,
            opacity: 1,
            duration: SLIDE_DURATION,
            ease: 'power3.out',
            onComplete: () => {
                isAnimating.current = false;
                scheduleAutoplay();
            },
        });

        return () => {
            anim.kill();
        };
    }, [index]);

    useEffect(() => {
        scheduleAutoplay();
        return () => clearAutoplay();
    }, [index]);

    const handlePrev = () => {
        clearAutoplay();
        goTo(index - 1, -1);
    };

    const handleNext = () => {
        clearAutoplay();
        goTo(index + 1, 1);
    };

    const handleDot = (i: number) => {
        if (i === index) return;
        clearAutoplay();
        goTo(i, i > index ? 1 : -1);
    };

    const current = testimonials[index];

    return (
        <section className="w-full bg-white py-24 px-4 md:px-12 overflow-hidden">
            {/* Wider container width (1400px) */}
            <div className="mx-auto w-full max-w-[1400px] relative">
                <div className="relative flex flex-col items-center px-4 md:px-20">
                    {/* Prev Arrow */}
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 p-4 text-black transition hover:border-black/30 hover:bg-black/5 md:flex z-10"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 6l-6 6 6 6"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Sliding Content Container (6xl max width) */}
                    <div ref={contentRef} className="flex flex-col items-center text-center w-full max-w-6xl will-change-transform">
                        <p className="text-balance text-3xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.2] text-black tracking-tight w-full">
                            &ldquo;{current.quote}&rdquo;
                        </p>

                        <div className="mt-12 flex items-center justify-center gap-5">
                            <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full bg-neutral-100 shrink-0 flex items-center justify-center p-2 shadow-sm">
                                <img
                                    src={current.avatar}
                                    alt={current.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl md:text-3xl font-semibold text-black">{current.name}</div>
                                <div className="text-base md:text-lg text-neutral-500 mt-1">{current.title}</div>
                            </div>
                        </div>
                    </div>

                    {/* Next Arrow */}
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-black/10 p-4 text-black transition hover:border-black/30 hover:bg-black/5 md:flex z-10"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 6l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="mt-14 flex items-center justify-center gap-3">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                            aria-pressed={i === index}
                            onClick={() => handleDot(i)}
                            className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${i === index ? 'w-12 bg-[#ff00a3]' : 'w-6 bg-black/80 hover:bg-black'
                                }`}
                        />
                    ))}
                </div>

                {/* Mobile Arrows */}
                <div className="mt-10 flex items-center justify-center gap-6 md:hidden">
                    <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="flex items-center justify-center rounded-full border border-black/10 p-4 text-black transition hover:border-black/30 hover:bg-black/5"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 6l-6 6 6 6"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="flex items-center justify-center rounded-full border border-black/10 p-4 text-black transition hover:border-black/30 hover:bg-black/5"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 6l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}