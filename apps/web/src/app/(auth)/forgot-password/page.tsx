import { AuthShell } from "@/features/auth/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <div className="glass w-full max-w-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold">Recover access</h1>
        <p className="mt-3 text-sm text-white/68">Password reset email wiring is ready for your email provider.</p>
      </div>
    </AuthShell>
  );
}
