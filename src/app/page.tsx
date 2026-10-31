import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { NewArrivals } from "@/components/home/new-arrivals";

export const metadata: Metadata = { title: "Home" };

const steps = [
  ["01", "Find your next read", "Explore community-added books across fiction, science, history, and more."],
  ["02", "Borrow in one click", "Sign in, confirm your borrow, and keep the book on your shelf for fourteen days."],
  ["03", "Return and repeat", "Return the title when you finish so another curious reader can enjoy it next."],
];

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <NewArrivals />
      <section className="home-section process-section">
        <div className="site-container">
          <div className="section-heading centered-heading">
            <p className="eyebrow">A simple reading ritual</p>
            <h2>How borrowing works</h2>
            <p>From discovery to return, BookNook keeps every step clear and friendly.</p>
          </div>
          <div className="steps-grid">
            {steps.map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-section promise-section">
        <div className="site-container promise-card">
          <div><p className="eyebrow light-eyebrow">The reader promise</p><h2>A library grows when its stories keep moving.</h2></div>
          <div>
            <p>Share books honestly, return them thoughtfully, and leave the shelf richer than you found it. Every contribution helps another reader discover something meaningful.</p>
            <Link className="button promise-button" href="/register">Become a reader</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
