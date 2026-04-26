"use client";
import { useState, useEffect } from "react";
import { client } from "../../lib/sanity";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  // Sirf wo dikhao jinka roll number 'st' se start hota hai
  client
    .fetch(`*[_type == "student" && rollNumber match "st*"]{_id, name, rollNumber}`)
    .then(setStudents);
}, []);

  const handleAttendance = async (studentId: string, status: string) => {
    setLoading(true);
    try {
      await client.create({
        _type: "attendance",
        studentId,
        status,
        date: new Date().toISOString().split('T')[0],
      });
      alert(`Marked ${status} successfully!`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-10 tracking-tighter">
        Daily <span className="text-sky-500">Attendance</span>
      </h1>
      
      <div className="grid gap-4">
        {students.map((s: any) => (
          <div key={s._id} className="bg-zinc-900/50 p-6 rounded-2xl flex justify-between items-center border border-zinc-800">
            <div>
              <p className="font-bold uppercase h1 tracking-tight">STUDENT</p>
              <p className="font-bold uppercase tracking-tight">{s.name}</p>
              <p className="text-[10px] text-zinc-500 font-mono">{s.rollNumber}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAttendance(s.rollNumber, "Present")}
                className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-black transition-all"
              >
                Present
              </button>
              <button 
                onClick={() => handleAttendance(s.rollNumber, "Absent")}
                className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-red-500 hover:text-black transition-all"
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}