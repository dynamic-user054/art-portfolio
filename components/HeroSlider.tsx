"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoSlideInterval?: number;
}

export function HeroSlider({ 
  slides, 
  autoSlideInterval = 6000 
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [isPaused, slides.length, autoSlideInterval]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  if (!slides.length) return null;

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`transition-opacity duration-1000 ease-in-out overflow-hidden ${
                index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full flex justify-center">
                <div className="relative border-8 border-border rounded-sm shadow-2xl shadow-black/10 dark:shadow-black/30 bg-background">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={1200}
                    height={900}
                    className="w-full max-h-[70vh] object-contain"
                    priority={index === 0}
                    quality={90}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>

              {(slide.title || slide.caption) && (
                <div className="mt-6 text-center">
                  {slide.title && (
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {slide.title}
                    </h2>
                  )}
                  {slide.caption && (
                    <p className="mt-2 text-base text-muted-foreground">
                      {slide.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {slides.length > 1 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-6 z-10 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-foreground scale-110"
                      : "bg-foreground/30 hover:bg-foreground/60"
                  }`}
                />
              ))}
            </div>
          )}

          {slides.length > 1 && (
            <>
              <button
                onClick={() => goToSlide((currentIndex - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background border border-border text-foreground hover:bg-muted transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goToSlide((currentIndex + 1) % slides.length)}
                aria-label="Next slide"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background border border-border text-foreground hover:bg-muted transition shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}