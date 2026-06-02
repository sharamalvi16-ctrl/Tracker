import { AuthShell } from "@/features/auth/auth-shell";

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <div className="glass w-full max-w-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold">Set new password</h1>
        <p className="mt-3 text-sm text-white/68">Token verification can plug into the existing auth module.</p>
      </div>
    </AuthShell>
  );
}
