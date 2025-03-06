"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

const companySchema = z.object({
  companyName: z.string().min(2),
  country: z.string().min(1),
  state: z.string().min(1),
  sector: z.string().min(1),
  hiringNeeds: z.string().min(10),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
})

export async function submitCompanyForm(formData: FormData) {
  try {
    // Parse and validate the form data
    const companyName = formData.get("companyName") as string
    const country = formData.get("country") as string
    const state = formData.get("state") as string
    const sector = formData.get("sector") as string
    const hiringNeeds = formData.get("hiringNeeds") as string
    const contactEmail = formData.get("contactEmail") as string
    const contactPhone = formData.get("contactPhone") as string

    const data = {
      companyName,
      country,
      state,
      sector,
      hiringNeeds,
      contactEmail,
      contactPhone,
    }
    const validatedData = companySchema.parse(data)

    // Convert to snake_case for database
    const dbData = {
      company_name: validatedData.companyName,
      country: validatedData.country,
      state: validatedData.state,
      sector: validatedData.sector,
      hiring_needs: validatedData.hiringNeeds,
      contact_email: validatedData.contactEmail,
      contact_phone: validatedData.contactPhone,
    }

    // Insert the data into Supabase
    const { data: insertedData, error } = await supabase.from("companies").insert([dbData]).select()

    if (error) {
      console.error("Error inserting company:", error)
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: "Thank you for joining our company waitlist. We'll be in touch soon!",
    }
  } catch (error) {
    console.error("Error in submitCompanyForm:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

