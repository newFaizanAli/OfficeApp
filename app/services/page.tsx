"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   NOTE ON USAGE
   This file is a full page (hero → capabilities → CTA), meant to be
   dropped in as app/services/page.tsx. Because it's a client
   component (animations, three.js, state), it can't export
   `metadata` directly — if you need SEO metadata for this route,
   add a small server-side layout.tsx alongside it with
   `export const metadata = {...}` and render this component as
   the child.
   ================================================================ */

/* ================================================================
   DATA
   `image` is a placeholder — swap for real photography/video stills.
   ================================================================ */
type Service = {
    index: string;
    title: string;
    tagline: string;
    bullets: string[];
    closing: string;
    image: string;
};

const SERVICES: Service[] = [
    {
        index: "01",
        title: "Product Hunting & Positioning",
        tagline: "We find the opportunity before the noise.",
        bullets: [
            "Product research & validation",
            "Market gaps & trend hunting",
            "Competitive analysis",
            "Product-market fit strategy",
            "Clear positioning & differentiation",
        ],
        closing: "Built to solve real problems — not just look good.",
        image: "https://picsum.photos/seed/service-01/1200/1400",
    },
    {
        index: "02",
        title: "Brand Development & Identity",
        tagline: "We build brands around products meant to last.",
        bullets: [
            "Product-centric brand identity",
            "Naming, messaging & brand voice",
            "Visual identity systems",
            "Packaging & product design direction",
            "Scalable brand guidelines",
        ],
        closing: "Brands that feel intentional, not accidental.",
        image: "https://picsum.photos/seed/service-02/1200/1400",
    },
    {
        index: "03",
        title: "Product Launch & Campaigning",
        tagline: "We don't just launch — we create momentum.",
        bullets: [
            "Go-to-market strategy",
            "Launch campaigns & storytelling",
            "Influencer & creator activations",
            "Digital launch rollouts",
            "Post-launch growth campaigns",
        ],
        closing: "Because the market remembers strong entrances.",
        image: "https://picsum.photos/seed/service-03/1200/1400",
    },
    {
        index: "04",
        title: "Pre & Post Production",
        tagline: "Everything your product needs to be seen, heard, and felt.",
        bullets: [
            "Product photography & videography",
            "Commercials, reels & ad creatives",
            "Founder & brand films",
            "Editing, motion & post-production",
            "In-house Infinity Studio access",
        ],
        closing: "Production without dependency. Creativity without limits.",
        image: "https://picsum.photos/seed/service-04/1200/1400",
    },
    {
        index: "05",
        title: "Power Marketing",
        tagline: "Marketing built to perform — not just exist.",
        bullets: [
            "Performance marketing & paid ads",
            "Product-focused content systems",
            "Social media growth strategies",
            "Funnels, conversions & optimization",
            "Data-driven scaling",
        ],
        closing: "Visibility is power — when it converts.",
        image: "https://picsum.photos/seed/service-05/1200/1400",
    },
    {
        index: "06",
        title: "Brand Elevation & Funding",
        tagline: "We elevate brands — and back potential.",
        bullets: [
            "Founder & business coaching",
            "Brand maturity & scale planning",
            "Pitch decks & investor storytelling",
            "Strategic partnerships & mentorship",
            "Selective startup funding & support",
        ],
        closing: "We don't just advise growth. We enable it.",
        image: "https://picsum.photos/seed/service-06/1200/1400",
    },
];

const STUDIO_NOTE = "Infinity Studio";

/* ================================================================
   Small shared pieces
   ================================================================ */
