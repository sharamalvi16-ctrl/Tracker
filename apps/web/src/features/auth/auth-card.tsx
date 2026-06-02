"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LockKeyhole, Mail, Rocket, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema, registerSchema } from "@taskflow/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

type AuthValues = {
  name?: string;
  email: string;
  password: string;
};

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const schema = mode === "login" ? loginSchema : registerSchema;
  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: AuthValues) {
    await api.post(`/auth/${mode}`, values);
    toast.success(mode === "login" ? "Welcome back" : "Account launched");
    window.location.href = "/dashboard";
  }

  const password = form.watch("password") ?? "";
  const strength = Math.min(
    100,
    password.length * 8 + (/[A-Z]/.test(password) ? 15 : 0) + (/[0-9]/.test(password) ? 15 : 0),
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="glass w-full max-w-md rounded-lg p-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-cyan-300 text-slate-950">
          <Rocket size={22} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold">{mode === "login" ? "Enter TaskFlow" : "Create TaskFlow account"}</h1>
          <p className="text-sm text-white/58">Secure workspace command center</p>
        </div>
      </div>
      <div className="space-y-4">
        {mode === "register" && (
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
              <User size={16} /> Name
            </span>
            <Input {...form.register("name")} />
          </label>
        )}
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
            <Mail size={16} /> Email
          </span>
          <Input type="email" {...form.register("email")} />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
            <LockKeyhole size={16} /> Password
          </span>
          <div className="relative">
            <Input type="password" {...form.register("password")} />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-white/38" size={17} />
          </div>
        </label>
        {mode === "register" && (
          <div className="h-2 overflow-hidden rounded bg-white/10">
            <div className="h-full bg-cyan-300" style={{ width: `${strength}%` }} />
          </div>
        )}
      </div>
      <Button className="mt-6 w-full" type="submit">
        {mode === "login" ? "Login" : "Register"}
      </Button>
      <div className="mt-5 flex justify-between text-sm text-white/62">
        <Link href="/forgot-password">Forgot password</Link>
        <Link href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create account" : "Login instead"}</Link>
      </div>
    </form>
  );
}
