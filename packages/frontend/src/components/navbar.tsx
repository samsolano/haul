'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function Navbar(){
    const pathname = usePathname();
    return(
        
        <div style={{display: "flex", alignItems: "center", padding: "10px", marginLeft: "18px"}}>
        <Link href="/">
            <button style={{fontSize: '30px'}}>
            HAUL
            </button>
        </Link>
        <div style={{fontSize:'20px', marginLeft:"auto", marginRight: "18px", display: "flex", gap: "25px"}}>
            <Link href="/finds">
            <button style={{fontWeight: pathname === '/finds' ? 'bolder': 'normal'}}>
            FINDS
            </button>
        </Link>
            <Link href="/stores">
            <button style={{fontWeight: pathname === '/stores' ? 'bolder': 'normal'}}>
            STORES
            </button>
        </Link>
            <Link href="/profile">
            <button style={{fontWeight: pathname === '/profile' ? 'bolder': 'normal'}}>
            PROFILE
            </button>
        </Link>
        </div>
      </div>
    );
}