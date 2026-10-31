"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Book = { _id: string; title: string; author: string; category: string; image: string; availableCopies?: number };
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    async function loadBooks() {
      try {
        const response = await fetch(`${apiUrl}/books?limit=6`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load new arrivals");
        const payload = await response.json();
        setBooks(payload.data ?? []);
        setStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      }
    }
    loadBooks();
    return () => controller.abort();
  }, []);

  return (
    <section className="home-section arrivals-section">
      <div className="site-container">
        <div className="section-heading heading-row">
          <div><p className="eyebrow">Fresh on the shelf</p><h2>New arrivals</h2><p>The latest books shared by readers in the BookNook community.</p></div>
          <Link className="outline-button" href="/books">See all books <span aria-hidden="true">→</span></Link>
        </div>
        {status === "loading" && <div className="loading-state" role="status"><span className="spinner" /> Loading new arrivals…</div>}
        {status === "error" && <div className="message-state" role="alert">New arrivals are taking a little longer to reach the shelf.</div>}
        {status === "ready" && books.length === 0 && <div className="message-state">The shelf is ready for its first book.</div>}
        {status === "ready" && books.length > 0 && (
          <div className="books-grid">
            {books.map((book) => (
              <article className="book-card" key={book._id}>
                <div className="book-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={book.image} alt={`Cover of ${book.title}`} /><span>{book.category}</span>
                </div>
                <div className="book-card-body">
                  <p>{book.author}</p><h3>{book.title}</h3>
                  <div className="book-card-footer"><span>{book.availableCopies ?? 0} available</span><Link href={`/books/${book._id}`}>View details <span aria-hidden="true">→</span></Link></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
