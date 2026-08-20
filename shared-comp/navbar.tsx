"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar(): React.JSX.Element {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinkClasses = "font-extralight text-black hover:text-gray-900 transition-all text-xl px-5 py-2.5 rounded-full bg-transparent border border-transparent hover:border-black";

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
                    <Link
                        href="/services"
                        className={navLinkClasses}
                    >
                        Services
                    </Link>
                    <Link
                        href="/process"
                        className={navLinkClasses}
                    >
                        Process
                    </Link>
                    <Link href="/buzz-portfolio" className={navLinkClasses}>
                        Case Studies
                    </Link>
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
                        href="/services"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Services
                    </Link>
                    <Link
                        href="/process"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Process
                    </Link>
                    <Link
                        href="/buzz-portfolio"
                        onClick={closeMobileMenu}
                        className="text-xl font-semibold text-black hover:text-gray-900 px-4 py-2.5 rounded-lg bg-transparent border border-transparent hover:border-black transition-all"
                    >
                        Case Studies
                    </Link>
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