"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

const governmentSchema = z.object({
  governmentName: z.string().min(2),
  level: z.string().min(1),
  talentInterest: z.string().min(10),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
})

export async function submitGovernmentForm(formData: FormData) {
  try {
    // Parse and validate the form data
    const governmentName = formData.get("governmentName") as string
    const level = formData.get("level") as string
    const talentInterest = formData.get("talentInterest") as string
    const contactEmail = formData.get("contactEmail") as string
    const contactPhone = formData.get("contactPhone") as string

    const data = {
      governmentName,
      level,
      talentInterest,
      contactEmail,
      contactPhone,
    }
    const validatedData = governmentSchema.parse(data)

    // Convert to snake_case for database
    const dbData = {
      government_name: validatedData.governmentName,
      level: validatedData.level,
      talent_interest: validatedData.talentInterest,
      contact_email: validatedData.contactEmail,
      contact_phone: validatedData.contactPhone,
    }

    // Insert the data into Supabase
    const { data: insertedData, error } = await supabase.from("government_entities").insert([dbData]).select()

    if (error) {
      console.error("Error inserting government entity:", error)
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: "Thank you for joining our government waitlist. We'll be in touch soon!",
    }
  } catch (error) {
    console.error("Error in submitGovernmentForm:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

