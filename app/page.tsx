import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {

  const { data: paintings, error } = await supabase.storage
    .from("Paintings")
    .list();

  let heroSlides: { src: string; alt: string; title: string }[] = [];
  if (!error && paintings && paintings.length > 0) {
    const selected = paintings.slice(0, 3);
    heroSlides = selected.map((file) => {
      const { data } = supabase.storage
        .from("Paintings")
        .getPublicUrl(file.name);
      
      const title = file.name.replace(/\.[^/.]+$/, "");
      return {
        src: data.publicUrl,
        alt: `${title} artwork`,
        title: title,
      };
    });
  }

  const fallbackSlides = [
    { src: "/hero-1.jpg", alt: "Charcoal study", title: "Exploring Form & Light" },
    { src: "/hero-2.jpg", alt: "Ink landscape", title: "Movement in Stillness" },
    { src: "/hero-3.jpg", alt: "Mixed media", title: "Texture & Emotion" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Header/>
      
      <HeroSlider 
        slides={heroSlides.length > 0 ? heroSlides : fallbackSlides} 
        autoSlideInterval={6000} 
      />
      
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
           Description
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/gallery" className="px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition">
              View Gallery
            </a>
            <a href="/contact" className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-accent transition">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}