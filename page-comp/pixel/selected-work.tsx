"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    href: string;
    img: string;
    video: string;
}

const projects: Project[] = [
    {
        id: "closeknit",
        title: "Close-knit Hosiery",
        href: "https://closeknit-buzzinteractive.webflow.io/",
        img: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c049887df89873b73b06ce_Mask%20group%20(10).webp",
        video: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda%2F67c04d2210f06223f38ea589_Close%20Knit%201193-transcode.mp4",
    },
    {
        id: "samad",
        title: "Samad Group of Industries",
        href: "https://samadgroup-buzz.webflow.io/",
        img: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c060dbce089ee9cac242f8_Group%2016212.avif",
        video: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda%2F67c06334aeb923f7f073893a_Samad%20587-transcode.mp4",
    },
    {
        id: "dynamite",
        title: "Dynamite Gear",
        href: "https://dynamitegear-buzz.webflow.io/",
        img: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c065dac71cb71e5d284ca5_Group%2016211%20(1).webp",
        video: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda%2F67c06669469be2f65d18c1af_Dynamite%20Gear%201800%20%281%29-transcode.mp4",
    },
    {
        id: "aams",
        title: "Advanced Aerial Mapping Services",
        href: "https://aamsbuzzinteractive.webflow.io/",
        img: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c067702931411395e6c8eb_Group%2016217%20(1).webp",
        video: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda%2F67c067c17be484e2dcea5703_AAMS%20887-transcode.mp4",
    },
    {
        id: "levelup",
        title: "Level Up Vista",
        href: "https://levelupvistabuzz.webflow.io/",
        img: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/67c067af5d716428ccf67ee0_Group%2016216%20(1).avif",
        video: "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda%2F67c06842f578bdc78aa2c9b7_Vista%20893%20%281%29-transcode.mp4",
    },
];

export default function SelectedWork() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            gsap.from("[data-skew-up] .word", {
                y: "100%",
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            });
        },
        { scope: containerRef }
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        const card = e.currentTarget;
        const imgWrapper = card.querySelector(".img-wrapper");
        const video = card.querySelector("video");
        const chips = card.querySelectorAll(".chip");
        const titleWrap = card.querySelector(".title-wrap");

        if (video) {
            video.currentTime = 0;
            video.play().catch(() => { });
        }

        if (imgWrapper) {
            // Circle 0% ho jayega jisse image center mein bilkul visible nahi rahegi
            gsap.to(imgWrapper, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.7,
                ease: "power2.inOut",
            });
        }

        gsap.to(chips, {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
        });

        if (titleWrap) {
            gsap.to(titleWrap, { width: "auto", duration: 0.5, ease: "power2.out" });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        const card = e.currentTarget;
        const imgWrapper = card.querySelector(".img-wrapper");
        const video = card.querySelector("video");
        const chips = card.querySelectorAll(".chip");
        const titleWrap = card.querySelector(".title-wrap");

        if (video) {
            video.pause();
        }

        if (imgWrapper) {
            // Leave karne par wapis poori image cover ho jayegi
            gsap.to(imgWrapper, {
                clipPath: "circle(150% at 50% 50%)",
                duration: 0.7,
                ease: "power2.inOut",
            });
        }

        gsap.to(chips, {
            x: "20px",
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.in",
        });

        if (titleWrap) {
            gsap.to(titleWrap, { width: "0px", duration: 0.4, ease: "power2.in" });
        }
    };
    return (

        <section ref={containerRef} className="px-6 md:px-12 py-8 bg-white text-black relative w-full overflow-visible">
            {/* Section Header */}
            <div className="mb-16">
                <div className="w-full md:w-[70%]">
                    <h2 data-skew-up className="text-4xl md:text-6xl font-medium tracking-tight overflow-hidden flex flex-wrap gap-x-3">
                        <span className="word-line inline-block overflow-hidden">
                            <span className="word inline-block">Selected</span>
                        </span>
                        <span className="word-line inline-block overflow-hidden">
                            <span className="word inline-block">Work</span>
                        </span>
                    </h2>
                </div>
            </div>

            {/* Project Grid Layout */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-0 mx-0">
                {projects.map((project: Project, index: number) => {
                    let spanClass = "md:col-span-6";
                    if (index === 0) spanClass = "md:col-span-7";
                    if (index === 1) spanClass = "md:col-span-5";
                    if (index === 2) spanClass = "md:col-span-12";
                    if (index === 3) spanClass = "md:col-span-6";
                    if (index === 4) spanClass = "md:col-span-6";

                    return (
                        <a
                            key={project.id}
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`group relative block overflow-hidden bg-neutral-100 h-[350px] md:h-[450px] rounded-3xl ${spanClass} ${index === 2 ? "h-[400px] md:h-[550px]" : ""
                                }`}
                        >
                            {/* Video Layer (Revealed through the circle cutout) */}
                            <div className="absolute inset-0 w-full h-full">
                                <video
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                    className="w-full h-full object-cover"
                                >
                                    <source src={project.video} type="video/mp4" />
                                </video>
                            </div>

                            {/* Image Wrapper with Clip Path initialized to full coverage */}
                            <div
                                className="img-wrapper absolute inset-0 w-full h-full z-10"
                                style={{ clipPath: "circle(150% at 50% 50%)" }}
                            >
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
                                {/* Top Chips */}
                                <div className="flex flex-wrap gap-2">
                                    {["Website", "UI/UX", "Motion Graphics"].map((tag: string, tagIdx: number) => (
                                        <div
                                            key={tagIdx}
                                            className="chip translate-x-[20px] opacity-0 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-black shadow-sm"
                                        >
                                            <p>{tag}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Title */}
                                <div className="flex items-center">
                                    <div className="title-wrap overflow-hidden whitespace-nowrap w-0 bg-black/80 backdrop-blur-md px-0 py-2 rounded-lg text-white">
                                        <div className="text-sm md:text-base font-medium px-4">{project.title}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}