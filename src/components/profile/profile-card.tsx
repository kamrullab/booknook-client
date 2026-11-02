"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, signOut, useSession } from "@/lib/auth-client";

export function ProfileCard() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  async function logout() {
    const result = await signOut();
    if (result.error) {
      toast.error(result.error.message ?? "Unable to log out.");
      return;
    }
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const image = String(form.get("image") ?? "").trim();

    if (name.length < 2) {
      toast.error("Please enter a name with at least 2 characters.");
      return;
    }

    setSaving(true);
    const result = await authClient.updateUser({ name, image: image || null });
    setSaving(false);
    if (result.error) {
      toast.error(result.error.message ?? "Unable to update your profile.");
      return;
    }

    await refetch();
    setEditing(false);
    toast.success("Profile updated.");
    router.refresh();
  }

  if (isPending) return <div className="loading-state"><span className="spinner" /> Loading your profile…</div>;
  if (!session) return <div className="message-state">Your session has expired. Please log in again.</div>;

  const { user } = session;
  return (
    <section className="profile-card">
      <div className="profile-banner" />
      <div className="profile-main">
        <div className="profile-avatar">
          {user.image ? <img src={user.image} alt={`${user.name}'s profile`} referrerPolicy="no-referrer" /> : <span>{user.name.charAt(0).toUpperCase()}</span>}
        </div>
        <div className="profile-title"><p className="eyebrow">BookNook reader</p><h1>{user.name}</h1><p>{user.email}</p></div>
        <div className="profile-actions">
          <button className="profile-edit" type="button" onClick={() => setEditing((value) => !value)}>{editing ? "Cancel edit" : "Edit profile"}</button>
          <button className="profile-logout" type="button" onClick={logout}>Log out</button>
        </div>
      </div>

      {editing && (
        <form className="profile-edit-form" onSubmit={updateProfile}>
          <label><span>Display name</span><input name="name" defaultValue={user.name} required minLength={2} /></label>
          <label><span>Photo URL</span><input name="image" type="url" defaultValue={user.image ?? ""} placeholder="https://example.com/photo.jpg" /></label>
          <button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
        </form>
      )}

      <div className="profile-details"><div><span>Name</span><strong>{user.name}</strong></div><div><span>Email address</span><strong>{user.email}</strong></div><div><span>Email status</span><strong>{user.emailVerified ? "Verified" : "Verification not required"}</strong></div><div><span>Member since</span><strong>{new Intl.DateTimeFormat("en-BD", { month: "long", year: "numeric" }).format(new Date(user.createdAt))}</strong></div></div>
      <div className="profile-shortcuts"><Link href="/my-books"><span>▤</span><strong>My Books</strong><small>Manage books you shared</small></Link><Link href="/my-borrows"><span>◫</span><strong>My Borrows</strong><small>View your reading shelf</small></Link><Link href="/add-book"><span>＋</span><strong>Add Book</strong><small>Share another favorite</small></Link></div>
    </section>
  );
}
