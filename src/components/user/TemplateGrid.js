import { motion } from 'framer-motion';
import Link from 'next/link'; // Assuming Next.js Link component for href

export default function TemplateGrid({ templates }) {
    return (
        <section id="templates" className="w-full bg-transparent py-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-xs font-bold text-accent-cyan uppercase tracking-[0.4em] mb-6">Template Gallery</h2>
                        <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">The Blueprint of Success.</h3>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                        {['All', 'Basic', 'Standard', 'Pro'].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'All' ? 'bg-accent-cyan text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {templates.map((template, idx) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 70,
                                damping: 15,
                                delay: idx * 0.1
                            }}
                            className="group relative glass-card rounded-[40px] overflow-hidden border-white/5 hover:border-accent-cyan/30 transition-all duration-700 hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {/* Inner Parallax Effect */}
                                <motion.img
                                    whileHover={{ scale: 1.15, y: -10 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    src={template.preview}
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />

                                {template.premium && (
                                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-accent-rose text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(251,113,129,0.3)]">
                                        Premium
                                    </div>
                                )}
                            </div>

                            <div className="p-10 relative">
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{template.name}</h3>
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                                    <p className="text-slate-500 text-xs font-black uppercase tracking-wider">{template.category}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/templates/${template.id}`}
                                        className="flex-1 text-center py-4 bg-white/5 hover:bg-accent-cyan hover:text-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/5 hover:border-accent-cyan transition-all active:scale-95"
                                    >
                                        Use Template
                                    </Link>
                                    <button className="w-12 h-12 flex items-center justify-center glass-card rounded-2xl border-white/10 hover:border-white/30 text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
