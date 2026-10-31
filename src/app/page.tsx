import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(24,51,43,0.12)]">
        <div className="grid gap-10 px-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-14 md:py-20">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand)]">
              Your neighborhood library, online
            </p>
            <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.05] text-[var(--forest)] md:text-7xl">
              Every shelf holds a new beginning.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              BookNook brings readers together to discover recent arrivals, share cherished books,
              and borrow their next great read.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-[var(--brand)] px-6 py-3 font-bold text-white transition hover:bg-[var(--brand-dark)]"
                href="/books"
              >
                Browse books
              </Link>
              <Link
                className="rounded-full border border-[var(--forest)] px-6 py-3 font-bold transition hover:bg-[var(--forest)] hover:text-white"
                href="/register"
              >
                Join BookNook
              </Link>
            </div>
          </div>
          <div className="flex min-h-72 items-center justify-center rounded-[1.5rem] bg-[var(--forest)] p-10 text-center text-[#f7f2e8]">
            <div>
              <span className="text-7xl" aria-hidden="true">📚</span>
              <p className="mt-6 font-serif text-3xl font-bold">Add. Borrow. Return.</p>
              <p className="mt-3 leading-7 text-[#d8e3dc]">A simple library shaped by its readers.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
