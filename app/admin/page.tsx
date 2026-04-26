"use client";
import { useAuth } from "../context/PortalContext";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import Link from "next/link"; // Link import karna mat bhooliye ga

export default function AdminPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ students: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      // Filter: Sirf wo students count honge jo professors nahi hain
      const studentCount = await client.fetch(
        `count(*[_type == "student" && !(name match "Prof*")])`
      );
      setStats({ students: studentCount });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* --- HEADER SECTION --- */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-500 text-[9px] font-black px-2 py-0.5 rounded text-black uppercase tracking-widest">
              Authorized
            </span>
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
              Node ID: {user?.rollNumber || "ST-101"}
            </span>
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
            Welcome, <span className="text-zinc-500">Prof.Pinhaan</span>
          </h1>
        </div>
        
        <div className="text-left md:text-right">
          <p className="text-zinc-700 text-[9px] uppercase tracking-[0.4em] font-bold mb-1">System Health</p>
          <p className="text-emerald-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
            ● Connection Secure
          </p>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total Students" value={stats.students} />
        <StatCard label="Attendance Rate" value="92%" />
        <StatCard label="Active Tasks" value="07" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- BROADCAST HISTORY (Left Side) --- */}
        <section className="lg:col-span-2 bg-zinc-900/20 border border-zinc-800/50 p-8 rounded-3xl">
          <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">System Broadcasts</h3>
          <div className="space-y-6">
            <LogItem title="Physics Result" status="Published" color="text-sky-400" />
            <LogItem title="Server Sync" status="Success" color="text-emerald-400" />
            <LogItem title="Library Registry" status="Updated" color="text-zinc-400" />
            <LogItem title="New Student Node" status="Pending" color="text-amber-400" />
          </div>
        </section>

        {/* --- ACTIONS PANEL (Right Side) --- */}
        <section className="bg-zinc-100 p-8 rounded-3xl text-black shadow-2xl">
          <h3 className="text-black/30 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Admin Controls</h3>
          <div className="grid grid-cols-1 gap-4">
            <ActionBtn href="/admin/attendance" label="Mark Attendance" icon="✏️" />
            <ActionBtn href="/admin/assignments" label="Create New Assignments" icon="📂" />
            <ActionBtn href="/" label="Portal Settings" icon="⚙️" />
            <ActionBtn href="/" label="Generate Report" icon="📊" />
          </div>
        </section>

      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function StatCard({ label, value }: any) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-2xl hover:bg-zinc-900/60 transition-colors group">
      <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-2 group-hover:text-sky-500 transition-colors">
        {label}
      </p>
      <h3 className="text-4xl font-black text-white">{value}</h3>
    </div>
  );
}

function LogItem({ title, status, color }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-zinc-800/30 last:border-0">
      <span className="text-sm font-bold uppercase tracking-tight text-zinc-300">{title}</span>
      <span className={`text-[9px] font-mono font-black uppercase px-2 py-1 bg-white/5 rounded ${color}`}>
        {status}
      </span>
    </div>
  );
}

function ActionBtn({ label, icon, href }: any) {
  return (
    <Link href={href} className="block w-full group">
      <button className="flex items-center gap-4 bg-white hover:bg-black hover:text-white w-full p-4 rounded-xl transition-all duration-300 font-bold uppercase text-[10px] tracking-widest border border-zinc-200 shadow-sm">
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        {label}
      </button>
    </Link>
  );
}