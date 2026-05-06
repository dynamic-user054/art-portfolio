"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-\.\(\)]/g, "");
  const internationalRegex = /^\+\d{2,15}$/;
  const localRegex = /^\d{10,15}$/;
  
  return internationalRegex.test(value.trim()) || localRegex.test(cleaned);
}

function getContactType(value: string): "email" | "phone" {
  return isValidEmail(value) ? "email" : "phone";
}


const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().min(1, "Contact info is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});


export async function sendContact(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  const validated = contactSchema.safeParse({
    name: String(formData.get("name")),
    contact: String(formData.get("contact") || ""),
    message: String(formData.get("message")),
  });

  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const contactValue = validated.data.contact.trim();
  
  if (!isValidEmail(contactValue) && !isValidPhone(contactValue)) {
    return { 
      success: false, 
      message: "Please enter a valid Phone or Email" 
    };
  }

  try {
    const contactType = getContactType(contactValue);
    const contactLabel = contactType === "email" ? "Email" : "Phone";

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.MY_EMAIL!,
      subject: `${validated.data.name}`,
      text: `Name: ${validated.data.name}\n${contactLabel}: ${contactValue}\n\nMessage:\n${validated.data.message}`,
        replyTo: contactType === "email" ? contactValue : undefined,
    });

    return { success: true, message: "Message sent successfully! I'll reply soon." };
  } catch (error) {
    console.error("Email failed:", error);
    return { success: false, message: "Failed to send. Please try again later." };
  }
}