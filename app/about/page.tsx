import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { config } from "@/lib/config";
import { ArrowRight, Palette, Brush, Pencil, Sparkles } from "lucide-react";

export default async function About() {
  const {  data:aboutBg } = supabase.storage
    .from("assets")
    .getPublicUrl("background/aboutBg.jpeg");

  const mediumTags = config.mediums.split("•").map(m => m.trim()).filter(m => m);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        <img
          src={aboutBg.publicUrl}
          alt="Artist background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/80" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-16 lg:py-24">
          <div className="w-full max-w-5xl">
            <div className="backdrop-blur-2xl bg-white/95 dark:bg-gray-900/85 border border-white/20 dark:border-white/10 rounded-4xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/10 dark:shadow-black/30">
              
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-muted/40 border border-border/60 mb-7">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium tracking-wide text-muted-foreground">Artist Statement</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                  About {config.name}
                </h1>
                
                <div className="relative w-32 h-px mx-auto">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/40 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/60" />
                </div>
              </div>

              <div className="space-y-7 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-foreground/90">
                  {config.bio}
                </p>
                <p className="pl-1">{config.bioExtended}</p>
              </div>

              <div className="my-14 flex items-center justify-center gap-5">
                <div className="flex-1 max-w-30 h-px bg-linear-to-r from-transparent via-border/70 to-border/30" />
                <div className="flex items-center gap-3 text-muted-foreground/80">
                  <Sparkles className="w-4 h-4" />
                  <Brush className="w-4 h-4" />
                  <Pencil className="w-4 h-4" />
                  <Palette className="w-4 h-4" />
                </div>
                <div className="flex-1 max-w-30 h-px bg-linear-to-r from-border/30 via-border/70 to-transparent" />
              </div>

              <div className="mb-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5 text-center">
                  Mediums & Focus
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {mediumTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-5 py-2.5 rounded-full bg-muted/30 border border-border/50 text-sm font-medium text-foreground/90 hover:bg-muted/50 hover:border-foreground/20 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center mb-14">
                <div className="inline-block">
                  <p className="font-serif italic text-3xl text-foreground/85 mb-3">
                    — {config.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.2em]">
                    Creating since {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-border/50">
                <a
                  href="/gallery"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-200 shadow-lg shadow-foreground/10"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border/70 font-medium text-foreground/80 hover:bg-muted/30 hover:text-foreground transition-colors duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground/70 italic font-serif">
                "{config.tagline}"
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}