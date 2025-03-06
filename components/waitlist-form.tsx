"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TalentForm } from "./forms/talent-form"
import { CompanyForm } from "./forms/company-form"
import { GovernmentForm } from "./forms/government-form"
import { Building2, GraduationCap, Landmark } from "lucide-react"

export function WaitlistForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <Tabs defaultValue="talent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="talent" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Talent</span>
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Companies</span>
          </TabsTrigger>
          <TabsTrigger value="government" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span className="hidden sm:inline">Government</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="talent">
          <TalentForm />
        </TabsContent>

        <TabsContent value="companies">
          <CompanyForm />
        </TabsContent>

        <TabsContent value="government">
          <GovernmentForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

