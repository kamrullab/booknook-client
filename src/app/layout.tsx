import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description: "Discover, share, and borrow books with the BookNook community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
