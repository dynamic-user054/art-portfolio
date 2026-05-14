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
  autoSlideInterval = 5000 
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
    <div 
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority={index === 0}
              quality={90}
            />
          </div>
          
          {(slide.title || slide.caption) && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
              <div className="text-center px-4 max-w-3xl">
                {slide.title && (
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                    {slide.title}
                  </h2>
                )}
                {slide.caption && (
                  <p className="mt-2 text-base sm:text-lg text-muted-foreground bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded inline-block">
                    {slide.caption}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-foreground scale-125"
                  : "bg-foreground/40 hover:bg-foreground/70"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-background/80 text-foreground hover:bg-background transition shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentIndex + 1) % slides.length)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-background/80 text-foreground hover:bg-background transition shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}