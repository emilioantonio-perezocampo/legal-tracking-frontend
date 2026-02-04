'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { startOfMonth, endOfMonth } from 'date-fns'
import { CalendarView } from '@/components/calendar/calendar-view'
import { getCalendarEvents } from '@/lib/api/calendar'
import { Skeleton } from '@/components/ui/skeleton'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  
  const { data: events, isLoading } = useQuery({
    queryKey: ['calendar-events', monthStart.toISOString(), monthEnd.toISOString()],
    queryFn: () => getCalendarEvents(monthStart, monthEnd),
  })

  if (isLoading) {
    return <CalendarSkeleton />
  }

  return (
    <CalendarView 
      currentDate={currentDate} 
      onDateChange={setCurrentDate}
      events={events ?? []}
    />
  )
}

function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="flex-1 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-full w-full min-h-[100px]" />
        ))}
      </div>
    </div>
  )
}
