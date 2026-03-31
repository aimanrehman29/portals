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
    <aside className="w-64 min-h-screen bg-black border-r border-zinc-900 p-6 flex flex-col">
      <div className="mb-10">
        <h2 className="text-xl font-black tracking-tighter text-white uppercase">KUPORTAL</h2>
        <p className="text-[10px] text-sky-500 tracking-widest font-bold">STUDENT NODE</p>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarLink href="/dashboard" label="My Overview" icon="🏠" />
        <SidebarLink href="/dashboard/courses" label="My Courses" icon="📚" />
        <SidebarLink href="/dashboard/grades" label="Result Card" icon="🎓" />
        <SidebarLink href="/dashboard/profile" label="Profile Settings" icon="⚙️" />
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
