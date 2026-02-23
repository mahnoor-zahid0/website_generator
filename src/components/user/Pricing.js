'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Start your journey today",
            features: ["3 Basic Templates", "Manual Data Entry", "ZIP Export", "Standard Support"],
            buttonText: "Get Started",
            link: "/register"
        },
        {
            name: "Standard",
            price: "$19",
            description: "Level up with animations",
            features: ["10+ Premium Templates", "Animated Elements", "Priority Support", "Basic SEO"],
            buttonText: "Upgrade to Standard",
            link: "/register",
            popular: true
        },
        {
            name: "Pro",
            price: "$49",
            description: "For elite professionals",
            features: ["All Templates", "Theme Color Switching", "Full Animations", "White-label Option"],
            buttonText: "Go Pro Now",
            link: "/register"
        }
    ];

    return (
        <section className="w-full bg-transparent py-12 relative overflow-hidden px-6" id="pricing">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-6">Pricing Plans</h2>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Choose Your Foundation.</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch perspective-1000">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 80, rotateX: 20, z: -150 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                z: 0
                            }}
                            transition={{
                                type: "tween",
                                ease: "easeOut",
                                duration: 1.5,
                                delay: idx * 0.1
                            }}
                            animate={{
                                y: [0, -10, 0],
                                rotateZ: idx % 2 === 0 ? [0, 1, 0] : [0, -1, 0]
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                                rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }
                            }}
                            whileHover={{
                                y: -20,
                                rotateX: 5,
                                rotateY: idx === 1 ? 0 : (idx === 0 ? 5 : -5),
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            viewport={{ once: true }}
                            className={`group relative p-10 rounded-[40px] glass-card transition-all duration-500 preserve-3d ${plan.popular
                                ? 'border-accent-cyan/40 bg-accent-cyan/5 shadow-[0_0_80px_rgba(34,211,238,0.1)]'
                                : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-accent-cyan text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                                    High Conversion
                                </div>
                            )}

                            <div className="mb-10">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{plan.name}</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-white">{plan.price}</span>
                                    <span className="text-slate-500 font-bold">/MO</span>
                                </div>
                                <p className="mt-6 text-slate-400 text-sm leading-relaxed font-medium">{plan.description}</p>
                            </div>

                            <div className="space-y-5 mb-12">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-4 text-sm text-slate-300 font-medium">
                                        <div className="w-5 h-5 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20">
                                            <svg className="w-3 h-3 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={plan.link}
                                className={`block w-full text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.popular
                                    ? 'bg-accent-cyan text-white shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95'
                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {plan.buttonText}
                            </Link>

                            {/* Reflective Sweep Effect */}
                            <div className="absolute inset-0 rounded-[40px] overflow-hidden pointer-events-none">
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
