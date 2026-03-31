"use client";
import { useState } from "react";
import { client } from "../../lib/sanity";

export default function CreateAssignment() {
  const [formData, setFormData] = useState({ title: "", date: "", desc: "" });

  const postAssignment = async () => {
    if (!formData.title || !formData.date) return alert("Fill all fields");
    
    await client.create({
      _type: "assignment",
      title: formData.title,
      dueDate: formData.date,
      description: formData.desc,
    });
    alert("Assignment Posted to Student Portals!");
    setFormData({ title: "", date: "", desc: "" });
  };

  return (
    <div className="p-8 bg-black text-white max-w-2xl">
      <h1 className="text-4xl font-black italic uppercase mb-10 tracking-tighter">
        Create <span className="text-sky-500">Assignment</span>
      </h1>

      <div className="space-y-6 bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900">
        <input 
          placeholder="Assignment Title"
          className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-sky-500"
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          value={formData.title}
        />
        <input 
          type="date"
          className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-sky-500"
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          value={formData.date}
        />
        <textarea 
          placeholder="Brief instructions..."
          className="w-full bg-black border border-zinc-800 p-4 rounded-xl h-32 outline-none focus:border-sky-500"
          onChange={(e) => setFormData({...formData, desc: e.target.value})}
          value={formData.desc}
        />
        <button 
          onClick={postAssignment}
          className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-sky-500 hover:text-white transition-all uppercase text-xs tracking-widest"
        >
          Push to Students
        </button>
      </div>
    </div>
  );
}