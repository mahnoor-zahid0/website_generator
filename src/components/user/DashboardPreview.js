'use client';

import { motion } from 'framer-motion';

const sites = [
    { name: "Quantum SaaS", status: "Active", speed: "0.2s", date: "24 Feb" },
    { name: "Nebula AI", status: "Deploying", speed: "0.4s", date: "22 Feb" },
    { name: "Vortex Pro", status: "Active", speed: "0.1s", date: "20 Feb" },
];

export default function DashboardPreview() {
    return (
        <section className="w-full bg-transparent py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-6">Management</h2>
                    <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight italic">Built for Scale.</h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-[40px] border-white/5 overflow-hidden shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Site Entity</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Runtime Status</th>
                                    <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency</th>
                                    <th className="px-10 py-8 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sites.map((site, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan font-bold italic">
                                                    {site.name[0]}
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold">{site.name}</div>
                                                    <div className="text-slate-500 text-[10px]">{site.date} 2026</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${site.status === 'Active' ? 'bg-accent-cyan shadow-[0_0_10px_#22d3ee]' : 'bg-accent-gold animate-pulse shadow-[0_0_10px_#fbbf24]'}`} />
                                                <span className={`text-xs font-bold ${site.status === 'Active' ? 'text-accent-cyan' : 'text-accent-gold'}`}>{site.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-sm text-slate-400 font-medium">
                                            {site.speed}
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9, type: "spring", stiffness: 400 }}
                                                className="px-6 py-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all font-sans"
                                            >
                                                Download ZIP
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
