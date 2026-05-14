import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data: heroImages, error } = await supabase.storage
    .from("assets")
    .list("HeroSlider");


  let heroSlides: { src: string; alt: string; title: string }[] = [];
  
  if (!error && heroImages && heroImages.length > 0) {
    const sorted = heroImages
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    const selected = sorted.slice(0, 3);

    heroSlides = selected.map((file) => {
      const { data } = supabase.storage
        .from("assets")
        .getPublicUrl(`HeroSlider/${file.name}`);
      
      const title = file.name.replace(/\.[^/.]+$/, "");
      return {
        src: data.publicUrl,
        alt: `${title} artwork`,
        title: title,
      };
    });
  }


  const fallbackSlides = heroSlides.length > 0 ? heroSlides : [];

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
       <HeroSlider 
        slides={fallbackSlides} 
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