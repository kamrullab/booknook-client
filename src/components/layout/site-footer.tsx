import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">B</span>
            <span>BookNook</span>
          </Link>
          <p className="footer-intro">
            A welcoming online shelf where readers share books and stories find their next home.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <address className="footer-links">
            <a href="mailto:hello@booknook.example">hello@booknook.example</a>
            <a href="tel:+8801700000000">+880 1700-000000</a>
            <span>Dhaka, Bangladesh</span>
          </address>
        </div>

        <div>
          <h2>Follow the shelf</h2>
          <div className="social-links" aria-label="Social media links">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} BookNook. Made for readers, by readers.</p>
      </div>
    </footer>
  );
}
