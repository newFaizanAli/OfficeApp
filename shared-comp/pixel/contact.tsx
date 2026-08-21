'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        source: '',
        message: '',
        services: [] as string[],
        budget: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Form inputs scroll entry
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
                        start: 'top 80%',
                    },
                }
            );

            const vectors = submitBtnRef.current?.querySelectorAll('.submit-ab-img');

            if (submitBtnRef.current && vectors) {
                // Initial State: Sub icons start below the button and transparent
                gsap.set(vectors, { opacity: 0, y: 60, scale: 0.8 });

                // Hover Sequence Timeline: Continuous smooth flow bottom -> middle -> top hide
                const hoverTl = gsap.timeline({ paused: true, repeat: -1 });

                // 1. Ek ek karke icons neeche se reveal hongay (Bottom Entry)
                hoverTl.to(vectors, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.3,
                    ease: 'power3.out',
                }, 0);

                // 2. Continuous flow ke liye icons upar ki taraf move hote hue hide hongay (Top Exit)
                hoverTl.to(vectors, {
                    opacity: 0,
                    y: -60,
                    scale: 0.8,
                    duration: 1.2,
                    stagger: 0.3,
                    ease: 'power3.in',
                }, 1.2);

                const btn = submitBtnRef.current;

                const handleMouseEnter = () => {
                    hoverTl.restart();
                };

                const handleMouseLeave = () => {
                    hoverTl.pause();
                    // Smooth exit to initial hidden position
                    gsap.to(vectors, {
                        opacity: 0,
                        y: 60,
                        scale: 0.8,
                        duration: 0.6,
                        ease: 'power2.out',
                    });
                };

                btn.addEventListener('mouseenter', handleMouseEnter);
                btn.addEventListener('mouseleave', handleMouseLeave);

                return () => {
                    btn.removeEventListener('mouseenter', handleMouseEnter);
                    btn.removeEventListener('mouseleave', handleMouseLeave);
                };
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleCheckbox = (service: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1200);
    };

    const inputStyle = "w-full bg-transparent border-b-2 border-zinc-700 focus:border-white text-white text-xl md:text-3xl py-6 px-0 rounded-none outline-none transition-colors placeholder:text-zinc-500 focus:placeholder:text-zinc-400 font-medium";

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative w-full bg-black text-white py-20 px-4 md:px-8 lg:px-12 overflow-hidden font-sans rounded-t-[80px] md:rounded-t-[180px]"
        >
            <div className="max-w-[1600px] mx-auto space-y-16 w-full">
                <div>
                    <h2 className="text-4xl md:text-9xl tracking-tight text-white mb-6 pt-24">
                        Let&apos;s Build
                    </h2>
                </div>

                <div className="w-full">
                    {status === 'success' ? (
                        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-emerald-400 text-2xl font-medium">
                            Thank you! Your submission has been received!
                        </div>
                    ) : (
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-12 w-full max-w-7xl"
                        >
                            {/* Inputs */}
                            <div className="flex flex-col gap-10">
                                <div className="form-input-wrap">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                                <div className="form-input-wrap">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Company name"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className={inputStyle}
                                    />
                                </div>

                                <div className="form-input-wrap">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your designation"
                                        value={formData.designation}
                                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                        className={inputStyle}
                                    />
                                </div>

                                <div className="form-input-wrap">
                                    <select
                                        required
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className={`${inputStyle} appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled hidden>
                                            How did you hear about us
                                        </option>
                                        <option value="Google" className="bg-black text-white">Google</option>
                                        <option value="Facebook" className="bg-black text-white">Facebook</option>
                                        <option value="Instagram" className="bg-black text-white">Instagram</option>
                                        <option value="Email" className="bg-black text-white">Email</option>
                                        <option value="Referred" className="bg-black text-white">Referred by someone</option>
                                        <option value="Other" className="bg-black text-white">Other</option>
                                    </select>
                                </div>

                                <div className="form-input-wrap">
                                    <textarea
                                        required
                                        maxLength={5000}
                                        rows={3}
                                        placeholder="Write your message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className={`${inputStyle} resize-none`}
                                    />
                                </div>
                            </div>

                            {/* Services Options */}
                            <div className="space-y-4 pt-6">
                                <p className="text-zinc-400 font-medium text-lg">I am interested in</p>
                                <div className="flex flex-wrap gap-4">
                                    {['Website', 'SEO', 'UI/UX', 'Mobile App', 'Web App', 'Other'].map((item) => (
                                        <label
                                            key={item}
                                            className={`cursor-pointer px-6 py-3 rounded-full border text-base md:text-lg transition-all ${formData.services.includes(item)
                                                ? 'bg-white text-black border-white'
                                                : 'bg-transparent border-zinc-800 text-zinc-300 hover:border-zinc-600'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={formData.services.includes(item)}
                                                onChange={() => handleCheckbox(item)}
                                            />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Options */}
                            <div className="space-y-4 pt-4">
                                <p className="text-zinc-400 font-medium text-lg">My budget is</p>
                                <div className="flex flex-wrap gap-4">
                                    {['$2,000 - $5,000', '$5,000 - $10,000', '$10,000 +'].map((b) => (
                                        <label
                                            key={b}
                                            className={`cursor-pointer px-6 py-3 rounded-full border text-base md:text-lg transition-all ${formData.budget === b
                                                ? 'bg-white text-black border-white'
                                                : 'bg-transparent border-zinc-800 text-zinc-300 hover:border-zinc-600'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="Budget"
                                                className="sr-only"
                                                value={b}
                                                checked={formData.budget === b}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            />
                                            <span>{b}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 w-full">
                                <div
                                    ref={submitBtnRef}
                                    className="submit-button-wrap relative w-full h-24 md:h-28 rounded-full bg-[#ff007f] overflow-hidden flex items-center justify-center cursor-pointer group select-none"
                                >
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="relative z-20 bg-transparent text-white font-medium text-2xl md:text-3xl tracking-wide outline-none cursor-pointer"
                                    >
                                        {status === 'submitting' ? 'Please wait...' : 'Submit'}
                                    </button>

                                    {/* Vector Blobs */}
                                    <div className="submit-ab-img _1 absolute -left-6 -top-12 pointer-events-none z-10">
                                        <img
                                            src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4bba8769ca3f7ee85e_Vector%20(11).webp"
                                            loading="lazy"
                                            alt=""
                                            className="w-36 h-36 md:w-52 md:h-52 object-contain brightness-200"
                                        />
                                    </div>

                                    <div className="submit-ab-img _2 absolute left-1/4 -bottom-6 pointer-events-none z-10">
                                        <img
                                            src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4cddd35d84be98cc25_Vector%20(12).webp"
                                            loading="lazy"
                                            alt=""
                                            className="w-32 h-32 md:w-48 md:h-48 object-contain brightness-200"
                                        />
                                    </div>

                                    <div className="submit-ab-img _3 absolute right-1/4 -top-8 pointer-events-none z-10">
                                        <img
                                            src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4b2eed8e76f172a30a_Vector%20(13).webp"
                                            loading="lazy"
                                            alt=""
                                            className="w-28 h-28 md:w-40 md:h-40 object-contain brightness-200"
                                        />
                                    </div>

                                    <div className="submit-ab-img _4 absolute -right-4 -bottom-8 pointer-events-none z-10 rotate-45">
                                        <img
                                            src="https://cdn.prod.website-files.com/669e3c3f4fc4539c5469bdda/68345f4bcde64365020313bc_Vector%20(14).webp"
                                            loading="lazy"
                                            alt=""
                                            className="w-32 h-32 md:w-44 md:h-44 object-contain brightness-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 border-t border-zinc-800 text-xl">
                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-white">Lahore</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            4th Floor, Plaza # 63, C Block,<br />
                            CCA, Phase 6. DHA. Lahore. Pakistan.
                        </p>
                        <div className="flex flex-col space-y-1">
                            <a href="tel:+923491466556" className="text-zinc-300 hover:text-white transition-colors">
                                +92-349-1466556
                            </a>
                            <a href="mailto:pk@buzzinteractive.co" className="text-zinc-300 hover:text-white transition-colors">
                                pk@buzzinteractive.co
                            </a>
                        </div>
                    </div>





                    <div className="flex flex-col justify-between space-y-6">
                        <div className="flex flex-col space-y-2">
                            <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="/terms-of-use" className="text-zinc-400 hover:text-white transition-colors">Terms Of Use</a>
                            <a href="/careers" className="text-zinc-400 hover:text-white transition-colors">Careers</a>
                        </div>

                        <div className="flex items-center gap-4 text-xl font-medium">

                            <a href="https://www.linkedin.com/company/buzz-interactive/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                            <a href="https://www.instagram.com/buzzinteractive" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
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
            </div>
        </section>
    );
}