'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function dashboard() {
  return (
    <div className="flex flex-col center items-center p-20">
      <div className="text-5xl">Welcome to Haul</div>

      <Link href="/finds">
        <button className="bg-white text-black p-3 rounded-lg mt-40">
          Enter
        </button>
      </Link>
    </div>
  );
}
