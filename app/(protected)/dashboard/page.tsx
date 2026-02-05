'use client'

import { DashboardHomeView } from "@/components/dashboard/dashboard-home-view"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleNavigateToCalendar = () => {
    router.push('/calendar')
  }

  return (
    <DashboardHomeView onNavigateToCalendar={handleNavigateToCalendar} />
  )
}