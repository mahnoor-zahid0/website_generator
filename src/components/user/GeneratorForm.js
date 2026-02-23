'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GeneratorForm() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <section className="w-full bg-transparent py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center perspective-1000" onMouseMove={handleMouseMove}>

                    {/* Form Panel (Glass Slab) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 rounded-[40px] border-white/5 relative group max-w-2xl mx-auto lg:mx-0"
                    >
                        <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-10">Configuration Suite</h2>
                        <h3 className="text-4xl font-black text-white mb-12 tracking-tight italic">Design Your Perfect Site.</h3>

                        <form className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Project Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter website title..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Description</label>
                                <textarea
                                    rows="4"
                                    placeholder="Describe your vision..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-cyan transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Primary Color</label>
                                    <div className="flex gap-3">
                                        {['#22d3ee', '#fbbf24', '#fb7185', '#a855f7'].map(color => (
                                            <button key={color} type="button" className="w-8 h-8 rounded-lg shadow-lg border border-white/10 hover:scale-110 active:scale-95 transition-all" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Template Features</label>
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                        <button type="button" className="flex-1 py-2 text-[10px] font-black uppercase tracking-tighter bg-accent-cyan text-black rounded-lg">Full Stack</button>
                                        <button type="button" className="flex-1 py-2 text-[10px] font-black uppercase tracking-tighter text-slate-400">Static</button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Build ZIP Package
                            </button>
                        </form>
                    </motion.div>

                    {/* Blueprint Preview Side (Static & Professional) */}
                    <motion.div
                        style={{
                            rotateY: mousePos.x * 10,
                            rotateX: -mousePos.y * 10,
                            translateZ: 50
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:block preserve-3d"
                    >
                        <div className="absolute -inset-10 bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none" />

                        {/* Professional UI Blueprint */}
                        <div className="glass-card w-full h-[600px] rounded-[50px] border-white/10 overflow-hidden relative shadow-2xl">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Blueprint v2.4</div>
                                <div className="h-6 w-1/2 bg-white/5 rounded-full" />
                            </div>

                            <div className="p-12 space-y-10">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-accent-cyan/20 rounded-2xl" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                        <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5" />
                                    ))}
                                </div>
                                <div className="h-40 bg-white/5 rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-cyan/5 to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Verification Tag */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-accent-cyan text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl"
                        >
                            Validated
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
