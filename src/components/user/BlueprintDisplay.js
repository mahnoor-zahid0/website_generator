'use client';

import { motion } from 'framer-motion';

export default function BlueprintDisplay() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {/* Stacked Blueprint Panels */}
            <div className="relative w-full max-w-[450px] h-[300px] mx-auto lg:mx-0 preserve-3d">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, z: -100 * i, y: 50 * i }}
                        animate={{
                            opacity: 1 - (i * 0.2),
                            z: -80 * i,
                            y: i * 20,
                            rotateX: 45,
                            rotateZ: -10
                        }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="absolute inset-0 glass-card rounded-[30px] border-white/10 shadow-2xl overflow-hidden"
                    >
                        {/* Mock Template Structure */}
                        <div className="p-8 space-y-4 opacity-40">
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-24 bg-accent-cyan/20 rounded-full" />
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                            </div>
                            <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-24 bg-white/5 rounded-2xl" />
                                <div className="h-24 bg-white/5 rounded-2xl" />
                            </div>
                        </div>

                        {/* Scan Line Effect (only on top one) */}
                        {i === 0 && (
                            <motion.div
                                animate={{ y: [0, 300, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-full h-[1px] bg-accent-cyan/50 shadow-[0_0_15px_#22d3ee]"
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Floating Data Nodes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`node-${i}`}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, i % 2 === 0 ? 20 : -20, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                    className={`absolute w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_10px_#22d3ee] blur-[1px]`}
                    style={{
                        top: `${20 + i * 12}%`,
                        left: `${15 + (i % 3) * 30}%`
                    }}
                />
            ))}

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <motion.path
                    d="M 200 100 Q 300 250 500 150"
                    stroke="var(--accent-cyan)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                    d="M 600 400 Q 400 300 100 450"
                    stroke="var(--accent-gold)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
            </svg>
        </div>
    );
}
