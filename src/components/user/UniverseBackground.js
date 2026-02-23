'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function UniverseBackground() {
    const { scrollYProgress } = useScroll();
    const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yMedium = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const yFast = useTransform(scrollYProgress, [0, 1], [0, -450]);

    // Generate random shapes
    const shapes = [
        { size: 150, x: '10%', y: '20%', duration: 15, delay: 0, color: 'bg-cyan-500/10', blur: 'blur-[80px]', speed: ySlow },
        { size: 300, x: '70%', y: '10%', duration: 25, delay: 2, color: 'bg-purple-500/5', blur: 'blur-[120px]', speed: ySlow },
        { size: 200, x: '40%', y: '60%', duration: 20, delay: 5, color: 'bg-blue-600/10', blur: 'blur-[100px]', speed: yMedium },
        { size: 120, x: '80%', y: '80%', duration: 18, delay: 1, color: 'bg-indigo-500/10', blur: 'blur-[70px]', speed: yMedium },
        { size: 250, x: '5%', y: '75%', duration: 22, delay: 3, color: 'bg-rose-500/5', blur: 'blur-[110px]', speed: yFast },
    ];

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
            {/* Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] opacity-80" />

            {/* Floating Shapes Layer */}
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    style={{
                        left: shape.x,
                        top: shape.y,
                        y: shape.speed,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: shape.delay
                    }}
                    className={`absolute ${shape.size}px ${shape.size}px ${shape.color} ${shape.blur} rounded-full`}
                    style={{ width: shape.size, height: shape.size }}
                />
            ))}

            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        </div>
    );
}
