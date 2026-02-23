'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HolographicBuilder() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
            {/* Main Holographic Container */}
            <motion.div
                style={{
                    rotateY: mousePos.x,
                    rotateX: -mousePos.y,
                }}
                className="relative w-[400px] h-[500px] preserve-3d"
            >
                {/* Back Plate */}
                <div className="absolute inset-0 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-3xl backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.05)]" />

                {/* Grid Lining */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    borderRadius: '24px'
                }} />

                {/* Floating Elements (Blueprint Layers) */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            z: i * 40 + 20,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                        }}
                        className="absolute inset-8 border border-[#d4af37]/30 rounded-2xl bg-[#d4af37]/5 backdrop-blur-[2px] overflow-hidden"
                    >
                        {/* Mock Website Sections */}
                        <div className="p-4 space-y-3">
                            <div className="w-1/2 h-4 bg-[#d4af37]/20 rounded animate-pulse" />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-20 bg-[#d4af37]/10 rounded" />
                                <div className="h-20 bg-[#d4af37]/10 rounded" />
                            </div>
                            <div className="h-32 bg-[#d4af37]/10 rounded" />
                        </div>
                    </motion.div>
                ))}

                {/* Vertical Data Lines */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />

                {/* Floating Particles Around */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            background: '#d4af37',
                            position: 'absolute',
                            borderRadius: '50%',
                            boxShadow: '0 0 8px #d4af37'
                        }}
                    />
                ))}
            </motion.div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 w-[500px] h-20 bg-[#d4af37]/10 blur-[60px] rounded-full" />
        </div>
    );
}
