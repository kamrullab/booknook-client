import type { Metadata } from "next";
import { BookDetails } from "@/components/books/book-details";

type BookResponse = { data?: { title?: string; description?: string; image?: string } };

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  try {
    const response = await fetch(`${apiUrl}/books/${id}`, { next: { revalidate: 300 } });
    if (!response.ok) return { title: "Book Details" };
    const payload = await response.json() as BookResponse;
    const book = payload.data;
    if (!book?.title) return { title: "Book Details" };
    return {
      title: book.title,
      description: book.description,
      openGraph: { title: `${book.title} | BookNook`, description: book.description, images: book.image ? [book.image] : undefined },
    };
  } catch {
    return { title: "Book Details" };
  }
}

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="details-page"><div className="site-container"><BookDetails id={id} /></div></main>;
}
