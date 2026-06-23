"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { Wallet } from "lucide-react";

import { Alert } from "@/components/ui/Alert";
import { ActionButton } from "@/components/ui/ActionButton";
import { Input } from "@/components/ui/Input";
import * as authApi from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { siteConfig } from "@/content/landing";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await authApi.verifyEmail(email, code);
      router.push("/login");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");
    setResending(true);

    try {
      await authApi.resendVerification(email);
      setMessage("A new verification code has been sent to your email.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to resend code");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ED7860] text-white">
            <Wallet className="h-5 w-5" />
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Verify your email</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter the 6-digit code we sent to your inbox
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {error && <Alert message={error} className="mb-5" />}
        {message && (
          <p className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {message}
          </p>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
          <Input
            label="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
          />
        </div>

        <ActionButton type="submit" loading={loading} fullWidth className="mt-6">
          Verify email
        </ActionButton>

        <ActionButton
          type="button"
          variant="secondary"
          loading={resending}
          fullWidth
          className="mt-3"
          onClick={handleResend}
          disabled={!email}
        >
          Resend code
        </ActionButton>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="font-medium text-[#ED7860] hover:text-[#D8654D]">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <Suspense
        fallback={
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ED7860] border-t-transparent" />
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
