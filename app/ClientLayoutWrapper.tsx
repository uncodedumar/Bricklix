"use client";

import { useState, useEffect } from 'react';
import LoadingScreen from './components/loader';

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => setIsLoading(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    // Don't render LoadingScreen during SSR
    if (!isMounted) {
        return <>{children}</>;
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            {children}
        </>
    );
}