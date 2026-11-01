import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ToastProvider } from "@/components/providers/toast-provider";
import { auth } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description: "Discover, share, and borrow books with the BookNook community.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteHeader initialUser={session?.user} />
        <div className="page-content">{children}</div>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
