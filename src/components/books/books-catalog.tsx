"use client";

import { FormEvent, useEffect, useState } from "react";
import { BookCard, BookSummary } from "./book-card";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function BooksCatalog() {
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ limit: "100" });
    if (category !== "All") params.set("category", category);
    if (query) params.set("search", query);

    fetch(`${apiUrl}/books?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load books");
        return response.json();
      })
      .then((payload) => {
        setBooks(payload.data ?? []);
        setStatus("ready");
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [category, query]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const nextQuery = search.trim();
    if (nextQuery === query) return;
    setStatus("loading");
    setQuery(nextQuery);
  }

  function selectCategory(item: string) {
    if (item === category) return;
    setStatus("loading");
    setCategory(item);
  }

  return (
    <>
      <div className="catalog-tools">
        <form className="catalog-search" onSubmit={submitSearch} role="search">
          <label className="sr-only" htmlFor="book-search">Search books</label>
          <input id="book-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title or author" maxLength={100} />
          <button className="button" type="submit">Search</button>
        </form>
        <div className="category-tabs" aria-label="Filter books by category">
          {categories.map((item) => (
            <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => selectCategory(item)} aria-pressed={category === item}>{item}</button>
          ))}
        </div>
      </div>

      {status === "loading" && <div className="loading-state" role="status"><span className="spinner" /> Loading the library…</div>}
      {status === "error" && <div className="message-state" role="alert">The library could not be loaded. Please try again shortly.</div>}
      {status === "ready" && books.length === 0 && <div className="message-state">No books match this search yet.</div>}
      {status === "ready" && books.length > 0 && <div className="books-grid">{books.map((book) => <BookCard book={book} key={book._id} />)}</div>}
    </>
  );
}
