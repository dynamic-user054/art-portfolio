"use client";

import { useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";

import { Bodoni_Moda } from "next/font/google";
import { config } from "@/lib/config";

const headerFont = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <div className="w-8 md:w-10" />

          <Link 
            href="/" 
            className={`${headerFont.className} text-xl md:text-2xl tracking-[0.18em] uppercase text-foreground hover:opacity-75 transition-opacity cursor-pointer`}
          >
            {config.name}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 w-8 md:w-10 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      <NavBar isOpen={isMenuOpen} />
    </>
  );
};