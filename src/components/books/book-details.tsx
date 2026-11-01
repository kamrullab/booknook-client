"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: { name: string; email: string };
};

type ApiResponse<T> = { success: true; data: T; message?: string };

export function BookDetails({ id }: { id: string }) {
  const { data: session } = useSession();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<ApiResponse<Book>>(`/books/${id}`, { signal: controller.signal })
      .then((response) => { setBook(response.data); setStatus("ready"); })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });
    return () => controller.abort();
  }, [id]);

  async function confirmBorrow() {
    if (!book) return;
    setBorrowing(true);
    try {
      await apiRequest("/borrows", {
        method: "POST",
        authenticated: true,
        body: JSON.stringify({ bookId: book._id }),
      });
      setBook((current) => current ? { ...current, availableCopies: current.availableCopies - 1 } : current);
      dialogRef.current?.close();
      toast.success(`“${book.title}” is now on your borrowed shelf.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "This book could not be borrowed.");
    } finally {
      setBorrowing(false);
    }
  }

  if (status === "loading") return <div className="details-state" role="status"><span className="spinner" /> Loading book details…</div>;
  if (status === "error" || !book) return <div className="details-state" role="alert">This book could not be found on the shelf.</div>;

  const unavailable = book.availableCopies < 1;

  return (
    <>
      <article className="details-card">
        <div className="details-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={`Cover of ${book.title}`} />
        </div>
        <div className="details-copy">
          <p className="eyebrow">{book.category}</p>
          <h1>{book.title}</h1>
          <p className="details-author">by {book.author}</p>
          <div className="availability-row">
            <span className={unavailable ? "unavailable" : "available"}>{unavailable ? "Not Available" : `${book.availableCopies} of ${book.totalCopies} copies available`}</span>
          </div>
          <p className="details-description">{book.description}</p>
          <div className="added-by"><span>Shared by</span><strong>{book.addedBy.name}</strong><small>{book.addedBy.email}</small></div>
          <button className="button borrow-button" type="button" disabled={unavailable} onClick={() => dialogRef.current?.showModal()}>{unavailable ? "Not Available" : "Borrow This Book"}</button>
        </div>
      </article>

      <dialog className="borrow-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <div className="dialog-content">
          <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close borrow dialog">×</button>
          <p className="eyebrow">Confirm your borrow</p>
          <h2>Ready to read “{book.title}”?</h2>
          <p>The return date will be set for 14 days from today.</p>
          <div className="borrow-user"><span><strong>{session?.user.name}</strong><small>{session?.user.email}</small></span></div>
          <div className="dialog-actions">
            <button className="outline-button" type="button" onClick={() => dialogRef.current?.close()}>Cancel</button>
            <button className="button" type="button" disabled={borrowing} onClick={confirmBorrow}>{borrowing ? "Borrowing…" : "Confirm Borrow"}</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
