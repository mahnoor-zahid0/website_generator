import Link from 'next/link';
import { motion } from 'framer-motion';
import BlueprintDisplay from './BlueprintDisplay';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                mass: 0.5
            }
        }
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-16">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-cyan/10 blur-[100px] rounded-full"
                />
                <motion.div
                    animate={{
                        y: [0, 60, 0],
                        rotate: [0, -10, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full"
                />

                {/* Floating 3D-like Shapes (Glass Panels) */}
                <motion.div
                    animate={{ y: [-20, 20, -20], rotateX: [10, 20, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-[15%] w-32 h-44 glass-card rounded-2xl border-white/5 shadow-2xl skew-x-12 hidden lg:block"
                />
                <motion.div
                    animate={{ y: [30, -30, 30], rotateY: [-10, -20, -10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 left-[10%] w-40 h-28 glass-card rounded-2xl border-white/5 shadow-2xl -skew-x-6 hidden lg:block"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-left"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent-cyan/30 text-accent-cyan text-[10px] font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                        Architectural Excellence
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9] perspective-1000"
                    >
                        Scale Your Vision with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-gold drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">Premium Templates.</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-slate-400 max-w-xl mb-14 font-medium leading-relaxed"
                    >
                        Transform concepts into professional high-performance interfaces instantly.
                        Automated data mapping, structural precision, and one-click ZIP packaging.
                    </motion.p>

                    {/* Row: Stats + Buttons */}
                    <div className="flex flex-col xl:flex-row items-start xl:items-center gap-12 xl:gap-20 border-t border-white/5 pt-12 mt-4">
                        {/* Stats Group */}
                        <div className="flex gap-12">
                            <div className="text-left">
                                <div className="text-3xl font-black text-white">2k+</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-2">Active Sites</div>
                            </div>
                            <div className="text-left">
                                <div className="text-3xl font-black text-white">0.4s</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-2">Load Speed</div>
                            </div>
                            <div className="text-left">
                                <div className="text-3xl font-black text-white">99%</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-2">Client Rank</div>
                            </div>
                        </div>

                        {/* CTA Buttons Group */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
                            <Link href="#templates" className="group relative px-8 py-4 bg-accent-cyan text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95">
                                Start Building
                            </Link>
                            <Link href="#templates" className="px-8 py-4 glass-card text-white text-xs font-black uppercase tracking-widest rounded-2xl border-white/10 hover:bg-white/5 hover:border-white/20 transition-all">
                                View Blueprints
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50, rotateY: -20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:flex items-center justify-center pt-20"
                >
                    <BlueprintDisplay />
                </motion.div>

                {/* Mobile Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="lg:hidden flex flex-col items-center gap-6 mt-12"
                    initial="hidden"
                    animate="visible"
                >
                    <Link href="#templates" className="w-full text-center px-12 py-5 bg-accent-cyan text-white font-extrabold rounded-2xl transition-all shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-105">
                        Start Building
                    </Link>
                    <Link href="#templates" className="w-full text-center px-12 py-5 glass-card text-white font-bold rounded-2xl border-white/10">
                        View Blueprints
                    </Link>
                </motion.div>
            </div>


        </div>
    );
}
