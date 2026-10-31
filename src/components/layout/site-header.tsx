"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="BookNook home">
      <span className="brand-mark" aria-hidden="true">B</span>
      <span>BookNook</span>
    </Link>
  );
}

function UserAvatar({ image, name }: { image?: string | null; name: string }) {
  if (image) {
    // User profile images may be hosted on any provider accepted by Better Auth.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" referrerPolicy="no-referrer" />;
  }

  return <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>;
}

export function SiteHeader() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  async function handleLogout() {
    const result = await signOut();
    if (result.error) {
      toast.error(result.error.message ?? "Unable to log out.");
      return;
    }
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="desktop-actions">
          {isPending ? (
            <span className="session-skeleton" aria-label="Loading account" />
          ) : user ? (
            <details className="profile-menu">
              <summary aria-label={`Open account menu for ${user.name}`}>
                <UserAvatar image={user.image} name={user.name} />
              </summary>
              <div className="profile-popover">
                <div className="profile-identity"><strong>{user.name}</strong><span>{user.email}</span></div>
                <Link href="/profile">My Profile</Link>
                <button type="button" onClick={handleLogout}>Log out</button>
              </div>
            </details>
          ) : (
            <><Link className="text-button" href="/login">Log in</Link><Link className="button button-small" href="/register">Join BookNook</Link></>
          )}
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            {user ? (
              <><div className="mobile-user"><UserAvatar image={user.image} name={user.name} /><span><strong>{user.name}</strong><small>{user.email}</small></span></div><Link href="/profile">My Profile</Link><button type="button" onClick={handleLogout}>Log out</button></>
            ) : (
              <><Link href="/login">Log in</Link><Link className="button button-small" href="/register">Join BookNook</Link></>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
