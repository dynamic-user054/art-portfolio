"use client";
import Link from "next/link";
import { HomeIcon, Image as ImageIcon, Info, Moon, Sun ,MessageSquare as Contact} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const NavBar = ({ isOpen }: { isOpen: boolean }) => {
  const navItems = [
    { to: "/", label: "Home", Icon: HomeIcon },
    { to: "/gallery", label: "Gallery", Icon: ImageIcon },
    { to: "/contact", label: "Contact", Icon: Contact },
    { to: "/about", label: "About", Icon: Info }
  ];

  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme ?? theme : "light";
  const isDark = currentTheme === "dark";
  const toggleDark = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav 
      className={`
        navbar-stretch group fixed right-0 top-0 h-full z-40 
        flex flex-col items-center justify-evenly gap-2 px-4 py-8 
        bg-card/90 text-card-foreground backdrop-blur-xl border-l border-border shadow-2xl 
        w-16 hover:w-44 transition-all duration-500 ease-in-out overflow-hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      
      <button
        type="button"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        className="nav-item w-full flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </span>
        <span className="nav-label whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          {mounted ? (isDark ? "Dark Mode" : "Light Mode") : ""}
        </span>
      </button>

      <div className="flex flex-col gap-2 w-full">
        {navItems.map(({ to, label, Icon }) => (
          <Link
            key={to}
            href={to}
            className="nav-item w-full flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-125">
              <Icon className="h-5 w-5" />
            </span>
            <span className="nav-label whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
              {label}
            </span>
            <span className="nav-indicator" />
          </Link>
        ))}
      </div>
    </nav>
  );
};