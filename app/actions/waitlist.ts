"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

// Talent Waitlist Schema
const talentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(1),
  profession: z.string().min(2),
  mailingList: z.boolean().default(false),
})

// Companies Waitlist Schema
const companySchema = z.object({
  companyName: z.string().min(2),
  country: z.string().min(1),
  state: z.string().min(1),
  sector: z.string().min(1),
  hiringNeeds: z.string().min(10),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
})

// Government Waitlist Schema
const governmentSchema = z.object({
  governmentName: z.string().min(2),
  level: z.string().min(1),
  talentInterest: z.string().min(10),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
})

export async function submitTalentWaitlist(formData: FormData) {
  try {
    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: (formData.get("country") as string) || "Unknown",
      profession: formData.get("profession") as string,
      mailingList: formData.get("mailingList") === "on",
    }

    const validatedData = talentSchema.parse(data)

    // Insert into Supabase
    const { error } = await supabase.from("talent_waitlist").insert({
      name: validatedData.name,
      email: validatedData.email,
      phone_number: validatedData.phone,
      country: validatedData.country,
      profession: validatedData.profession,
      mailing_list_opt_in: validatedData.mailingList,
    })

    if (error) {
      console.error("Error submitting talent waitlist:", error)
      return { success: false, message: "Failed to submit. Please try again." }
    }

    return { success: true, message: "Thank you for joining our talent waitlist!" }
  } catch (error) {
    console.error("Error in talent waitlist submission:", error)
    return { success: false, message: "Invalid form data. Please check your inputs." }
  }
}

export async function submitCompanyWaitlist(formData: FormData) {
  try {
    // Parse and validate form data
    const data = {
      companyName: formData.get("companyName") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      sector: formData.get("sector") as string,
      hiringNeeds: formData.get("hiringNeeds") as string,
      contactEmail: formData.get("contactEmail") as string,
      contactPhone: formData.get("contactPhone") as string,
    }

    const validatedData = companySchema.parse(data)

    // Insert into Supabase
    const { error } = await supabase.from("companies_waitlist").insert({
      company_name: validatedData.companyName,
      country: validatedData.country,
      state: validatedData.state,
      sector: validatedData.sector,
      hiring_needs: validatedData.hiringNeeds,
      contact_email: validatedData.contactEmail,
      contact_phone: validatedData.contactPhone,
    })

    if (error) {
      console.error("Error submitting company waitlist:", error)
      return { success: false, message: "Failed to submit. Please try again." }
    }

    return { success: true, message: "Thank you for joining our company waitlist!" }
  } catch (error) {
    console.error("Error in company waitlist submission:", error)
    return { success: false, message: "Invalid form data. Please check your inputs." }
  }
}

export async function submitGovernmentWaitlist(formData: FormData) {
  try {
    // Parse and validate form data
    const data = {
      governmentName: formData.get("governmentName") as string,
      level: formData.get("level") as string,
      talentInterest: formData.get("talentInterest") as string,
      contactEmail: formData.get("contactEmail") as string,
      contactPhone: formData.get("contactPhone") as string,
    }

    const validatedData = governmentSchema.parse(data)

    // Insert into Supabase
    const { error } = await supabase.from("government_waitlist").insert({
      government_name: validatedData.governmentName,
      government_level: validatedData.level,
      talent_interest: validatedData.talentInterest,
      contact_email: validatedData.contactEmail,
      contact_phone: validatedData.contactPhone,
    })

    if (error) {
      console.error("Error submitting government waitlist:", error)
      return { success: false, message: "Failed to submit. Please try again." }
    }

    return { success: true, message: "Thank you for joining our government waitlist!" }
  } catch (error) {
    console.error("Error in government waitlist submission:", error)
    return { success: false, message: "Invalid form data. Please check your inputs." }
  }
}

