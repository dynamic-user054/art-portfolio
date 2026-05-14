import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default async function Gallery() {
  const { data: photos, error } = await supabase.storage.from("Paintings").list();

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <div className="flex flex-1 items-center justify-center p-8 pt-24 text-center">
          <div>
            <p className="mb-2 text-lg font-medium text-red-500">Failed to load gallery</p>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!photos?.length) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 items-center justify-center p-8 pt-24 text-center">
          <div className="max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold">No Artworks in Gallery</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-10 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Gallery
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo) => {
            const { data } = supabase.storage.from("Paintings").getPublicUrl(photo.name);
            const title = photo.name.replace(/\.[^/.]+$/, "");

            return (
              <article key={photo.id} className="group flex flex-col cursor-pointer items-center">
                <div className="relative w-full max-w-xs aspect-square mx-auto">
                  <Image
                    src={data.publicUrl}
                    alt={title}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="mt-4 max-w-sm mx-auto text-center px-2">
                  <h3 className="text-foreground font-medium text-sm sm:text-base truncate">
                    {title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}