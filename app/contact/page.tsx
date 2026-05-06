import { NavBar } from "@/components/NavBar";
import { ContactForm } from "@/components/ContactForm";
import { supabase } from "@/lib/supabaseClient";

export default async function Contact() {
  const { data: aboutBg } = supabase.storage.from("assets").getPublicUrl("background/aboutBg.jpeg")

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        <img
          src={aboutBg.publicUrl}
          alt="Artist background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 lg:pr-24">
          <div className="w-full max-w-md lg:ml-auto xl:mr-12">
            <div className="backdrop-blur-xl bg-white/85 dark:bg-gray-900/60 border border-gray-200 dark:border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Let's Connect
              </h1>
              <p className="text-gray-600 dark:text-gray-200 mb-6">
                Have a project in mind or want to collaborate? Fill out the form and I'll get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}