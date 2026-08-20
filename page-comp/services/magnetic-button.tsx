"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";


const MagneticButton = ({
    children,
    className = "",
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const quick = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        quick.current = {
            x: gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" }),
            y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" }),
        };
    }, []);

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const el = ref.current;
        if (!el || !quick.current) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        quick.current.x(relX * 0.35);
        quick.current.y(relY * 0.35);
    };

    const onLeave = () => {
        quick.current?.x(0);
        quick.current?.y(0);
    };

    return (
        <button
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={onClick}
            className={`will-change-transform ${className}`}
        >
            {children}
        </button>
    );
};


export default MagneticButton