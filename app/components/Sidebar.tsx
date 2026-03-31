"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Teacher Portal", path: "/admin", icon: "👨‍🏫" },
    { name: "Assignments", path: "/dashboard", icon: "📚" },
    { name: "Settings", path: "#", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-zinc-900/50 border-r border-white/5 backdrop-blur-xl flex flex-col p-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-black">KU</div>
        <span className="font-bold text-xl tracking-tighter">PORTAL <span className="text-sky-500 text-xs">v1.1</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
              pathname === item.path 
              ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20" 
              : "text-zinc-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-sky-500/5 border border-sky-500/10 rounded-2xl">
        <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">User Logged In</p>
        <p className="text-sm font-bold truncate">Ayman Rehman</p>
      </div>
    </aside>
  );
}