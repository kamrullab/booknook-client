import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return <main className="auth-page"><Suspense fallback={<div className="auth-card">Loading…</div>}><AuthForm mode="register" /></Suspense></main>;
}
