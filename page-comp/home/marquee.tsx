'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface MarqueeItem {
    name: string;
    img: string;
}

const items: MarqueeItem[] = [
    {
        name: 'KFC',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a4590d37d8e483e7efa7d2_Group%201.svg',
    },
    {
        name: 'Kiko Milano',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a4590d9c2c6fea9a8d9687_Group%201171277368.svg',
    },
    {
        name: 'Samad Group of Industries',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a4590dda8a8731512717e3_Group.svg',
    },
    {
        name: 'Dominos',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/683860726aa71c003e4b55f0_Group%201171278730.svg',
    },
    {
        name: 'Descon Engineering',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c03e386a02d0f0cc42ce57_Descon_logo%201%20%281%29.svg',
    },
    {
        name: 'Samsung',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67a458f002189a2094f7ffb0_g20.svg',
    },
    {
        name: 'Daily Deli',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/683860728ca6d9755bd6e199_DD%201.svg',
    },
    {
        name: 'Chat Pandas',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/6838607259689358e61f33e3_Group%20%286%29.svg',
    },
    {
        name: 'Lake City',
        img: 'https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68386072f416ce8217d6a9f6_Group%201171278731.svg',
    },
];

export default function Marquee(): React.JSX.Element {
    const marqueeRef = useRef<HTMLDivElement | null>(null);

    const HOVER_LOGO_SIZE = {
        width: 340,
        height: 140,
    };

    const MARQUEE_SECTION_HEIGHT = '400px';

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;

        const innerWrap = el.querySelector(
            '.marquee-inner-wrap'
        ) as HTMLDivElement | null;

        if (!innerWrap) return;

        const width = innerWrap.getBoundingClientRect().width;

        const tween = gsap.to(el, {
            x: `-=${width}`,
            duration: 25,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(
                    (x: number) => parseFloat(String(x)) % width
                ),
            },
        });

        return () => {
            tween.kill();
        };
    }, []);

    const renderItemsList = () => (
        <div className="marquee-inner-wrap flex items-center shrink-0">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="group/item flex items-center cursor-pointer"
                >
                    {/* LEFT DOT (Always visible as a small neutral/grayish dot, turns green and pulses on hover) */}
                    <div className="mx-8 flex items-center justify-center">
                        <span className="relative flex w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover/item:opacity-75 transition-opacity duration-200" />
                            <span className="relative inline-flex rounded-full w-2 h-2 bg-gray-300 group-hover/item:bg-green-500 transition-colors duration-200" />
                        </span>
                    </div>

                    {/* COMPANY */}
                    <div
                        className="
                            w-[280px] md:w-[360px]
                            h-20
                            flex items-center justify-center
                            shrink-0
                            relative
                            overflow-visible
                        "
                    >
                        {/* COMPANY NAME */}
                        <p
                            className="
                                absolute
                                text-lg md:text-2xl
                                tracking-tight
                                text-gray-400
                                group-hover/item:opacity-0
                                transition-opacity
                                duration-300
                            "
                        >
                            {item.name}
                        </p>

                        {/* LARGE COMPANY IMAGE */}
                        <div
                            className="
                                absolute
                                z-20
                                opacity-0
                                scale-75
                                group-hover/item:opacity-100
                                group-hover/item:scale-100
                                transition-all
                                duration-500
                                ease-out
                                flex
                                items-center
                                justify-center
                                pointer-events-none
                                drop-shadow-[0_0_25px_rgba(34,197,94,0.45)]
                            "
                            style={{
                                width: `${HOVER_LOGO_SIZE.width}px`,
                                height: `${HOVER_LOGO_SIZE.height}px`,
                            }}
                        >
                            <Image
                                src={item.img}
                                alt={item.name}
                                width={HOVER_LOGO_SIZE.width}
                                height={HOVER_LOGO_SIZE.height}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* RIGHT DOT (Always visible as a small neutral/grayish dot, turns green and pulses on hover) */}
                    <div className="mx-8 flex items-center justify-center">
                        <span className="relative flex w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover/item:opacity-75 transition-opacity duration-200" />
                            <span className="relative inline-flex rounded-full w-2 h-2 bg-gray-300 group-hover/item:bg-green-500 transition-colors duration-200" />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section
            className="overflow-hidden bg-white flex items-center"
            style={{ height: MARQUEE_SECTION_HEIGHT }}
        >
            <div className="w-full overflow-visible">
                <div
                    ref={marqueeRef}
                    className="flex w-fit whitespace-nowrap will-change-transform overflow-visible"
                >
                    {renderItemsList()}
                    {renderItemsList()}
                </div>
            </div>
        </section>
    );
}