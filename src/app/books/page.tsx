import type { Metadata } from "next";
import { BooksCatalog } from "@/components/books/books-catalog";

export const metadata: Metadata = { title: "All Books" };

export default function BooksPage() {
  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="site-container">
          <p className="eyebrow light-eyebrow">The community collection</p>
          <h1>Every book opens a door.</h1>
          <p>Browse the complete BookNook shelf and find the story, idea, or adventure waiting for you.</p>
        </div>
      </section>
      <section className="site-container catalog-content"><BooksCatalog /></section>
    </main>
  );
}
