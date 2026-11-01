import type { Metadata } from "next";
import { AddBookForm } from "@/components/books/add-book-form";

export const metadata: Metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <main className="form-page">
      <div className="site-container narrow-container">
        <div className="section-heading form-page-heading"><p className="eyebrow">Share from your shelf</p><h1>Add a book</h1><p>Introduce the BookNook community to a title worth discovering.</p></div>
        <AddBookForm />
      </div>
    </main>
  );
}
