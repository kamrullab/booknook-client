import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/profile");

  return <main className="auth-page"><Suspense fallback={<div className="auth-card">Loading…</div>}><AuthForm mode="register" /></Suspense></main>;
}
