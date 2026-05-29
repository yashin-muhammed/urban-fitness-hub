import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">General site preferences.</p>
      </div>
      <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <Field label="Site name"><Input defaultValue="Urban Fitness Cart" /></Field>
        <Field label="Tagline"><Input defaultValue="Honest reviews of fitness gear, gadgets and home gyms." /></Field>
        <Field label="Default meta description">
          <Textarea defaultValue="Independent reviews and the latest fitness news from the UAE." />
        </Field>
        <div className="pt-2"><Button>Save changes</Button></div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
