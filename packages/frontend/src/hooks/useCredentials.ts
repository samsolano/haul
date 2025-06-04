'use client';

import { useEffect, useState } from 'react';

interface User {
    username: string;
    // Add other user properties as needed
}

interface UseCredentialsReturn {
    userId: string | null;
    jwt: string | null;
    isLoggedIn: boolean;
    login: (userId: string, jwt: string, user: User) => void;
    logout: () => void;
    updateUserInfo: () => void;
}

export type StoredLocalType = {
    userId: string | null;
    jwt: string | null;
    user: User | null;
};

// Using different key to migrate
const LOCAL_STORAGE_KEY = 'auth';

export function useCredentials(): UseCredentialsReturn {
    const [userId, setUserId] = useState<string | null>(null);
    const [jwt, setJWT] = useState<string | null>(null);

    const updateUserInfo = () => {
        const userStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (userStr) {
            try {
                const userData: StoredLocalType = JSON.parse(userStr);
                setUserId(userData.userId);
                setJWT(userData.jwt);
            } catch (error) {
                console.error('Error parsing user data:', error);
                setUserId(null);
                setJWT(null);
            }
        } else {
            setUserId(null);
            setJWT(null);
        }
    };

    const login = (userId: string, jwt: string) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ userId, jwt }));
        setUserId(userId);
        setJWT(jwt);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userLogin'));
    };

    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setUserId(null);
        setJWT(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        updateUserInfo();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === LOCAL_STORAGE_KEY) {
                updateUserInfo();
            }
        };

        const handleLogin = () => {
            updateUserInfo();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userLogin', handleLogin);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLogin', handleLogin);
        };
    }, []);

    return {
        userId,
        jwt,
        isLoggedIn: !!userId,
        login,
        logout,
        updateUserInfo,
    };
}