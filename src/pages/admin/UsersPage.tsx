import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Layla Hassan", role: "Super Admin", email: "layla@ufc.ae" },
  { name: "Omar Khalid", role: "Content Admin", email: "omar@ufc.ae" },
  { name: "Sara Mansour", role: "Editor", email: "sara@ufc.ae" },
  { name: "Yousef Ali", role: "Editor", email: "yousef@ufc.ae" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">Manage who can publish content.</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Invite member</Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Member</th>
              <th className="px-5 py-3 text-left font-semibold">Email</th>
              <th className="px-5 py-3 text-left font-semibold">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {team.map((m) => (
              <tr key={m.email}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
                      {m.name.split(" ").map((s) => s[0]).join("")}
                    </span>
                    <span className="font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold">{m.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
