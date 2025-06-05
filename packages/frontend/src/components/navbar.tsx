'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IoMenu } from "react-icons/io5";

const LINKS: { name: string; href: string }[] = [
    { name: 'TRENDS', href: '/trends' },
    { name: 'FINDS', href: '/finds' },
    { name: 'STORES', href: '/stores' },
    { name: 'PROFILE', href: '/profile' },
];

function MobileLinks(props: { username: string | null }) {
    return (
        <div className="sm:hidden relative">
            <Menu>
                <MenuButton>
                    <IoMenu />
                </MenuButton>

                <MenuItems anchor="bottom end" className="rounded-lg rounded-tr-none bg-white dark:bg-[#0a0a0a]">
                    {LINKS.map((link) => (
                        <MenuItem key={link.href}>
                            <Link href={link.href}>
                                <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                                    {link.name}
                                </button>
                            </Link>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}

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
        <div className="flex flex-row justify-between sm:justify-normal items-center p-2.5 lg:ml-4.5">
            <Link href="/">
                <button className="hover:cursor-pointer text-3xl">
                    HAUL
                </button>
            </Link>

            <MobileLinks username={username}/>

            <div className="hidden sm:flex flex-row text-xl ml-auto mr-4.5 gap-2 lg:gap-6 items-center">
                {(() => {
                    const links = LINKS.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <button
                                className={`hover:cursor-pointer ${pathname === link.href ? 'font-bold' : 'font-normal'}`}
                            >
                                {link.name}
                            </button>
                        </Link>
                    ));
                    if (username) {
                        

                        return (
                            <>
                                {links}
                                <span className="text-sm">Welcome, {username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-black bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 hover:cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        );
                    }

                    return (
                        <>
                            {links}
                            <Link href="/login">
                            <button className="bg-white text-black p-2 rounded-lg">
                                Login
                                </button>
                            </Link>
                        </>
                    );
                })()}
            </div>
        </div>
    );
}