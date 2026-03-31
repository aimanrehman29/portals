"use client";
import Link from "next/link";

export default function TeacherSidebar() {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-10">
        <h2 className="text-xl font-black text-white italic">FACULTY</h2>
        <p className="text-[10px] text-sky-500 tracking-widest font-bold">PORTAL v1.1</p>
      </div>

      <nav className="space-y-4 flex-1">
        <Link href="/admin" className="block text-zinc-400 hover:text-sky-400 font-bold uppercase text-xs tracking-widest transition-all">📊 Dashboard</Link>
        <Link href="/admin/attendance" className="block text-zinc-400 hover:text-sky-400 font-bold uppercase text-xs tracking-widest transition-all">📝 Attendance</Link>
        <Link href="/admin/assignments" className="block text-zinc-400 hover:text-sky-400 font-bold uppercase text-xs tracking-widest transition-all">📂 Tasks</Link>
      </nav>

      <div className="pt-6 border-t border-zinc-900">
        <button className="w-full py-3 bg-zinc-900 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-500 hover:text-white transition-all">
          Logout
        </button>
      </div>
    </div>
  );
}