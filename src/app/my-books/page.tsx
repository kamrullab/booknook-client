import type { Metadata } from "next";
import { MyBooks } from "@/components/books/my-books";
export const metadata:Metadata={title:"My Books"};
export default function MyBooksPage(){return <main className="dashboard-page"><div className="site-container"><div className="section-heading dashboard-heading"><p className="eyebrow">Books you shared</p><h1>My Books</h1><p>Edit your listings or remove books from the community shelf.</p></div><MyBooks/></div></main>}
