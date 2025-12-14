"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import LoadingScreen to reduce initial bundle size
const LoadingScreen = dynamic(() => import('./components/loader'), {
    ssr: false,
});

export default function ClientLayoutWrapper() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Reduce loading time for better performance
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Don't render LoadingScreen during SSR
    if (!isMounted || !isLoading) {
        return null;
    }

    return <LoadingScreen />;
}