"use client";
import { useAuth } from "../context/PortalContext";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";

export default function AdminPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ students: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const studentCount = await client.fetch(`count(*[_type == "student" && role == "student"])`);
      setStats({ students: studentCount });
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Header with better spacing */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-sky-500 text-[10px] font-black px-3 py-1 rounded-full text-black uppercase tracking-tighter">
              Authorized
            </span>
            <span className="text-zinc-600 text-[10px] font-mono tracking-[0.3em] uppercase">
              Node ID: {user?.rollNumber || "T-101"}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Welcome, <span className="text-sky-500 underline decoration-zinc-800 underline-offset-8">Prof.Pinhaan</span>
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em] font-bold mb-1">System Status</p>
          <p className="text-emerald-500 text-xs font-mono uppercase tracking-widest animate-pulse">● Secure Connection</p>
        </div>
      </header>

      {/* Grid with Gap fixing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatBox label="Total Students" value={stats.students} />
        <StatBox label="Attendance Rate" value="92%" />
        <StatBox label="Active Assignments" value="07" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Broadcast Feed */}
        <section className="bg-zinc-900/20 border border-zinc-800/40 p-10 rounded-[3rem]">
           <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Broadcast History</h3>
           <div className="space-y-8">
              <LogItem title="Physics Result" status="Published" />
              <LogItem title="Server Sync" status="Completed" />
              <LogItem title="New Student" status="Pending" />
           </div>
        </section>

        {/* Action Panel */}
        <section className="bg-white rounded-[3rem] p-10 text-black">
           <h3 className="text-black/30 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Administrative Actions</h3>
           <div className="grid grid-cols-2 gap-4">
              <AdminBtn label="Mark Attendance" icon="✏️" />
              <AdminBtn label="Create Task" icon="📂" />
              <AdminBtn label="Export Data" icon="📊" />
              <AdminBtn label="Settings" icon="⚙️" />
           </div>
        </section>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function StatBox({ label, value }: any) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:border-sky-500/50 transition-all">
      <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-2">{label}</p>
      <h3 className="text-4xl font-black">{value}</h3>
    </div>
  );
}

function LogItem({ title, status }: any) {
  return (
    <div className="flex justify-between border-b border-zinc-800/50 pb-4">
      <span className="text-sm font-bold uppercase">{title}</span>
      <span className="text-[10px] font-mono text-sky-500">{status}</span>
    </div>
  );
}

function AdminBtn({ label, icon }: any) {
  return (
    <button className="flex items-center gap-3 bg-zinc-100 hover:bg-sky-500 hover:text-white p-5 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest">
      <span>{icon}</span> {label}
    </button>
  );
}