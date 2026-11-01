"use client";

import Link from "next/link";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  ["Stories worth sharing", "Find the book that stays with you.", "Browse a growing community shelf and borrow your next unforgettable read.", "hero-slide-one"],
  ["New worlds, close by", "Curiosity belongs on every shelf.", "Move from science to history, fiction to childhood favorites—all in one welcoming nook.", "hero-slide-two"],
  ["A library built together", "Share a favorite. Start a journey.", "Add books you love and help another reader find exactly the story they needed.", "hero-slide-three"],
];

export function HomeHero() {
  return (
    <section className="hero-shell" aria-label="BookNook highlights">
      <Swiper modules={[Autoplay, Keyboard, Pagination]} autoplay={{ delay: 5500, disableOnInteraction: false }} keyboard={{ enabled: true }} pagination={{ clickable: true }} loop>
        {slides.map(([kicker, title, text, className]) => (
          <SwiperSlide key={title}>
            <div className={`hero-slide ${className}`}>
              <div className="site-container booknook-hero-content">
                <p>{kicker}</p><h1>{title}</h1><span>{text}</span>
                <Link className="button hero-button" href="/books">Browse books</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
