"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/auth-client";

type AuthMode = "login" | "register";

function safeDestination(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function passwordError(password: string) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  return null;
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const isRegister = mode === "register";
  const destination = safeDestination(searchParams.get("callbackUrl"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    if (isRegister) {
      const validationError = passwordError(password);
      if (validationError) {
        setFieldError(validationError);
        return;
      }
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        const result = await signUp.email({
          name: String(form.get("name") ?? "").trim(),
          email,
          password,
          image: String(form.get("image") ?? "").trim(),
        });
        if (result.error) throw new Error(result.error.message ?? "Registration failed");
        toast.success("Account created. You can now log in.");
        router.push(`/login${destination !== "/" ? `?callbackUrl=${encodeURIComponent(destination)}` : ""}`);
      } else {
        const result = await signIn.email({ email, password, callbackURL: destination });
        if (result.error) throw new Error(result.error.message ?? "Login failed");
        toast.success("Welcome back to BookNook.");
        router.push(destination);
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setFieldError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true);
    setFieldError(null);
    const callbackURL = isRegister ? "/" : destination;
    const result = await signIn.social({ provider: "google", callbackURL });
    if (result?.error) {
      const message = result.error.message ?? "Google sign-in is not available.";
      setFieldError(message);
      toast.error(message);
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card card">
      <div className="auth-heading">
        <p className="eyebrow">{isRegister ? "Join the community" : "Welcome back"}</p>
        <h1>{isRegister ? "Create your reader account" : "Return to your shelf"}</h1>
        <p>{isRegister ? "Share favorites and borrow your next great read." : "Log in to borrow, add, and manage books."}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <>
            <label htmlFor="name">Name</label>
            <input className="input" id="name" name="name" type="text" autoComplete="name" minLength={2} required />
            <label htmlFor="image">Photo URL</label>
            <input className="input" id="image" name="image" type="url" autoComplete="url" placeholder="https://example.com/photo.jpg" required />
          </>
        )}
        <label htmlFor="email">Email address</label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" required />
        <div className="password-label"><label htmlFor="password">Password</label>{!isRegister && <span>Forgot password is disabled</span>}</div>
        <input className="input" id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={6} required />
        {isRegister && <p className="password-hint">Use at least 6 characters with uppercase and lowercase letters.</p>}
        {fieldError && <p className="form-error" role="alert">{fieldError}</p>}
        <button className="button btn auth-submit" type="submit" disabled={submitting}>
          {submitting ? "Please wait…" : isRegister ? "Create account" : "Log in"}
        </button>
      </form>

      <div className="auth-divider"><span>or continue with</span></div>
      <button className="google-button btn" type="button" onClick={handleGoogleLogin} disabled={submitting}>
        <span aria-hidden="true">G</span> Google
      </button>
      <p className="auth-switch">
        {isRegister ? "Already have an account?" : "New to BookNook?"}{" "}
        <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Log in" : "Create an account"}</Link>
      </p>
    </div>
  );
}
