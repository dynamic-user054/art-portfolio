import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabaseClient";

export default async function Contact() {
  const { data: contactBg } = supabase.storage.from("assets").getPublicUrl("background/contactBg.jpeg")

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        <img
          src={contactBg.publicUrl}
          alt="Artist background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35 dark:bg-black/65" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 pt-24 pb-12 lg:pr-24">
          <div className="w-full max-w-2xl lg:ml-auto xl:mr-12">
            <div className="backdrop-blur-2xl bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl ring-1 ring-white/5 dark:ring-white/5">
              <h1 className="text-4xl font-bold mb-3 text-white dark:text-white">
                Let's Connect
              </h1>
              <p className="text-white/85 dark:text-gray-200 mb-8 text-lg leading-relaxed">
                Have a project in mind or want to collaborate? Fill out the form and I'll get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}