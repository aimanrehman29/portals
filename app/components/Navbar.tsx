"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-black text-xs">KU</div>
          <span className="font-bold text-white tracking-tighter uppercase">Portal <span className="text-sky-500">v1.0</span></span>
        </div>

        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
          <Link 
            href="/dashboard" 
            className={`transition-colors ${pathname === '/dashboard' ? 'text-sky-400' : 'text-zinc-500 hover:text-white'}`}
          >
            Student
          </Link>
          <Link 
            href="/admin" 
            className={`transition-colors ${pathname === '/admin' ? 'text-sky-400' : 'text-zinc-500 hover:text-white'}`}
          >
            Teacher
          </Link>
        </div>

        <div className="hidden md:block text-[10px] text-zinc-600 font-mono">
          CONNECTED: BT0L9086
        </div>
      </div>
    </nav>
  );
}