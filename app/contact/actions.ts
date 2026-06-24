"use server";

import { createServerClient } from "@/integrations/supabase/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(254),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please provide more context.").max(4000),
});

export type SubmitResult =
  | { success: true }
  | { success: false; errors?: Record<string, string>; serverError?: string };

export async function submitContactForm(formData: FormData): Promise<SubmitResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((i) => {
      errors[i.path[0] as string] = i.message;
    });
    return { success: false, errors };
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("contact_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
      source: "website",
    });

    if (error) {
      console.error("[Contact Form] Supabase insert error:", error.message);
      return {
        success: false,
        serverError: "Something went wrong. Please try again or email hello@greattasteiterate.com directly.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[Contact Form] Unexpected error:", err);
    return {
      success: false,
      serverError: "Something went wrong. Please try again or email hello@greattasteiterate.com directly.",
    };
  }
}