const WordRevealParagraph = ({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) => {
    const words = text.split(" ");
    return (
        <p className={`scroll-reveal-block leading-relaxed font-normal ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="scroll-reveal-word text-zinc-300 inline-block mr-[0.25em]">
                    {word}
                </span>
            ))}
        </p>
    );
};

/* Magnetic button — the surface tracks the cursor within its bounds,
   used for the page's primary calls to action. */
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

/* ================================================================
   Hero — a core wireframe with six orbiting nodes, one per
   capability. Rotation responds to mouse + scroll.
   ================================================================ */
const HeroMesh = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        /* Core */
        const coreGeo = new THREE.IcosahedronGeometry(1.9, 1);
        const coreWire = new THREE.WireframeGeometry(coreGeo);
        const coreMat = new THREE.LineBasicMaterial({ color: 0x09090b, transparent: true, opacity: 0.16 });
        const core = new THREE.LineSegments(coreWire, coreMat);
        group.add(core);

        /* Six orbiting nodes — one per capability */
        const orbitGroup = new THREE.Group();
        group.add(orbitGroup);
        const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x09090b, transparent: true, opacity: 0.55 });
        const ringGeo = new THREE.RingGeometry(3.05, 3.06, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x09090b,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.4;
        group.add(ring);

        const NODE_COUNT = 6;
        const nodes: THREE.Mesh[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const angle = (i / NODE_COUNT) * Math.PI * 2;
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            node.position.set(Math.cos(angle) * 3.05, 0, Math.sin(angle) * 3.05);
            orbitGroup.add(node);
            nodes.push(node);
        }
        orbitGroup.rotation.x = Math.PI / 2.4;

        let mouseX = 0;
        let mouseY = 0;
        let scrollProgress = 0;
        let frameId = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove);

        const trigger = ScrollTrigger.create({
            trigger: mount,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                scrollProgress = self.progress;
            },
        });

        let t = 0;
        const animate = () => {
            t += 0.0035;
            group.rotation.y += (mouseX * 0.5 - group.rotation.y * 0.02 + 0.0015);
            group.rotation.x += (mouseY * 0.2 - group.rotation.x) * 0.02;
            core.rotation.y = t * 0.6;
            core.rotation.x = t * 0.3;
            orbitGroup.rotation.y = t * 1.4;
            group.position.y = scrollProgress * -1.2;
            group.scale.setScalar(1 - scrollProgress * 0.15);
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            trigger.kill();
            coreGeo.dispose();
            coreWire.dispose();
            coreMat.dispose();
            nodeGeo.dispose();
            nodeMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
        />
    );
};

/* ================================================================
   Media panel — a layered 3D card stack (ghost cards behind the
   active image hint at neighbours), flips to the active service on
   change, idles with a slow float, and tilts toward the cursor.
   Height is viewport-relative rather than a fixed pixel value, so
   it stays proportionate no matter how long the open row's copy is.
   ================================================================ */
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

/* ================================================================
   PAGE
   ================================================================ */
export default function ServicesPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    /* Hero entrance, on load rather than on scroll */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = heroRef.current?.querySelectorAll(".hero-word");
            if (words && words.length) {
                gsap.fromTo(
                    words,
                    { y: 60, opacity: 0, rotateX: -70, transformOrigin: "50% 100%" },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1.1,
                        stagger: 0.02,
                        ease: "power3.out",
                        delay: 0.15,
                    }
                );
            }
            gsap.fromTo(
                ".hero-sub, .hero-eyebrow, .scroll-cue",
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.08, delay: 0.5 }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    /* Capabilities section scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealBlocks = gsap.utils.toArray<HTMLElement>(".scroll-reveal-block");
            revealBlocks.forEach((block) => {
                const words = block.querySelectorAll(".scroll-reveal-word");
                gsap.to(words, {
                    color: "#09090b",
                    stagger: 0.06,
                    ease: "none",
                    scrollTrigger: { trigger: block, start: "top 80%", end: "bottom 55%", scrub: 0.5 },
                });
            });

            const lineMasks = gsap.utils.toArray<HTMLElement>(".line-mask");
            lineMasks.forEach((mask) => {
                gsap.to(mask, {
                    width: "100%",
                    duration: 1.1,
                    ease: "power2.inOut",
                    scrollTrigger: { trigger: mask, start: "top 90%" },
                });
            });

            const rows = gsap.utils.toArray<HTMLElement>(".service-row");
            rows.forEach((row) => {
                gsap.fromTo(
                    row,
                    { y: 50, opacity: 0, rotateX: -8, transformPerspective: 1000 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: { trigger: row, start: "top 92%" },
                    }
                );
            });
        }, capabilitiesRef);
        return () => ctx.revert();
    }, []);

    /* CTA entrance */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, rotateX: 30, transformPerspective: 1400, transformOrigin: "50% 100%" },
                {
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ctaRef.current, start: "top 82%" },
                }
            );
        }, ctaRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!capabilitiesRef.current) return;
        const activeBullets = capabilitiesRef.current.querySelectorAll(
            `.service-row[data-index="${activeIndex}"] .bullet-chip`
        );
        gsap.fromTo(
            activeBullets,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out", delay: 0.15 }
        );
    }, [activeIndex]);

    const railRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!railRef.current) return;
        gsap.to(railRef.current, {
            top: `${(activeIndex / (SERVICES.length - 1)) * 100}%`,
            duration: 0.5,
            ease: "power3.out",
        });
    }, [activeIndex]);

    const heroWords = (text: string) =>
        text.split(" ").map((w, i) => (
            <span key={i} className="hero-word inline-block mr-[0.22em]">
                {w}
            </span>
        ));

    return (
        <main className="bg-white text-black [perspective:1600px]">
            {/* ================= HERO ================= */}
            <div ref={heroRef} className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden px-6 md:px-12 py-24">
                <div className="absolute inset-0 -z-0">
                    <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[110%] md:w-[70%] aspect-square">
                        <HeroMesh />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl relative z-10">


                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[1.08] tracking-tight text-zinc-950 max-w-4xl [transform-style:preserve-3d]">
                        {heroWords("We build brands by thinking beyond visuals and campaigns.")}
                    </h1>

                    <p className="hero-sub text-lg md:text-2xl text-zinc-500 leading-relaxed max-w-xl mt-8">
                        Six capabilities. One integrated system. Every service designed to move
                        your brand from idea to market leadership.
                    </p>
                </div>

                <div className="scroll-cue absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-zinc-400">
                    <span className="w-8 h-px bg-zinc-300" />
                    Scroll
                </div>
            </div>

            {/* ================= CAPABILITIES ================= */}
            <section ref={capabilitiesRef} className="section relative w-full overflow-hidden bg-white text-black px-6 md:px-12 py-24 md:py-32">
                <div className="mx-auto w-full max-w-7xl relative z-10">
                    <div className="flex items-center gap-4 mb-16 md:mb-20">
                        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium whitespace-nowrap">
                            The Capabilities
                        </span>
                        <span className="line-mask h-px bg-zinc-300 w-0 flex-1 block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
                        <div className="relative">
                            <div className="hidden md:block absolute left-0 top-2 bottom-2 w-px bg-zinc-200">
                                <div ref={railRef} className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-950" style={{ top: 0 }} />
                            </div>

                            <div className="md:pl-10 flex flex-col">
                                {SERVICES.map((service, i) => {
                                    const isActive = activeIndex === i;
                                    return (
                                        <div key={service.index} data-index={i} className="service-row border-b border-zinc-200 first:border-t">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIndex(i)}
                                                className="w-full flex items-start gap-4 md:gap-6 py-6 md:py-8 text-left group"
                                                aria-expanded={isActive}
                                            >
                                                <span
                                                    className={`text-lg md:text-xl font-normal tracking-tight tabular-nums transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-300 group-hover:text-zinc-500"
                                                        }`}
                                                >
                                                    {service.index}
                                                </span>

                                                <div className="flex-1">
                                                    <h3
                                                        className={`text-xl sm:text-2xl md:text-3xl font-normal tracking-tight transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                                                            }`}
                                                    >
                                                        {service.title}
                                                        {service.index === "04" && (
                                                            <span className="ml-3 align-middle text-xs md:text-sm tracking-[0.15em] uppercase text-zinc-400">
                                                                {STUDIO_NOTE}
                                                            </span>
                                                        )}
                                                    </h3>

                                                    <div
                                                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                                                        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                                                    >
                                                        <div className="overflow-hidden">
                                                            <p className="text-zinc-500 text-base md:text-lg mt-3 mb-5 max-w-md">
                                                                {service.tagline}
                                                            </p>

                                                            <ul className="flex flex-wrap gap-2 mb-5">
                                                                {service.bullets.map((b) => (
                                                                    <li
                                                                        key={b}
                                                                        className="bullet-chip text-sm md:text-base text-zinc-700 border border-zinc-200 rounded-full px-4 py-1.5"
                                                                    >
                                                                        {b}
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            <p className="font-serif italic text-zinc-950 text-lg md:text-xl pb-6">
                                                                {service.closing}
                                                            </p>

                                                            <div className="lg:hidden h-80 sm:h-96 mb-6">
                                                                <MediaPanel index={i} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? "border-zinc-950 bg-zinc-950 text-white rotate-45"
                                                        : "border-zinc-300 text-zinc-400 group-hover:border-zinc-500"
                                                        }`}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden lg:block self-start sticky top-28">
                            <div className="h-[min(74vh,760px)] min-h-[560px]">
                                <MediaPanel index={activeIndex} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CLOSING CTA ================= */}
            <section className="relative w-full px-6 md:px-12 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-7xl">
                    <div
                        ref={ctaRef}
                        className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] px-8 md:px-20 py-20 md:py-28 overflow-hidden text-center"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-16 right-4 md:right-10 text-[220px] md:text-[320px] leading-none font-serif italic text-white/[0.04] select-none pointer-events-none"
                        >
                            "
                        </span>

                        <p className="relative z-10 text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 mb-6">
                            Let's build the system around it
                        </p>
                        <h2 className="relative z-10 font-normal text-white text-3xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight max-w-3xl mx-auto">
                            One integrated team. Six capabilities. Zero guesswork.
                        </h2>

                        <MagneticButton
                            className="relative z-10 mt-12 inline-flex items-center gap-3 bg-white text-zinc-950 rounded-full px-8 py-4 text-base md:text-lg font-normal"
                            onClick={() => {
                                /* wire to your contact route / form */
                            }}
                        >
                            Start a project
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </MagneticButton>
                    </div>
                </div>
            </section>
        </main>
    );
}