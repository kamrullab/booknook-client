import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ToastProvider } from "@/components/providers/toast-provider";
import { auth } from "@/lib/auth";
import "./globals.css";

const themeBootstrap = `
  try {
    const saved = localStorage.getItem("booknook-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL ?? "https://booknookbd.vercel.app"),
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description: "Discover, share, and borrow books with the BookNook community.",
  applicationName: "BookNook",
  keywords: ["BookNook", "online library", "borrow books", "share books", "community library", "book catalog"],
  authors: [{ name: "BookNook" }],
  creator: "BookNook",
  publisher: "BookNook",
  category: "education",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "BookNook",
    title: "BookNook | A Small Online Library",
    description: "Discover community-shared books, borrow your next read, and contribute favorites to the BookNook shelf.",
    images: [{ url: "/images/booknook-og.png", width: 1736, height: 909, alt: "Two BookNook readers discovering a book together in a welcoming library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookNook | A Small Online Library",
    description: "Add a book, borrow a book, and return a book with the BookNook community.",
    images: ["/images/booknook-og.png"],
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <SiteHeader initialUser={session?.user} />
        <div className="page-content">{children}</div>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
