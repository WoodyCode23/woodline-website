# Calendar Integration Guide

The ScheduleCard component is designed to work with any calendar service. Here's how to integrate it with popular calendar platforms.

## Supported Integrations

### 1. Google Calendar API

**Setup:**
```bash
npm install @googleapis/calendar
```

**Implementation:**
```typescript
import { google } from 'googleapis';

const calendar = google.calendar('v3');

async function fetchGoogleCalendarEvents(authClient: any) {
  const response = await calendar.events.list({
    auth: authClient,
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  // Transform to CalendarEvent format
  return response.data.items?.map(event => ({
    id: event.id || '',
    title: event.summary || '',
    description: event.description,
    startTime: new Date(event.start?.dateTime || '').toLocaleTimeString(),
    endTime: new Date(event.end?.dateTime || '').toLocaleTimeString(),
    date: new Date(event.start?.dateTime || '').toLocaleDateString(),
    type: 'meeting' as const,
    attendees: event.attendees?.map(a => a.email || ''),
    location: event.location,
    isVirtual: !!event.hangoutLink,
    meetingLink: event.hangoutLink,
    color: 'primary',
  })) || [];
}
```

### 2. Calendly API

**Setup:**
```bash
npm install node-fetch
```

**Implementation:**
```typescript
async function fetchCalendlyEvents(apiKey: string) {
  const response = await fetch('https://api.calendly.com/scheduled_events', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data.collection?.map((event: any) => ({
    id: event.uri,
    title: event.name,
    description: event.event_type,
    startTime: new Date(event.start_time).toLocaleTimeString(),
    endTime: new Date(event.end_time).toLocaleTimeString(),
    date: new Date(event.start_time).toLocaleDateString(),
    type: 'meeting' as const,
    isVirtual: true,
    meetingLink: event.location?.join_url,
    color: 'primary',
  })) || [];
}
```

### 3. Microsoft Outlook Calendar (Microsoft Graph API)

**Setup:**
```bash
npm install @microsoft/microsoft-graph-client
```

**Implementation:**
```typescript
import { Client } from '@microsoft/microsoft-graph-client';

async function fetchOutlookEvents(client: Client) {
  const events = await client
    .api('/me/calendar/events')
    .select('subject,start,end,location,attendees,onlineMeeting')
    .top(10)
    .orderby('start/dateTime')
    .get();

  return events.value?.map((event: any) => ({
    id: event.id,
    title: event.subject,
    description: event.bodyPreview,
    startTime: new Date(event.start.dateTime).toLocaleTimeString(),
    endTime: new Date(event.end.dateTime).toLocaleTimeString(),
    date: new Date(event.start.dateTime).toLocaleDateString(),
    type: 'meeting' as const,
    attendees: event.attendees?.map((a: any) => a.emailAddress.address),
    location: event.location?.displayName,
    isVirtual: !!event.onlineMeeting,
    meetingLink: event.onlineMeeting?.joinUrl,
    color: 'primary',
  })) || [];
}
```

### 4. Apple Calendar (CalDAV)

**Setup:**
```bash
npm install dav
```

**Implementation:**
```typescript
import dav from 'dav';

async function fetchAppleCalendarEvents(credentials: any) {
  const xhr = new dav.transport.Basic(
    new dav.Credentials({
      username: credentials.username,
      password: credentials.password,
    })
  );

  const account = await dav.createAccount({
    server: 'https://caldav.icloud.com',
    xhr: xhr,
    loadObjects: true,
  });

  // Transform iCal events to CalendarEvent format
  // Implementation depends on your specific needs
}
```

## Universal Calendar Sync

For syncing multiple calendars simultaneously, consider using a backend service:

```typescript
// Example unified calendar service
async function fetchAllCalendars() {
  const [googleEvents, calendlyEvents, outlookEvents] = await Promise.all([
    fetchGoogleCalendarEvents(googleAuth),
    fetchCalendlyEvents(calendlyApiKey),
    fetchOutlookEvents(msGraphClient),
  ]);

  return [...googleEvents, ...calendlyEvents, ...outlookEvents]
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
}
```

## Real-time Updates

To keep the calendar synchronized in real-time:

```typescript
// Using polling (simple approach)
useEffect(() => {
  const interval = setInterval(async () => {
    const events = await fetchAllCalendars();
    setCalendarEvents(events);
  }, 60000); // Update every minute

  return () => clearInterval(interval);
}, []);

// Using webhooks (recommended for production)
// Set up webhook endpoints for each calendar service
// Update calendar events when webhooks are triggered
```

## Environment Variables

Add these to your `.env` file:

```env
# Google Calendar
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri

# Calendly
CALENDLY_API_KEY=your_api_key

# Microsoft Graph
MS_CLIENT_ID=your_client_id
MS_CLIENT_SECRET=your_client_secret
MS_TENANT_ID=your_tenant_id

# Apple Calendar (CalDAV)
APPLE_USERNAME=your_apple_id
APPLE_APP_SPECIFIC_PASSWORD=your_app_password
```

## Authentication Flow

Most calendar APIs require OAuth 2.0. Here's a basic flow:

1. User clicks "Connect Calendar"
2. Redirect to OAuth provider
3. User grants permissions
4. Receive access token
5. Store token securely (backend recommended)
6. Use token to fetch calendar data

## Security Best Practices

- Never store API keys or tokens in frontend code
- Use a backend API to handle calendar requests
- Implement token refresh logic
- Use HTTPS for all API calls
- Validate and sanitize all calendar data

## Component Usage

```typescript
import { ScheduleCard } from './components/dashboard';
import { fetchAllCalendars } from './services/calendar';

function Dashboard() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchAllCalendars().then(setEvents);
  }, []);

  return <ScheduleCard events={events} />;
}
```
