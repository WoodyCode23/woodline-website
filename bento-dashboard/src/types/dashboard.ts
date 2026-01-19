export interface LeadData {
  date: string;
  visitors: number;
  leads: number;
}

export interface SiteStatus {
  name: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  lastChecked: string;
}

export interface AIBriefing {
  title: string;
  date: string;
  summary: string;
  insights: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  hasAttachment: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'meeting' | 'call' | 'deadline' | 'reminder' | 'event';
  attendees?: string[];
  location?: string;
  isVirtual?: boolean;
  meetingLink?: string;
  color?: string;
}
