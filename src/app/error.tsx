"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="error-page">
      <span aria-hidden="true">!</span>
      <p className="eyebrow">A page went off-script</p>
      <h1>We could not finish this chapter.</h1>
      <p>Please try the page again. Your account and library data have not been changed.</p>
      <button className="button" type="button" onClick={reset}>Try Again</button>
    </main>
  );
}
