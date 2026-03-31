import StudentSidebar from "../components/StudentSidebar"; // Adjust path as needed

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <StudentSidebar /> 
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}