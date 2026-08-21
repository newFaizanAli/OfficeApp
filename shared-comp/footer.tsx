'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ContactForm from './contact-form';

export default function Footer() {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section
            id={isContactPage ? 'site-footer' : 'contact'}
            className="relative w-full bg-black text-white py-20 px-4 md:px-8 lg:px-12 overflow-hidden font-sans rounded-t-[80px] md:rounded-t-[180px]"
        >
            <div className="max-w-[1600px] mx-auto space-y-16 w-full">
                {/* Only show the contact form here when we're NOT already on the Contact page */}
                {!isContactPage && <ContactForm variant="dark" className="pt-24" />}

                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-base md:text-lg ${isContactPage ? '' : 'pt-16 border-t border-zinc-800'
                        }`}
                >
                    {/* Brand & Logo Column */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="flex items-center gap-3">
                            {/* Random logo image placeholder, update src later */}
                            {/* <div className="relative w-10 h-10 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Palette & Pixel Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div> */}
                            <span className="font-bold text-lg tracking-tight text-white">Palette & Pixel</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Shaping the brands of future.
                        </p>
                        <p className="text-zinc-500 text-xs italic">
                            Built with a palette of intention. Delivered pixel by pixel.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-sm md:text-base font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                        <div className="flex flex-col space-y-2 text-sm md:text-base">
                            <a href="/about" className="text-zinc-400 hover:text-white transition-colors">About</a>
                            <a href="/services" className="text-zinc-400 hover:text-white transition-colors">Services</a>
                            <a href="/process" className="text-zinc-400 hover:text-white transition-colors">Process</a>
                            <a href="/clients" className="text-zinc-400 hover:text-white transition-colors">Clients</a>
                            <a href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Address & Contact Info */}
                    <div className="space-y-3">
                        <h3 className="text-sm md:text-base font-semibold text-white tracking-wider uppercase">Address</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                            90 B MM Alam Rd, Block B1,
                            <br />
                            Gulberg III, Lahore, Pakistan
                        </p>
                        <div className="flex flex-col space-y-1 text-sm md:text-base pt-2">
                            <a href="tel:+923393949949" className="text-zinc-300 hover:text-white transition-colors">
                                +92 339 3949949
                            </a>
                        </div>
                    </div>

                    {/* Socials & Actions */}
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-sm md:text-base font-semibold text-white tracking-wider uppercase">Social</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">Instagram</a>
                                <span className="text-zinc-700">·</span>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
                                <span className="text-zinc-700">·</span>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">Facebook</a>
                                <span className="text-zinc-700">·</span>
                                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">YouTube</a>
                            </div>
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors self-start text-xs uppercase tracking-wider"
                        >
                            <span>Let&apos;s go up</span>
                            <span className="text-base">↑</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
                    <p>© 2026 Palette & Pixel. A venture of AAM Vertex. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}