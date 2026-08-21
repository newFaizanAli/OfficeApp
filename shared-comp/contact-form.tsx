'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface ContactFormProps {
    variant?: 'dark' | 'light';
    className?: string;
    showHeading?: boolean;
}

const PROJECT_TYPES = [
    'New Product',
    'Brand Refresh',
    'Launch Campaign',
    'Production',
    'Marketing',
    'Funding & Coaching',
];

export default function ContactForm({ variant = 'dark', className = '', showHeading = true }: ContactFormProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLDivElement>(null);

    const isDark = variant === 'dark';

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.form-input-wrap',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 85%',
                    },
                }
            );

            const vectors = submitBtnRef.current?.querySelectorAll('.submit-ab-img');

            if (submitBtnRef.current && vectors) {
                gsap.set(vectors, { opacity: 0, y: 60, scale: 0.8 });

                const hoverTl = gsap.timeline({ paused: true, repeat: -1 });

                hoverTl.to(
                    vectors,
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out' },
                    0
                );

                hoverTl.to(
                    vectors,
                    { opacity: 0, y: -60, scale: 0.8, duration: 1.2, stagger: 0.3, ease: 'power3.in' },
                    1.2
                );

                const btn = submitBtnRef.current;

                const handleMouseEnter = () => hoverTl.restart();
                const handleMouseLeave = () => {
                    hoverTl.pause();
                    gsap.to(vectors, { opacity: 0, y: 60, scale: 0.8, duration: 0.6, ease: 'power2.out' });
                };

                btn.addEventListener('mouseenter', handleMouseEnter);
                btn.addEventListener('mouseleave', handleMouseLeave);

                return () => {
                    btn.removeEventListener('mouseenter', handleMouseEnter);
                    btn.removeEventListener('mouseleave', handleMouseLeave);
                };
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1200);
    };

    // Theme tokens
    const inputStyle = isDark
        ? 'w-full bg-transparent border-b-2 border-zinc-700 focus:border-white text-white text-base md:text-xl py-4 px-0 rounded-none outline-none transition-colors placeholder:text-zinc-500 focus:placeholder:text-zinc-400 font-medium'
        : 'w-full bg-transparent border-b-2 border-zinc-300 focus:border-black text-black text-base md:text-xl py-4 px-0 rounded-none outline-none transition-colors placeholder:text-zinc-400 focus:placeholder:text-zinc-500 font-medium';

    const headingColor = isDark ? 'text-white' : 'text-black';
    const successBox = isDark
        ? 'p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-emerald-400 text-xl font-medium'
        : 'p-8 bg-zinc-50 border border-zinc-200 rounded-xl text-center text-emerald-600 text-xl font-medium';
    const optionStyle = isDark ? 'bg-black text-white' : 'bg-white text-black';
    const vectorFilter = isDark ? 'brightness-200' : 'brightness-0 opacity-70';

    return (
        <div ref={sectionRef} className={className}>
            {showHeading && (
                <h2 className={`text-4xl md:text-7xl lg:text-8xl tracking-tight ${headingColor} mb-10`}>
                    Let&apos;s Build
                </h2>
            )}

            {status === 'success' ? (
                <div className={successBox}>Thank you! Your submission has been received!</div>
            ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 w-full max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div className="form-input-wrap">
                            <input
                                type="text"
                                required
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={inputStyle}
                            />
                        </div>

                        <div className="form-input-wrap">
                            <input
                                type="text"
                                required
                                placeholder="Company / Brand"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className={inputStyle}
                            />
                        </div>

                        <div className="form-input-wrap">
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={inputStyle}
                            />
                        </div>

                        <div className="form-input-wrap">
                            <input
                                type="tel"
                                required
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={inputStyle}
                            />
                        </div>
                    </div>

                    <div className="form-input-wrap">
                        <select
                            required
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={`${inputStyle} appearance-none cursor-pointer`}
                        >
                            <option value="" disabled hidden>
                                What are you building?
                            </option>
                            {PROJECT_TYPES.map((type) => (
                                <option key={type} value={type} className={optionStyle}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-input-wrap">
                        <textarea
                            required
                            maxLength={5000}
                            rows={4}
                            placeholder="Tell us about your project"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={`${inputStyle} resize-none`}
                        />
                    </div>

                    <div className="pt-6 w-full">
                        <div
                            ref={submitBtnRef}
                            className="submit-button-wrap relative w-full h-20 md:h-24 rounded-full bg-[#ff007f] overflow-hidden flex items-center justify-center cursor-pointer group select-none"
                        >
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="relative z-20 bg-transparent text-white font-medium text-lg md:text-2xl tracking-wide outline-none cursor-pointer"
                            >
                                {status === 'submitting' ? 'Please wait...' : 'Start the Conversation'}
                            </button>

                            <div className="submit-ab-img _1 absolute -left-6 -top-12 pointer-events-none z-10">
                                <img
                                    src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4bba8769ca3f7ee85e_Vector%20(11).webp"
                                    loading="lazy"
                                    alt=""
                                    className={`w-36 h-36 md:w-52 md:h-52 object-contain ${vectorFilter}`}
                                />
                            </div>

                            <div className="submit-ab-img _2 absolute left-1/4 -bottom-6 pointer-events-none z-10">
                                <img
                                    src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4cddd35d84be98cc25_Vector%20(12).webp"
                                    loading="lazy"
                                    alt=""
                                    className={`w-32 h-32 md:w-48 md:h-48 object-contain ${vectorFilter}`}
                                />
                            </div>

                            <div className="submit-ab-img _3 absolute right-1/4 -top-8 pointer-events-none z-10">
                                <img
                                    src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4b2eed8e76f172a30a_Vector%20(13).webp"
                                    loading="lazy"
                                    alt=""
                                    className={`w-28 h-28 md:w-40 md:h-40 object-contain ${vectorFilter}`}
                                />
                            </div>

                            <div className="submit-ab-img _4 absolute -right-4 -bottom-8 pointer-events-none z-10 rotate-45">
                                <img
                                    src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4bcde64365020313bc_Vector%20(14).webp"
                                    loading="lazy"
                                    alt=""
                                    className={`w-32 h-32 md:w-44 md:h-44 object-contain ${vectorFilter}`}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}