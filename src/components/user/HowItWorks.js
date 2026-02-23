'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        title: "Select Template",
        description: "Browse our premium gallery and choose a blueprint that fits your vision.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
        color: "bg-accent-cyan"
    },
    {
        title: "Populate Data",
        description: "Fill out a simple form with your content, brand colors, and assets.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        color: "bg-accent-gold"
    },
    {
        title: "Download ZIP",
        description: "Our high-speed engine compiles your selection into a ready-to-deploy ZIP archive.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        ),
        color: "bg-accent-rose"
    }
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-transparent py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-6">Execution Path</h2>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Zero Coding. Pure Progress.</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative group text-center"
                        >
                            <div className="relative mb-10 inline-block">
                                <div className={`relative w-24 h-24 rounded-[30px] ${step.color} flex items-center justify-center text-white z-10 shadow-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                                    {step.icon}
                                </div>
                                <div className={`absolute -inset-4 ${step.color.replace('bg-', 'bg-')}/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            </div>

                            <h4 className="text-2xl font-black text-white mb-4 tracking-tight uppercase italic">{idx + 1}. {step.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-[250px] mx-auto font-medium">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
