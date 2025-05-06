'use client';
import React, { useEffect, useState } from 'react'
import { useUserDetails } from '../zustand/useUserDetails';

function Authuserverify({ children }) {
    const isLogged = useUserDetails(state => state.isLogged);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Check if Zustand state is hydrated
        const checkHydration = async () => {
            await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next render cycle
            setIsHydrated(true);
        };
        checkHydration();
    }, []);

    useEffect(() => {
        if (isHydrated) {
            if (!isLogged) {
                window.location.href = '/';
            } else {
                setIsLoading(false);
            }
        }
    }, [isLogged, isHydrated]);

    if (isLoading === true) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        )
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Authuserverify
