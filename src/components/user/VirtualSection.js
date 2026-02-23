'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function VirtualSection({
    children,
    className = "",
    type = "zoom", // zoom, slide, focus
    fullHeight = false
}) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smoothen the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Define different transition behaviors
    let transformStyles = {};

    if (type === "zoom") {
        const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.8, 1, 1, 0.8]);
        const rotateX = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [15, 0, 0, -15]);
        transformStyles = { scale, rotateX };
    } else if (type === "slide") {
        const x = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [-100, 0, 0, 100]);
        const skewX = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [10, 0, 0, -10]);
        transformStyles = { x, skewX };
    } else if (type === "focus") {
        const blur = useTransform(smoothProgress, [0, 0.45, 0.55, 1], ["10px", "0px", "0px", "10px"]);
        const scale = useTransform(smoothProgress, [0, 0.45, 0.55, 1], [0.95, 1, 1, 0.95]);
        transformStyles = { filter: `blur(${blur})`, scale };
    }

    const opacity = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

    return (
        <section
            className={`relative ${fullHeight ? 'min-h-screen' : 'min-h-[60vh]'} flex flex-col items-center justify-center py-10 ${className}`}
            style={{ perspective: "2000px" }}
        >
            <motion.div
                style={{
                    ...transformStyles,
                    opacity,
                    transformStyle: "preserve-3d"
                }}
                className="w-full h-full flex flex-col items-center justify-center"
            >
                {children}
            </motion.div>
        </section>
    );
}
