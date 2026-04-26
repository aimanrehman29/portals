import TeacherSidebar from "../components/TeacherSidebar";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    // "flex" ensures items sit side-by-side
    <div className="flex min-h-screen bg-black overflow-hidden">
      
      {/* 1. SIDEBAR: Fixed width, doesn't shrink */}
      <aside className="w-64 flex-shrink-0  bg-zinc-950 z-50">
        <TeacherSidebar />
      </aside>

      {/* 2. MAIN CONTENT: Fills remaining space, adds its own scrollbar if needed */}
      <main className="flex-1 h-screen overflow-y-auto bg-black p-8 md:p-12">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}