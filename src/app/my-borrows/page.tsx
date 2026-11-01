import type { Metadata } from "next";
import { MyBorrows } from "@/components/borrows/my-borrows";

export const metadata: Metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <main className="dashboard-page">
      <div className="site-container">
        <div className="section-heading dashboard-heading"><p className="eyebrow">Your reading journey</p><h1>My Borrows</h1><p>Keep track of the books currently spending time on your shelf.</p></div>
        <MyBorrows />
      </div>
    </main>
  );
}
