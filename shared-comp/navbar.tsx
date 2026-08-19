"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DropdownItem {
    href: string;
    label: string;
    icon: string;
}

const CDN_BASE = "https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/";

const developmentItems: DropdownItem[] = [
    { href: "/web-development-services", label: "Website Development", icon: "6800f4e5f982a67dc6af3ae1_Frame.svg" },
    { href: "/mobile-app-development-services", label: "Mobile App Development", icon: "6800f4e5a9e308d216fa5927_Frame-1.svg" },
    { href: "/ecommerce-website-development", label: "Ecommerce Development", icon: "6800f4e5e98b71a0f857ac1c_Frame-2.svg" },
    { href: "/react-native-app-development-services", label: "Product Development", icon: "6800f4e5cb46329edd34bdcd_Frame-3.svg" },
    { href: "/software-development-services", label: "Software Development", icon: "6800f4e5a3853dc3aa50594c_Frame-4.svg" },
    { href: "/software-testing-services", label: "Quality Assurance", icon: "6800f4e57417e87eed690a0e_Frame-5.svg" },
];

const designItems: DropdownItem[] = [
    { href: "/design-services", label: "Graphic Design", icon: "6800f685a7e471c3d91f374d_fi_17140573.svg" },
    { href: "/ui-ux-design-services", label: "UI/UX Design", icon: "6800f6866610ed38045c9b08_fi_11213211.svg" },
];

const marketingItems: DropdownItem[] = [
    { href: "/seo-services", label: "SEO Services", icon: "6800f6852a03208dbae79ae3_fi_281764.svg" },
    { href: "/sem-services", label: "SEM Services", icon: "6800f685a9e308d216fbd636_fi_18895639.svg" },
    { href: "/social-media-services", label: "Social Media", icon: "6800f6851806d178fd8a0003_fi_7362212.svg" },
];

