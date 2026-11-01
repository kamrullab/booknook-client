import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-art" aria-hidden="true"><span>4</span><div>📖</div><span>4</span></div>
      <p className="eyebrow">Page not found</p>
      <h1>This story is not on our shelf.</h1>
      <p>The page may have moved, or the link might be pointing to a chapter that does not exist.</p>
      <div className="not-found-actions"><Link className="button" href="/">Back to Home</Link><Link className="outline-button" href="/books">Browse Books</Link></div>
    </main>
  );
}
