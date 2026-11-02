import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/profile");

  return <main className="auth-page"><Suspense fallback={<div className="auth-card">Loading…</div>}><AuthForm mode="login" /></Suspense></main>;
}
