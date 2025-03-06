"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

const talentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  profession: z.string().min(2),
  mailingList: z.boolean().default(false),
})

export async function submitTalentForm(formData: FormData) {
  try {
    // Parse and validate the form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const profession = formData.get("profession") as string
    const mailingList = formData.get("mailingList") === "true"

    const data = { name, email, phone, profession, mailingList }
    const validatedData = talentSchema.parse(data)

    // Insert the data into Supabase
    const { data: insertedData, error } = await supabase.from("talents").insert([validatedData]).select()

    if (error) {
      console.error("Error inserting talent:", error)
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: "Thank you for joining our talent waitlist. We'll be in touch soon!",
    }
  } catch (error) {
    console.error("Error in submitTalentForm:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

