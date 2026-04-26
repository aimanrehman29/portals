"use client";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import Cookies from "js-cookie";

export default function StudentDashboard() {
  const [attendance, setAttendance] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      // 1. Get user data from Cookie
      const session = Cookies.get("user_session");
      if (!session) return;
      const currentUser = JSON.parse(session);
      setUser(currentUser);

      // 2. Use the user's ID (rollNumber) to fetch THEIR attendance only
      // Note: We use rollNumber instead of studentName because names can be identical
      const attenData = await client.fetch(
        `*[_type == "attendance" && studentId == $id]`, 
        { id: currentUser.rollNumber }
      );

      const assignData = await client.fetch(`*[_type == "assignment"] | order(_createdAt desc)`);
      
      const presentCount = attenData.filter((a: any) => a.status === 'Present').length;
      const totalDays = attenData.length || 1;
      
      setAttendance(Math.round((presentCount / totalDays) * 100));
      setTasks(assignData);
    };

    loadData();
  }, []);

  if (!user) return <div className="p-20 text-white font-mono">INITIALIZING TERMINAL...</div>;

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">Overview</h1>
        {/* Dynamic Name instead of hardcoded Ayman */}
        <p className="text-zinc-500 font-medium">Welcome back, {user.name}. Here is your academic status.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/5 text-center shadow-2xl shadow-sky-500/5">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Live Attendance</p>
          <h2 className="text-7xl font-black text-sky-400">{attendance}%</h2>
          <p className="text-xs text-zinc-600 mt-2 uppercase tracking-tighter font-bold">Roll No: {user.rollNumber}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-l-4 border-sky-500 pl-4 uppercase tracking-tight">Active Assignments</h2>
        <div className="grid gap-4">
          {tasks.length > 0 ? tasks.map((t: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-sky-500/50 transition-all">
              <div>
                <h3 className="text-lg font-bold group-hover:text-sky-400 uppercase italic">{t.title}</h3>
                <p className="text-xs text-zinc-500 uppercase mt-1">Due: {t.dueDate}</p>
              </div>
               <button className="bg-white text-black px-6 py-2 rounded-xl font-black text-xs hover:bg-sky-500 transition-colors uppercase">
                  <a href="/dashboard/assignment_submission">Submit</a>
                </button>
            </div>
          )) : (
            <p className="text-zinc-700 text-sm italic">No active assignments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}