"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Wallet } from "lucide-react";

import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { Input } from "@/components/ui/Input";
import * as authApi from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { siteConfig } from "@/content/landing";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ED7860] text-white">
              <Wallet className="h-5 w-5" />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">Forgot password?</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we&apos;ll send a reset code
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && <Alert message={error} className="mb-5" />}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <ActionButton type="submit" loading={loading} fullWidth className="mt-6">
            Send reset code
          </ActionButton>

          <p className="mt-5 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-[#ED7860] hover:text-[#D8654D]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
