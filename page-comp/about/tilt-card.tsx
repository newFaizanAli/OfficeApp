"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TiltCard = ({
    children,
    className = "",
    max = 8,
    liftZ = 24,
    glow = "light",
}: {
    children: React.ReactNode;
    className?: string;
    max?: number;
    liftZ?: number;
    /** "light" = soft white highlight, for dark-surface cards. "dark" = soft black highlight, for white-surface cards. */
    glow?: "light" | "dark";
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const quick = useRef<{
        rx: gsap.QuickToFunc;
        ry: gsap.QuickToFunc;
        z: gsap.QuickToFunc;
        glowX: gsap.QuickToFunc;
        glowY: gsap.QuickToFunc;
    } | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        quick.current = {
            rx: gsap.quickTo(ref.current, "rotateX", { duration: 0.5, ease: "power3.out" }),
            ry: gsap.quickTo(ref.current, "rotateY", { duration: 0.5, ease: "power3.out" }),
            z: gsap.quickTo(ref.current, "z", { duration: 0.5, ease: "power3.out" }),
            glowX: gsap.quickTo(ref.current, "--mx", { duration: 0.3, ease: "power2.out" }),
            glowY: gsap.quickTo(ref.current, "--my", { duration: 0.3, ease: "power2.out" }),
        };
    }, []);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || !quick.current) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width; // 0 -> 1
        const py = (e.clientY - rect.top) / rect.height; // 0 -> 1
        quick.current.ry((px - 0.5) * max * 2);
        quick.current.rx(-(py - 0.5) * max * 2);
        quick.current.z(liftZ);
        quick.current.glowX(px * 100);
        quick.current.glowY(py * 100);
    };

    const onLeave = () => {
        if (!quick.current) return;
        quick.current.rx(0);
        quick.current.ry(0);
        quick.current.z(0);
    };

    return (
        <div className="[perspective:1200px]">
            <div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={
                    {
                        transformStyle: "preserve-3d",
                        "--mx": "50%",
                        "--my": "50%",
                    } as React.CSSProperties
                }
                className={`tilt-card group relative will-change-transform ${className}`}
            >
                {/* Cursor-following light — sits above the surface, below the content */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background:
                            glow === "light"
                                ? "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 55%)"
                                : "radial-gradient(500px circle at var(--mx) var(--my), rgba(0,0,0,0.05), transparent 55%)",
                    }}
                />
                <div className="relative" style={{ transform: "translateZ(1px)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
};


export default TiltCard;