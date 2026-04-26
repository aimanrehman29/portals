"use client";
import { useState, useEffect } from "react";
import { client } from "../../lib/sanity";
import Cookies from "js-cookie";

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState<string | null>(null); // Track specific assignment upload

  useEffect(() => {
    const session = Cookies.get("user_session");
    if (session) setUser(JSON.parse(session));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, assignmentTitle: string) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(assignmentTitle);

    try {
      // Step 1: Upload file to Sanity Assets
      const asset = await client.assets.upload('file', file, {
        filename: file.name,
      });

      // Step 2: Create Submission Document
      await client.create({
        _type: 'submission',
        studentName: user.name,
        studentId: user.rollNumber,
        assignmentTitle: assignmentTitle,
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
      alert("❌ Upload Failed. Check your Sanity API Permissions.");
    } finally {
      setUploading(null);
    }
  };

  if (!user) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black italic uppercase mb-10">Assignments</h1>
      
      <div className="grid gap-4">
        {/* Example Assignment Card */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg uppercase italic">Next.js Project V1</h3>
            <p className="text-xs text-zinc-500 uppercase">Formats: PDF, PNG, JPG</p>
          </div>
          
          <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-xl font-black text-xs hover:bg-sky-500 transition-all">
            {uploading === "Next.js Project V1" ? "UPLOADING..." : "SELECT & SUBMIT"}
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.png,.jpg,.jpeg" 
              onChange={(e) => handleFileChange(e, "Next.js Project V1")}
              disabled={uploading !== null}
            />
          </label>
        </div>
      </div>
    </div>
  );
}