'use client';

import { motion } from 'framer-motion';

export default function Features() {
    const tiers = [
        {
            title: "Free",
            description: "Perfect for simple personal projects and starters.",
            features: [
                "Static Templates",
                "Basic Data Injection",
                "Instant ZIP Download",
                "Community Support"
            ],
            icon: (
                <svg className="w-8 h-8 text-slate-400 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            )
        },
        {
            title: "Standard",
            description: "Bring your site to life with professional animations.",
            features: [
                "Animated Templates",
                "Advanced Data Injection",
                "Premium Layouts",
                "Priority Support"
            ],
            icon: (
                <svg className="w-8 h-8 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
            ),
            highlight: true
        },
        {
            title: "Pro",
            description: "Ultimate customization with themes and high-end tech.",
            features: [
                "High-End Animations",
                "Theme Color Switching",
                "SEO Optimization",
                "1-on-1 Consulting"
            ],
            icon: (
                <svg className="w-8 h-8 text-accent-rose" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="features" className="w-full bg-transparent py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-6">Capabilities</h2>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight italic">Engineered for Velocity.</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`group relative p-10 rounded-[40px] glass-card transition-all duration-500 ${tier.highlight
                                ? 'border-accent-cyan/30 bg-accent-cyan/[0.03] shadow-[0_0_80px_rgba(34,211,238,0.1)]'
                                : 'border-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-10">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative ${tier.highlight ? 'bg-accent-cyan/10' : 'bg-white/5'}`}>
                                    <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${tier.highlight ? 'bg-accent-cyan/30' : 'bg-white/10'}`} />
                                    <div className="relative z-10">{tier.icon}</div>
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest pt-2">Phase 0{idx + 1}</div>
                            </div>

                            <h4 className="text-3xl font-black text-white mb-4 tracking-tighter italic">{tier.title}</h4>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">{tier.description}</p>

                            <ul className="space-y-5 mb-10">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-4 text-xs text-slate-300 font-bold uppercase tracking-widest">
                                        <div className={`w-1.5 h-1.5 rounded-full ${tier.highlight ? 'bg-accent-cyan shadow-[0_0_8px_#22d3ee]' : 'bg-white/20'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/0 to-transparent group-hover:via-accent-cyan/50 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
