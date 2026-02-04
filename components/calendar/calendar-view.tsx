'use client'

import { useState } from "react"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addDays,
  isToday
} from "date-fns"
import { CalendarEvent } from "@/lib/api/calendar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface CalendarViewProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  events: CalendarEvent[]
}

export function CalendarView({ currentDate, onDateChange, events }: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const nextMonth = () => onDateChange(addMonths(currentDate, 1))
  const prevMonth = () => onDateChange(subMonths(currentDate, 1))
  const goToToday = () => onDateChange(new Date())

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day))
  }

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'hearing': return 'bg-red-100 text-red-700 border-red-200'
      case 'deadline': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'meeting': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'reminder': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center rounded-md border bg-white shadow-sm">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-r-none border-r">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToToday} className="h-8 rounded-none px-3 font-normal">
              Today
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-l-none border-l">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Button>
             <Plus className="h-4 w-4 mr-2" />
             Add Event
           </Button>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 border-b bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6 auto-rows-fr overflow-hidden">
        {calendarDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, monthStart)
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[100px] border-b border-r p-2 flex flex-col gap-1 transition-colors hover:bg-gray-50/50",
                !isCurrentMonth && "bg-gray-50/30 text-gray-400",
                dayIdx % 7 === 6 && "border-r-0" // Remove right border for last column
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={cn(
                  "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                  isToday(day) ? "bg-blue-600 text-white" : "text-gray-700"
                )}>
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                   <span className="text-[10px] text-gray-400 font-medium md:hidden">
                     {dayEvents.length}
                   </span>
                )}
              </div>
              
              <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[100px] scrollbar-hide">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={cn(
                      "text-left text-xs px-1.5 py-1 rounded border truncate transition-all hover:brightness-95",
                      getEventTypeColor(event.type)
                    )}
                  >
                    <span className="font-semibold mr-1">{format(new Date(event.start), 'h:mm a')}</span>
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
               {selectedEvent?.title}
               {selectedEvent && (
                 <Badge variant="outline" className={cn("ml-2 capitalize", getEventTypeColor(selectedEvent.type).split(' ')[0])}>
                   {selectedEvent.type}
                 </Badge>
               )}
            </DialogTitle>
            <DialogDescription>
              Details for the selected event.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4 py-2">
               <div className="flex items-start gap-3">
                 <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                 <div>
                   <div className="text-sm font-medium text-gray-900">
                     {format(new Date(selectedEvent.start), 'EEEE, MMMM d, yyyy')}
                   </div>
                   <div className="text-sm text-gray-500">
                     {format(new Date(selectedEvent.start), 'h:mm a')} - {format(new Date(selectedEvent.end), 'h:mm a')}
                   </div>
                 </div>
               </div>
               
               {selectedEvent.location && (
                 <div className="flex items-start gap-3">
                   <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                   <div className="text-sm text-gray-700">
                     {selectedEvent.location}
                   </div>
                 </div>
               )}

               {selectedEvent.caseName && (
                 <div className="flex items-start gap-3">
                   <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                   <div className="text-sm text-gray-700">
                     Related to: <span className="font-medium text-blue-600">{selectedEvent.caseName}</span>
                   </div>
                 </div>
               )}

               {selectedEvent.description && (
                 <div className="pt-2 border-t mt-2">
                   <p className="text-sm text-gray-600 leading-relaxed">
                     {selectedEvent.description}
                   </p>
                 </div>
               )}

               <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                  <Button onClick={() => setSelectedEvent(null)}>Edit Event</Button>
               </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
