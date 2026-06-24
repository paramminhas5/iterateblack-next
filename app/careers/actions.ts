"use server";

import { createServerClient } from "@/integrations/supabase/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(254),
  role: z.string().trim().min(1, "Please select a discipline").max(100),
  portfolio: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please provide more context.").max(4000),
});

export type CareerSubmitResult =
  | { success: true }
  | { success: false; errors?: Record<string, string>; serverError?: string };

export async function submitCareerForm(formData: FormData): Promise<CareerSubmitResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((i) => { errors[i.path[0] as string] = i.message; });
    return { success: false, errors };
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("contact_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.portfolio || null,
      budget: parsed.data.role,
      message: parsed.data.message,
      source: "careers",
    });

    if (error) {
      console.error("[Careers Form] Supabase insert error:", error.message);
      return { success: false, serverError: "Something went wrong. Please try again or email hello@greattasteiterate.com." };
    }
    return { success: true };
  } catch (err) {
    console.error("[Careers Form] Unexpected error:", err);
    return { success: false, serverError: "Something went wrong. Please email hello@greattasteiterate.com directly." };
  }
}