export default function Navbar(): React.JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useGSAP(() => {
        if (!dropdownRef.current) return;

        if (isDropdownOpen) {
            gsap.fromTo(
                dropdownRef.current,
                { opacity: 0, y: 15, display: "none" },
                { opacity: 1, y: 0, display: "block", duration: 0.3, ease: "power2.out" }
            );
        } else {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    if (dropdownRef.current) dropdownRef.current.style.display = "none";
                },
            });
        }
    }, [isDropdownOpen]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    // Updated text color to solid black (text-black), increased size to text-xl, and bold font-semibold
    const navLinkClasses = "font-extrabold text-black hover:text-gray-900 transition-all text-xl px-5 py-2.5 rounded-full bg-transparent border border-transparent hover:border-black";

    return (
        <header id="navbar" className="ftop-0 z-50 w-full bg-white">
            <div className="max-w-8xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src={`/logo.png`}
                        alt="Buzz Logo"
                        width={240}
                        height={138}
                        className="w-auto h-18"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Menu */}
                <nav className="hidden lg:flex items-center gap-3">
                    <Link href="/about" className={navLinkClasses}>
                        About Us
                    </Link>
                    <Link href="/buzz-portfolio" className={navLinkClasses}>
                        Case Studies
                    </Link>

                    {/* Mega Menu Dropdown (Click to Open) */}
                    <div ref={containerRef} className="relative py-2">
                        <button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className={`flex items-center gap-2 font-semibold focus:outline-none text-xl px-5 py-2.5 rounded-full bg-transparent border transition-all ${isDropdownOpen ? "border-black text-black" : "border-transparent text-black hover:text-gray-900 hover:border-black"
                                }`}
                        >
                            <span>Services</span>
                            <Image
                                src={`${CDN_BASE}67fcaaf342d020c9d3768039_down.webp`}
                                alt=""
                                width={14}
                                height={14}
                                className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                            />
                        </button>

                        {/* Dropdown Content Panel */}
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-black rounded-2xl shadow-2xl border border-zinc-800 p-8 hidden mt-2"
                        >
                            <div className="grid grid-cols-4 gap-8">
                                <div className="col-span-1 space-y-4">
                                    <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Development</h4>
                                    <div className="flex flex-col gap-3">
                                        {developmentItems.map((item) => (
                                            <DropdownLink key={item.href} {...item} onSelect={() => setIsDropdownOpen(false)} />
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-1 space-y-4">
                                    <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Design</h4>
                                    <div className="flex flex-col gap-3">
                                        {designItems.map((item) => (
                                            <DropdownLink key={item.href} {...item} onSelect={() => setIsDropdownOpen(false)} />
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-6 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-sm font-semibold tracking-wider text-white uppercase">Digital Marketing</h4>
                                        <div className="flex flex-col gap-3">
                                            {marketingItems.map((item) => (
                                                <DropdownLink key={item.href} {...item} onSelect={() => setIsDropdownOpen(false)} />
                                            ))}
                                        </div>
                                    </div>

                                    <Link href="/services" onClick={() => setIsDropdownOpen(false)} className="group block pt-4 border-t border-zinc-800">
                                        <span className="text-lg font-semibold text-white block mb-1">Explore all services</span>
                                        <div className="w-full bg-white h-[2px] transition-all duration-300 group-hover:h-[5px] rounded-full" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/blog" className={navLinkClasses}>
                        Blog
                    </Link>
                    <Link href="/contact" className={navLinkClasses}>
                        Contact Us
                    </Link>
                </nav>

                {/* Right CTA Button & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="hidden sm:inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white font-semibold text-lg hover:bg-gray-800 transition-all group"
                    >
                        <div className="relative w-2 h-2 flex items-center justify-center">
                            <span className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping" />
                            <span className="relative w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        <span>Lets Work</span>
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-black focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-3 shadow-xl max-h-[85vh] overflow-y-auto">
                    <Link
                        href="/about"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/buzz-portfolio"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Case Studies
                    </Link>

                    <div className="flex flex-col">
                        <button
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                            className="flex items-center justify-between text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all focus:outline-none"
                        >
                            <span>Services</span>
                            <Image
                                src={`${CDN_BASE}67fcaaf342d020c9d3768039_down.webp`}
                                alt=""
                                width={14}
                                height={14}
                                className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : "rotate-0"}`}
                            />
                        </button>

                        {isMobileServicesOpen && (
                            <div className="pl-4 pt-3 pb-2 flex flex-col gap-6 bg-gray-50 rounded-xl mt-2 border border-gray-100">
                                <MobileServiceSection title="Development" items={developmentItems} onSelect={closeMobileMenu} />
                                <MobileServiceSection title="Design" items={designItems} onSelect={closeMobileMenu} />
                                <MobileServiceSection title="Digital Marketing" items={marketingItems} onSelect={closeMobileMenu} />

                                <Link href="/services" onClick={closeMobileMenu} className="text-base font-semibold text-black underline pt-1">
                                    Explore all services &rarr;
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/blog"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Contact Us
                    </Link>
                    <Link href="/contact" onClick={closeMobileMenu} className="mt-2 w-full py-3.5 rounded-full bg-black text-white text-center font-semibold text-lg">
                        Lets Work
                    </Link>
                </div>
            )}
        </header>
    );
}

function DropdownLink({ href, label, icon, onSelect }: DropdownItem & { onSelect: () => void }): React.JSX.Element {
    return (
        <Link href={href} onClick={onSelect} className="group inline-flex items-center gap-3 py-1.5 px-0 overflow-hidden">
            <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center p-1">
                <Image
                    src={`${CDN_BASE}${icon}`}
                    alt={label}
                    width={18}
                    height={18}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="relative overflow-hidden h-6">
                <p className="text-md font-semibold text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {label}
                </p>
                <p className="absolute top-full left-0 text-md font-semibold text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                    {label}
                </p>
            </div>
        </Link>
    );
}

function MobileServiceSection({
    title,
    items,
    onSelect,
}: {
    title: string;
    items: DropdownItem[];
    onSelect: () => void;
}) {
    return (
        <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">{title}</h4>
            <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onSelect}
                        className="text-base font-semibold text-black hover:text-gray-900 flex items-center gap-2.5"
                    >
                        <Image
                            src={`${CDN_BASE}${item.icon}`}
                            alt={item.label}
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                        />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}