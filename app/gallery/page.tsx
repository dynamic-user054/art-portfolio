import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";


export default async function Gallery() {
  const {  data :photos, error } = await supabase.storage
    .from("Paintings")
    .list();

  if (error) {
    console.error("Failed to fetch photos:", error);
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-500 text-lg font-medium mb-2">Failed to load gallery</p>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No paintings found</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            {photos.length} {photos.length === 1 ? "painting" : "paintings"} in your collection
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo) => {
            const { data } = supabase.storage
              .from("Paintings")
              .getPublicUrl(photo.name);

            return (
              <article
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted/50 shadow-sm hover:shadow-xl transition-all duration-300 ease-out cursor-pointer"
              >
                <Image
                  src={data.publicUrl}
                  alt={photo.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-sm sm:text-base truncate mb-1">
                    {photo.name.replace(/\.[^/.]+$/, "")}
                  </h3>
                  
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300 pointer-events-none" />
              </article>
            );
          })}
        </div>
      </main>
      <Footer/>
    </div>
  );
}