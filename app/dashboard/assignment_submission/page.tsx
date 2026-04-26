"use client";
import { useState, useEffect } from "react";
import { client } from "../../lib/sanity";
import Cookies from "js-cookie";

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    const session = Cookies.get("user_session");
    if (session) setUser(JSON.parse(session));

    const fetchTasks = async () => {
      const data = await client.fetch(`*[_type == "assignment"] | order(_createdAt desc)`);
      setAssignments(data);
    };
    fetchTasks();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(title);

    try {
      // 1. File ko Sanity Assets mein upload karna
      const asset = await client.assets.upload('file', file, {
        filename: file.name,
      });

      // 2. Submission document create karna jo student aur assignment ko link kare
      await client.create({
        _type: 'submission',
        studentName: user.name,
        studentId: user.rollNumber,
        assignmentTitle: title,
        fileURL: asset.url,
        attachment: {
          _type: 'file',
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        submittedAt: new Date().toISOString(),
      });

      alert("✅ Assignment Submitted Successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ Submission Failed. Check your Sanity Token permissions.");
    } finally {
      setUploading(null);
    }
  };

  if (!user) return <div className="p-20 text-zinc-500 font-mono animate-pulse">Initializing Portal...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-500 mb-2">Student Node: {user.rollNumber}</h2>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Current <span className="text-zinc-700">Assignments</span>
          </h1>
        </header>

        {/* Assignments Grid */}
        <div className="grid gap-6">
          {assignments.map((task) => (
            <div key={task._id} className="group relative bg-[#0A0A0A] border border-zinc-900 p-20  hover:border-sky-500/50 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-sky-400 transition-colors">{task.title}</h3>
                    
                  </div>
                  <div><span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-3 py-1 ">
                      DUE: {task.dueDate}
                    </span></div>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-xl font-medium">
                    {task.description}
                  </p>
                  
                </div>

                <label className="flex justify-center relative overflow-hidden cursor-pointer bg-white text-black px-20 py-4 rounded-2xl font-black text-[30px]  border border-zinc-900 tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap">
                  {uploading === task.title ? "SYNCING..." : "Submite"}
                  <input type="file" className="hidden" onChange={(e) => handleUpload(e, task.title)} />
                </label>
              </div>
              
            </div>
          ))}
        </div>
         <div>
            <p className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase mb-10"></p>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter"><span className="text-zinc-500"></span></h1>
          </div>
      </div>
      
    </div>
  );
}