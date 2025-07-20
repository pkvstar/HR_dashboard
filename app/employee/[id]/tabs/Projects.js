import { FolderClosed } from 'lucide-react';
export default function Projects() {
  const mockProjects = [
    { name: "Dashboard Redesign", status: "Completed" },
    { name: "API Integration", status: "In Progress" },
    { name: "Internal Tooling", status: "Completed" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 flex gap-1"><FolderClosed /> Projects</h3>
      <ul className="space-y-2">
        {mockProjects.map((p, idx) => (
          <li key={idx} className={`${p.status==='Completed' ? 'bg-green-400' : 'bg-yellow-400'} p-3 shadow rounded-md`}>
            <p><strong>{p.name}</strong></p>
            <p className="text-sm text-black font-bold">Status: {p.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
