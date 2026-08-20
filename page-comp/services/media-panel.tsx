"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SERVICES } from "@/data/services";



const MediaPanel = ({ index }: { index: number }) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [displayIndex, setDisplayIndex] = useState(index);
    const quick = useRef<{ rx: gsap.QuickToFunc; ry: gsap.QuickToFunc } | null>(null);

    const total = SERVICES.length;
    const prev = SERVICES[(displayIndex - 1 + total) % total];
    const next = SERVICES[(displayIndex + 1) % total];
    const active = SERVICES[displayIndex];

    /* Cursor tilt */
    useEffect(() => {
        if (!innerRef.current) return;
        quick.current = {
            rx: gsap.quickTo(innerRef.current, "rotateX", { duration: 0.6, ease: "power3.out" }),
            ry: gsap.quickTo(innerRef.current, "rotateY", { duration: 0.6, ease: "power3.out" }),
        };
    }, []);

    /* Idle float — a slow, small vertical drift so the panel never sits dead still */
    useEffect(() => {
        if (!floatRef.current) return;
        const tween = gsap.to(floatRef.current, {
            y: 10,
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
        return () => {
            tween.kill();
        };
    }, []);

    /* Flip + a slight scale/blur pulse on change, for a heavier, more physical swap */
    useEffect(() => {
        if (!innerRef.current) return;
        const tl = gsap.timeline();
        tl.to(innerRef.current, {
            rotateY: 90,
            scale: 0.92,
            filter: "blur(6px)",
            duration: 0.4,
            ease: "power2.in",
        }).call(() => setDisplayIndex(index));
        tl.fromTo(
            innerRef.current,
            { rotateY: -90, scale: 0.92, filter: "blur(6px)" },
            { rotateY: 0, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        );
        return () => {
            tl.kill();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!wrapRef.current || !quick.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        quick.current.ry((px - 0.5) * 10);
        quick.current.rx(-(py - 0.5) * 10);
    };

    const onLeave = () => {
        quick.current?.rx(0);
        quick.current?.ry(0);
    };

    return (
        <div className="[perspective:1800px] w-full h-full">
            <div ref={floatRef} className="relative w-full h-full">
                {/* Ghost cards — hint at the previous/next service, stacked behind in Z */}
                <div
                    aria-hidden="true"
                    className="absolute inset-3 rounded-[2rem] overflow-hidden bg-zinc-200"
                    style={{ transform: "translateZ(-60px) translateY(14px) scale(0.94) rotate(-2deg)", opacity: 0.5 }}
                >
                    <img src={prev.image} alt="" className="w-full h-full object-cover grayscale opacity-60" />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-3 rounded-[2rem] overflow-hidden bg-zinc-200"
                    style={{ transform: "translateZ(-30px) translateY(7px) scale(0.97) rotate(1.5deg)", opacity: 0.7 }}
                >
                    <img src={next.image} alt="" className="w-full h-full object-cover grayscale opacity-70" />
                </div>

                {/* Active card */}
                <div
                    ref={wrapRef}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                    className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-100 shadow-[0_50px_100px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
                    style={{ transformStyle: "preserve-3d" } as React.CSSProperties}
                >
                    <div
                        ref={innerRef}
                        className="absolute inset-0"
                        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" } as React.CSSProperties}
                    >
                        <img src={active.image} alt={active.title} className="w-full h-full object-cover grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/0" />

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-end justify-between gap-6 mb-4">
                                <div>
                                    <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
                                        {active.index} / {String(total).padStart(2, "0")}
                                    </span>
                                    <p className="text-white text-2xl md:text-3xl font-normal tracking-tight mt-1">
                                        {active.title}
                                    </p>
                                </div>
                            </div>

                            {/* Progress across the six services */}
                            <div className="h-px w-full bg-white/20 overflow-hidden rounded-full">
                                <div
                                    className="h-full bg-white transition-all duration-500 ease-out"
                                    style={{ width: `${((displayIndex + 1) / total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaPanel;