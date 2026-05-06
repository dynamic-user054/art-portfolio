"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "../lib/sendContact";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 rounded-xl font-semibold text-white dark:text-gray-900 
                 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 
                 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed 
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContact, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/20 
                     text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Contact Info
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          required
          placeholder="Phone or Email"
          pattern="^([\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/20 
                     text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me about your project or question..."
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/20 
                     text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
        />
      </div>

      {state?.message && (
        <div
          role={state.success ? "status" : "alert"}
          aria-live="polite"
          className={`rounded-lg px-4 py-3 text-sm border ${
            state.success
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}