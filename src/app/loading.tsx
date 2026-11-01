export default function LoadingPage() {
  return (
    <main className="global-loading" role="status" aria-live="polite">
      <div className="book-loader" aria-hidden="true"><span /><span /><span /></div>
      <strong>Opening the next page…</strong>
    </main>
  );
}
