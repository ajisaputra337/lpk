"use client";

import React, { useEffect, useState } from "react";

const Petal = ({ delay, left, size, duration }: { delay: string, left: string, size: number, duration: string }) => (
    <div
        className="animate-sakura-fall absolute z-[100] opacity-80 pointer-events-none"
        style={{
            top: '-10%',
            left,
            animationDelay: delay,
            animationDuration: `${duration}, 4s`
        }}
    >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFB7C5" stroke="#F472B6" strokeWidth="0.5">
            <path d="M12,21.5C12,21.5 15,18 15,15C15,12 12,10.5 12,10.5C12,10.5 9,12 9,15C9,18 12,21.5 12,21.5Z" />
        </svg>
    </div>
);

const SakuraBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Optimized petal count (~30 petals for balanced density)
    const petals = [
        { delay: '0s', left: '2%', size: 24, duration: '10s' },
        { delay: '1s', left: '8%', size: 18, duration: '12s' },
        { delay: '4s', left: '15%', size: 26, duration: '11s' },
        { delay: '2s', left: '22%', size: 20, duration: '13s' },
        { delay: '6s', left: '28%', size: 28, duration: '10s' },
        { delay: '3s', left: '35%', size: 22, duration: '14s' },
        { delay: '8s', left: '42%', size: 25, duration: '11s' },
        { delay: '5s', left: '48%', size: 19, duration: '12s' },
        { delay: '9s', left: '55%', size: 27, duration: '10s' },
        { delay: '7s', left: '62%', size: 21, duration: '13s' },
        { delay: '0.5s', left: '68%', size: 23, duration: '11s' },
        { delay: '3.5s', left: '75%', size: 18, duration: '12s' },
        { delay: '6.5s', left: '82%', size: 26, duration: '10s' },
        { delay: '2.5s', left: '88%', size: 20, duration: '14s' },
        { delay: '5.5s', left: '95%', size: 24, duration: '13s' },
        // Second wave
        { delay: '1.5s', left: '5%', size: 22, duration: '11s' },
        { delay: '4.5s', left: '12%', size: 28, duration: '10s' },
        { delay: '7.5s', left: '25%', size: 19, duration: '13s' },
        { delay: '3.2s', left: '38%', size: 25, duration: '12s' },
        { delay: '9.2s', left: '52%', size: 21, duration: '11s' },
        { delay: '2.2s', left: '65%', size: 27, duration: '10s' },
        { delay: '8.2s', left: '78%', size: 20, duration: '14s' },
        { delay: '5.2s', left: '92%', size: 24, duration: '12s' },
        { delay: '11s', left: '45%', size: 18, duration: '13s' },
        { delay: '10s', left: '85%', size: 26, duration: '11s' },
    ];

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {petals.map((p, i) => (
                <Petal key={i} {...p} />
            ))}
        </div>
    );
};

export default SakuraBackground;
