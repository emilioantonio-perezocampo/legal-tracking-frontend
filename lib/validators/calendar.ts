import * as z from "zod"

export const calendarEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start: z.date(),
  end: z.date(),
  type: z.enum(['hearing', 'deadline', 'meeting', 'reminder']),
  caseId: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
})

export type CalendarEventFormValues = z.infer<typeof calendarEventSchema>
