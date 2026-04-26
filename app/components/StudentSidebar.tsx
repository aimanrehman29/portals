"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function StudentSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("user_session");
    router.push("/");
  };

  return (
    <aside className="  bg-black  p-40 flex flex-col w-[200px] h-screen">
      <div className="mb-20">
        <h2 className="text-xl font-black tracking-tighter text-white uppercase">KUPORTAL</h2>
        <p className="text-[10px] text-sky-500 tracking-widest font-bold">STUDENT NODE</p>
      </div>

   <nav className="flex-1 px-20 space-y-3 mt-50 text-[25px] text-sky-500 tracking-widest font-bold hover:text-sky-400 transition-colors">
  
  
  <SidebarLink 
    href="/dashboard" 
    label="My Overview" 
    icon="🏠" 
  />
  
  <SidebarLink 
    href="/dashboard/assignment_submission" 
    label="Assignments" 
    icon="📚" 
  />
  

  
  <SidebarLink 
    href="/dashboard/profile" 
    label="Settings" 
    icon="⚙️" 
  />
</nav>

      <button 
        onClick={handleLogout}
        className="mt-auto w-full py-3 bg-zinc-900 text-zinc-500 rounded-xl hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em]"
      >
        Logout
      </button>
    </aside>
  );
}

function SidebarLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition-all text-sm font-medium text-zinc-500">
      <span className="grayscale group-hover:grayscale-0">{icon}</span>
      {label}
    </Link>
  );
}
