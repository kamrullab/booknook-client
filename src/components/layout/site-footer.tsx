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
            <a href="mailto:hello@booknookbd.com">hello@booknookbd.com</a>
            <a href="tel:+8801700123456">+880 1700-123456</a>
            <span>Dhanmondi, Dhaka, Bangladesh</span>
          </address>
        </div>

        <div>
          <h2>Follow the shelf</h2>
          <div className="social-links" aria-label="Social media links">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" /></svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM18.5 6.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.3L2.8 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} BookNook. Made for readers, by readers.</p>
      </div>
    </footer>
  );
}
