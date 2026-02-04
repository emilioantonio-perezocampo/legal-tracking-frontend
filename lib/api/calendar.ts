import { apiFetch } from "@/lib/api/client"

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  type: 'hearing' | 'deadline' | 'meeting' | 'reminder'
  caseId?: string
  caseName?: string
  description?: string
  location?: string
}

export async function getCalendarEvents(start: Date, end: Date): Promise<CalendarEvent[]> {
  // In real implementation:
  // const params = new URLSearchParams({
  //   start: start.toISOString(),
  //   end: end.toISOString(),
  // });
  // return apiFetch(`/calendar/events?${params}`);

  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      title: 'Hearing: Smith v. Jones',
      start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
      type: 'hearing',
      caseId: 'case-123',
      caseName: 'Smith v. Jones',
      location: 'Courtroom 3B'
    },
    {
      id: '2',
      title: 'Filing Deadline: Motion to Dismiss',
      start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      type: 'deadline',
      caseId: 'case-456',
      caseName: 'TechCorp Merger'
    },
    {
      id: '3',
      title: 'Client Meeting: Acme Corp',
      start: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
      type: 'meeting',
      caseId: 'case-789',
      caseName: 'Acme Corp General Counsel'
    }
  ];
}

export async function createCalendarEvent(event: Omit<CalendarEvent, 'id'>) {
  // return apiFetch('/calendar/events', {
  //   method: 'POST',
  //   body: JSON.stringify(event),
  // });
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: Date.now().toString(), ...event };
}
