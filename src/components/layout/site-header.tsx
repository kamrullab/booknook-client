"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme/theme-toggle";

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

type HeaderUser = {
  name: string;
  email: string;
  image?: string | null;
};

export function SiteHeader({ initialUser }: { initialUser?: HeaderUser }) {
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const profileMenuRef = useRef<HTMLDetailsElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => undefined, () => true, () => false);
  const { data: session, isPending } = useSession();
  const accountPending = !mounted || isPending;
  const user = session?.user ?? (accountPending ? initialUser : undefined);
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  function closeMobileMenu() {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
    setMobileMenuOpen(false);
  }

  function closeProfileMenu() {
    if (profileMenuRef.current) profileMenuRef.current.open = false;
    setProfileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!mobileMenuRef.current?.contains(event.target as Node)) closeMobileMenu();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileMenu();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!profileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!profileMenuRef.current?.contains(event.target as Node)) closeProfileMenu();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeProfileMenu();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMenuOpen]);

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
          <ThemeToggle />
          {accountPending && !user ? (
            <span className="session-placeholder" aria-label="Loading account" />
          ) : user ? (
            <details ref={profileMenuRef} className="profile-menu" onToggle={(event) => setProfileMenuOpen(event.currentTarget.open)}>
              <summary aria-label={profileMenuOpen ? "Close account menu" : `Open account menu for ${user.name}`} aria-expanded={profileMenuOpen}>
                <UserAvatar image={user.image} name={user.name} />
              </summary>
              <div className="profile-popover">
                <div className="profile-identity"><strong>{user.name}</strong><span>{user.email}</span></div>
                <Link href="/profile" onClick={closeProfileMenu}>My Profile</Link>
                <button type="button" onClick={handleLogout}>Log out</button>
              </div>
            </details>
          ) : (
            <><Link className="text-button" href="/login">Log in</Link><Link className="button button-small" href="/register">Join BookNook</Link></>
          )}
        </div>

        <details ref={mobileMenuRef} className="mobile-menu" onToggle={(event) => setMobileMenuOpen(event.currentTarget.open)}>
          <summary aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen}><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            <div className="mobile-theme"><ThemeToggle /></div>
            {links.map((link) => <Link key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</Link>)}
            {user ? (
              <><div className="mobile-user"><UserAvatar image={user.image} name={user.name} /><span><strong>{user.name}</strong><small>{user.email}</small></span></div><Link href="/profile" onClick={closeMobileMenu}>My Profile</Link><button type="button" onClick={handleLogout}>Log out</button></>
            ) : accountPending ? (
              <span className="session-placeholder" aria-label="Loading account" />
            ) : (
              <><Link href="/login" onClick={closeMobileMenu}>Log in</Link><Link className="button button-small" href="/register" onClick={closeMobileMenu}>Join BookNook</Link></>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
