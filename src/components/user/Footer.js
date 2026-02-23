'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="w-full bg-transparent pt-32 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="glass-card p-12 rounded-[50px] border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-cyan to-blue-600 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white italic">Web<span className="text-accent-cyan">Gen</span></span>
                        </Link>
                        <p className="text-slate-500 text-xs font-medium max-w-[200px] text-center md:text-left leading-relaxed">
                            description: "Our automation engine compiles everything into a ready-to-deploy ZIP archive.",cture.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12">
                        {['Platform', 'Templates', 'Pricing', 'Legal'].map(section => (
                            <div key={section} className="flex flex-col gap-4 items-center md:items-start">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{section}</h4>
                                <div className="flex flex-col gap-2 items-center md:items-start">
                                    <Link href="#" className="text-xs text-slate-500 hover:text-accent-cyan transition-colors font-medium">Overview</Link>
                                    <Link href="#" className="text-xs text-slate-500 hover:text-accent-cyan transition-colors font-medium">Integrations</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {[1, 2, 3].map(i => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="w-12 h-12 rounded-2xl glass-card border-white/10 flex items-center justify-center text-white hover:border-accent-cyan hover:text-accent-cyan transition-all shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8zm0 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                                </svg>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2026 WebGen Intelligence Systems</p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest">Privacy Protocol</Link>
                        <Link href="#" className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest">Service Level Agreement</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
