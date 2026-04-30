"use client";
import Link from "next/link";
import { HomeIcon, Image as ImageIcon, Info, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const NavBar = () => {
  const navItems = [
    { to: "/", label: "Home", Icon: HomeIcon },
    { to: "/gallery", label: "Gallery", Icon: ImageIcon },
    { to: "/about", label: "About", Icon: Info },
  ];

  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme ?? theme : "light";
  const isDark = currentTheme === "dark";
  const toggleDark = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav className="navbar-stretch fixed right-0 top-0 h-full z-50 flex flex-col justify-evenly items-stretch px-4 py-8 gap-2 bg-card/80 text-card-foreground backdrop-blur-xl border-l border-border shadow-2xl pointer-events-auto">
      <button
        type="button"
        onClick={toggleDark}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        aria-label="Toggle dark mode"
        className="nav-item pointer-events-auto flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </span>
        <span className={`nav-label whitespace-nowrap ${hovering ? "opacity-100" : "opacity-0"}`}>
          {mounted ? (isDark ? "Dark Mode" : "Light Mode") : ""}
        </span>
      </button>

      <div className="flex flex-col gap-2">
        {navItems.map(({ to, label, Icon }) => (
          <Link
            key={to}
            href={to}
            className="nav-item group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-125">
              <Icon className="h-5 w-5" />
            </span>
            <span className={`nav-label whitespace-nowrap text-black ${hovering ? "opacity-100" : "opacity-0"}`}>
              {label}
            </span>
            <span className="nav-indicator" />
          </Link>
        ))}
      </div>
    </nav>
  );
};
