'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [username, setUsername] = useState<string | null>(null);

    const updateUserInfo = () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUsername(user.username);
        } else {
            setUsername(null);
        }
    };

    useEffect(() => {
        updateUserInfo();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user') {
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

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUsername(null);
        window.location.href = '/login';
    };

    return (
        <div className="flex items-center p-2.5 ml-4.5">
            <Link href="/">
                <button className="text-3xl">
                    HAUL
                </button>
            </Link>
            <div className="text-xl ml-auto mr-4.5 flex gap-6 items-center">
                {username ? (
                    <>
                         <Link href="/trends">
                          <button className={pathname === '/trends' ? 'font-bold' : 'font-normal'}>
                          TRENDS
                          </button>
                      </Link>
                        <Link href="/finds">
                            <button className={pathname === '/finds' ? 'font-bold' : 'font-normal'}>
                                FINDS
                            </button>
                        </Link>
                        <Link href="/stores">
                            <button className={pathname === '/stores' ? 'font-bold' : 'font-normal'}>
                                STORES
                            </button>
                        </Link>
                        <Link href="/profile">
                            <button className={pathname === '/profile' ? 'font-bold' : 'font-normal'}>
                                PROFILE
                            </button>
                        </Link>
                        <span className="text-sm">Welcome, {username}</span>
                        <button 
                            onClick={handleLogout}
                            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="bg-white text-black p-2 rounded-lg">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}