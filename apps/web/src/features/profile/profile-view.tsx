import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileView() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Account</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Profile</h1>
      </div>
      <section className="glass rounded-lg p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-white/68">Name</span>
            <Input defaultValue="Demo Founder" />
          </label>
          <label>
            <span className="mb-2 block text-sm text-white/68">Email</span>
            <Input defaultValue="demo@taskflow.dev" />
          </label>
        </div>
        <Button className="mt-5">Save profile</Button>
      </section>
    </div>
  );
}
