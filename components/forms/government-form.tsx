"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { submitGovernmentForm } from "@/app/actions/government-actions"

const formSchema = z.object({
  governmentName: z.string().min(2, {
    message: "Government name must be at least 2 characters.",
  }),
  level: z.string({
    required_error: "Please select a government level.",
  }),
  talentInterest: z.string().min(10, {
    message: "Please provide more details about your talent interests.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
})

export function GovernmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      governmentName: "",
      level: "",
      talentInterest: "",
      contactEmail: "",
      contactPhone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Create FormData object
      const formData = new FormData()
      formData.append("governmentName", values.governmentName)
      formData.append("level", values.level)
      formData.append("talentInterest", values.talentInterest)
      formData.append("contactEmail", values.contactEmail)
      formData.append("contactPhone", values.contactPhone)

      // Submit to server action
      const result = await submitGovernmentForm(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="governmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government Name</FormLabel>
                <FormControl>
                  <Input placeholder="California Department of Labor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="county">County</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="talentInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Talent Interest</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the types of talent your organization is interested in"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@gov.org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <div className="phone-input-container">
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="US"
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </form>
    </Form>
  )
}

