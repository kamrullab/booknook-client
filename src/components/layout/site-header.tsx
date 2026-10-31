import Link from "next/link";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="BookNook home">
      <span className="brand-mark" aria-hidden="true">B</span>
      <span>BookNook</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="desktop-actions">
          <Link className="text-button" href="/login">Log in</Link>
          <Link className="button button-small" href="/register">Join BookNook</Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            {publicLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
            <Link href="/login">Log in</Link>
            <Link className="button button-small" href="/register">Join BookNook</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
