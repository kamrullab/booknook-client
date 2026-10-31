import Link from "next/link";

export type BookSummary = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  availableCopies?: number;
};

export function BookCard({ book }: { book: BookSummary }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {/* Covers use the assignment-approved external image provider. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt={`Cover of ${book.title}`} />
        <span>{book.category}</span>
      </div>
      <div className="book-card-body">
        <p>{book.author}</p>
        <h3>{book.title}</h3>
        <div className="book-card-footer">
          <span>{book.availableCopies ?? 0} available</span>
          <Link href={`/books/${book._id}`}>View details <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
