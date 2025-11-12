"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6">
        <a href="/dashboard">Dashboard</a>
      </h2>
      <nav className="flex flex-col gap-3">
        <a href="/dashboard/projects">Projects</a>
        <a href="/dashboard/blogs">Blogs</a>
        <a href="/dashboard/messages">Messages</a>
      </nav>
    </aside>
  );
}
