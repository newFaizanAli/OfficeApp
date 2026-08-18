'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Cursor() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorWhiteRef = useRef<HTMLDivElement>(null);
    const linkIconRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // smooth follow, mirrors the translate3d tracking on .cursor-wrapper
        const xTo = gsap.quickTo(wrapper, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(wrapper, 'y', { duration: 0.45, ease: 'power3' });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);

        // hover state on any link/button -> shrink dot, pop icon in
        const interactiveEls = document.querySelectorAll<HTMLElement>(
            'a, button, [data-cursor="link"]'
        );

        const handleEnter = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            const useWhite = target.closest('[data-cursor-theme="dark"]');

            gsap.to(cursorRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.25,
                ease: 'power2.out',
            });
            if (useWhite) {
                gsap.to(cursorWhiteRef.current, { opacity: 1, duration: 0.25 });
            }
            gsap.to(linkIconRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.25,
                ease: 'back.out(1.7)',
            });
        };

        const handleLeave = () => {
            gsap.to(cursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
            });
            gsap.to(cursorWhiteRef.current, { opacity: 0, duration: 0.25 });
            gsap.to(linkIconRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            });
        };

        interactiveEls.forEach((el) => {
            el.addEventListener('mouseenter', handleEnter);
            el.addEventListener('mouseleave', handleLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveEls.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter);
                el.removeEventListener('mouseleave', handleLeave);
            });
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
            {/* default dark dot */}
            <div
                ref={cursorRef}
                className="h-6 w-6 scale-100 rounded-full bg-black opacity-100 transition-none"
            />

            {/* white variant, toggled over dark sections */}
            <div
                ref={cursorWhiteRef}
                className="absolute left-0 top-0 h-6 w-6 rounded-full bg-white opacity-0"
            />

            {/* link icon, scaled up on hover */}
            <Image
                ref={linkIconRef}
                src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a357657dfbded9b0b9da84_Group%2016180.svg"
                alt=""
                width={24}
                height={24}
                className="absolute left-0 top-0 h-6 w-6 scale-0 opacity-0"
            />
        </div>
    );
}