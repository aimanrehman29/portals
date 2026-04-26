"use client";
import { client } from "../lib/sanity"; // Apna sahi path check karlein

export default function StudentDashboard() {
  
  // --- YE HAI DELETE KARNE KA TAREKA ---
  const handlePurge = async () => {
    const confirmDelete = confirm("Warning! Kya aap saara purana data delete karna chahti hain?");
    if (!confirmDelete) return;

    try {
      // Is line ka matlab hai: Wo documents dhoondo jinka type 'attendance' ya 'submission' hai aur unhe urra do.
      await client.delete({ query: `*[_type == "professor" && name != "Professor Name"]` });
      
      alert("✅ Shabaash! Data saaf ho gaya.");
      window.location.reload(); // Dashboard refresh ho jayega
    } catch (err) {
      console.error(err);
      alert("❌ Error: Shayad aapka token sahi nahi hai ya permission nahi hai.");
    }
  };

  return (
    <div className="relative">
      {/* --- YE TEMPORARY BUTTON HAI --- */}
      <button 
        onClick={handlePurge}
        className="fixed top-5 right-5 z-[9999] bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-xl border-2 border-white hover:bg-red-800 transition-all"
      >
        🗑️ RESET DATA FOR PRESENTATION
      </button>

     
    </div>
  );
}