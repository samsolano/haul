'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function Navbar(){
    const pathname = usePathname();
    return(
        
        <div className="flex items-center p-2.5 ml-4.5">
        <Link href="/">
            <button className="text-3xl">
            HAUL
            </button>
        </Link>
        <div className="text-xl ml-auto mr-4.5 flex gap-6">
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
        </div>
      </div>
    );
}