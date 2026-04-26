"use client";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";

interface Submission {
  studentName: string;
  studentId: string;
  assignmentTitle: string;
  fileUrl: string;
  submittedAt: string;
}

export default function TeacherPortal() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const data = await client.fetch(`*[_type == "submission"] | order(submittedAt desc) {
        studentName,
        studentId,
        assignmentTitle,
        "fileUrl": attachment.asset->url,
        submittedAt
      }`);
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-10">Student Submissions</h1>
      
      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <table className="w-full text-left bg-zinc-900/50">
          <thead className="bg-zinc-800 text-[10px] uppercase tracking-widest text-zinc-400">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Roll No</th>
              <th className="p-4">Assignment</th>
              <th className="p-4">File</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {submissions.map((sub, i) => (
              <tr key={i} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-all">
                <td className="p-4 font-bold uppercase italic">{sub.studentName}</td>
                <td className="p-4 font-mono text-sky-500">{sub.studentId}</td>
                <td className="p-4 text-zinc-400">{sub.assignmentTitle}</td>
                <td className="p-4">
                  <a 
                    href={sub.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-sky-500/10 text-sky-500 px-4 py-1 rounded-lg border border-sky-500/20 hover:bg-sky-500 hover:text-white transition-all text-xs font-bold"
                  >
                    VIEW DOCUMENT
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}