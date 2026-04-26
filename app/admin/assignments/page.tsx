"use client";
import { useState, useEffect } from "react";
import { client } from "../../lib/sanity";
import Link from "next/link";

export default function CreateAssignment() {
  const [formData, setFormData] = useState({ title: "", date: "", desc: "" });
  const [assignments, setAssignments] = useState<any[]>([]); // TypeScript error fix

  const fetchAssignments = async () => {
    const data = await client.fetch(`*[_type == "assignment"] | order(_createdAt desc)`);
    setAssignments(data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const postAssignment = async () => {
    if (!formData.title || !formData.date) return alert("Please fill all fields");
    try {
      await client.create({
        _type: "assignment",
        title: formData.title,
        dueDate: formData.date,
        description: formData.desc,
      });
      alert("Success! Task Pushed.");
      setFormData({ title: "", date: "", desc: "" });
      fetchAssignments();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
          <div>
            <p className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase mb-2"></p>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter"><span className="text-zinc-500"></span></h1>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: CREATE FORM (Span 5) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="shadow-2xl">
              <h2 className="text-xs flex justify-center font-bold text-zinc-500 uppercase tracking-widest mb-6">Assignment</h2>
              
              <div className="space-y-5">
                <div className="group">
                  <label className="text-[9px] font-black uppercase text-zinc-600 ml-1 mb-1 block group-focus-within:text-sky-500 transition-colors">Assignment Title</label>
                  <input 
                    placeholder="e.g. Database Normalization" 
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-sky-500 text-sm transition-all text-white"
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    value={formData.title}
                  />
                </div>

                <div className="group">
                  <label className="text-[9px] font-black uppercase text-zinc-600 ml-1 mb-1 block group-focus-within:text-sky-500 transition-colors">Submission Deadline</label>
                  <input 
                    type="date" 
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-sky-500 text-sm text-zinc-400"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    value={formData.date}
                  />
                </div>

                <div className="group">
                  <label className="text-[9px] font-black uppercase text-zinc-600 ml-1 mb-1 block group-focus-within:text-sky-500 transition-colors">Instructions</label>
                  <textarea 
                    placeholder="Briefly explain the task..." 
                    className="w-full bg-black border border-zinc-800 p-4 rounded-xl h-32 outline-none focus:border-sky-500 text-sm resize-none text-white"
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                    value={formData.desc}
                  />
                </div>

                <button 
                  onClick={postAssignment}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-sky-500 hover:text-white transition-all uppercase text-[11px] tracking-widest mt-4 shadow-lg active:scale-95"
                >
                  Push to Students
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT: HISTORY (Span 7) */}
          <section className="lg:col-span-8">
             <div>
             <p className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase mb-2"></p>
             <h1 className="text-5xl font-black uppercase italic tracking-tighter"><span className="text-zinc-500"></span></h1>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase italic text-zinc-700 tracking-tighter">Active Assignment</h2>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Total: {assignments.length}</span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {assignments.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-3xl p-20 text-center">
                  <p className="text-zinc-700 text-xs font-mono uppercase tracking-widest italic">No assignments found.</p>
                </div>
              ) : (
                assignments.map((task) => (
                  <div key={task._id} className="bg-zinc-900/20 border border-zinc-800 p-6 rounded-2xl group hover:border-sky-500/30 transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-base uppercase text-zinc-300 leading-tight group-hover:text-white transition-colors">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[9px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">DUE: {task.dueDate}</span>
                        </div>
                      </div>
                      
                      <Link href="/admin/submissions">
                        <button className="text-[10px] font-black uppercase bg-zinc-800 text-zinc-400 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all border border-zinc-700">
                          Submissions
                        </button>
                      </Link>
                    </div>
                    {task.description && (
                      <p className="text-[11px] text-zinc-600 mt-4 line-clamp-2 italic leading-relaxed border-t border-zinc-800/50 pt-3">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}