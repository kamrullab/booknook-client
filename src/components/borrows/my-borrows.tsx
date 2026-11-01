"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api-client";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};

type ApiResponse<T> = { success: true; data: T };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export function MyBorrows() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [selected, setSelected] = useState<Borrow | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    apiRequest<ApiResponse<Borrow[]>>("/borrows", { authenticated: true, signal: controller.signal })
      .then((response) => { setBorrows(response.data); setStatus("ready"); })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });
    return () => controller.abort();
  }, []);

  function openReturnDialog(borrow: Borrow) {
    setSelected(borrow);
    dialogRef.current?.showModal();
  }

  async function returnBook() {
    if (!selected) return;
    setReturning(true);
    try {
      await apiRequest(`/borrows/${selected._id}`, { method: "DELETE", authenticated: true });
      setBorrows((current) => current.filter((borrow) => borrow._id !== selected._id));
      dialogRef.current?.close();
      toast.success(`“${selected.bookTitle}” was returned successfully.`);
      setSelected(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The book could not be returned.");
    } finally {
      setReturning(false);
    }
  }

  if (status === "loading") return <div className="loading-state" role="status"><span className="spinner" /> Loading your borrowed shelf…</div>;
  if (status === "error") return <div className="message-state" role="alert">Your borrowed books could not be loaded.</div>;
  if (borrows.length === 0) return <div className="empty-shelf"><span aria-hidden="true">📖</span><h2>Your borrowed shelf is empty</h2><p>Explore the community collection and choose your next read.</p><Link className="button" href="/books">Browse books</Link></div>;

  return (
    <>
      <div className="borrow-table-wrap">
        <table className="borrow-table">
          <thead><tr><th>Book</th><th>Borrowed</th><th>Return by</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td data-label="Book"><div className="borrow-book">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={borrow.bookImage} alt="" /><span><strong>{borrow.bookTitle}</strong><Link href={`/books/${borrow.bookId}`}>View details</Link></span>
                </div></td>
                <td data-label="Borrowed">{formatDate(borrow.borrowDate)}</td>
                <td data-label="Return by"><strong>{formatDate(borrow.returnDate)}</strong></td>
                <td><button className="return-button" type="button" onClick={() => openReturnDialog(borrow)}>Return Book</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog className="borrow-dialog" ref={dialogRef} onClose={() => setSelected(null)}>
        <div className="dialog-content">
          <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close return dialog">×</button>
          <p className="eyebrow">Return book</p>
          <h2>Finished with “{selected?.bookTitle}”?</h2>
          <p>Returning it will make another copy available to the BookNook community.</p>
          <div className="dialog-actions"><button className="outline-button" type="button" onClick={() => dialogRef.current?.close()}>Keep it for now</button><button className="button" type="button" disabled={returning} onClick={returnBook}>{returning ? "Returning…" : "Confirm Return"}</button></div>
        </div>
      </dialog>
    </>
  );
}
