import { GalaxyBackground } from "@/components/galaxy/galaxy-background";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 text-white">
      <GalaxyBackground />
      {children}
    </main>
  );
}
