'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500`}
        >
            <div className={`px-8 py-4 rounded-2xl glass-card flex items-center justify-between ${scrolled ? 'shadow-[0_0_30px_rgba(0,0,0,0.3)]' : ''}`}>
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-cyan to-blue-600 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white italic">Web<span className="text-accent-cyan">Gen</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Services
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="#templates" className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Templates
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                        Pricing
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log In</Link>
                    <Link href="/register" className="px-6 py-2 bg-accent-cyan text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
