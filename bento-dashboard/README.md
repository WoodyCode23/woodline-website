# Bento Dashboard

A modern, high-end dark-mode SaaS dashboard built with Vite, React, TypeScript, and Tailwind CSS. Features a beautiful Bento Box layout designed for web hosting clients.

## Features

- **AI Daily Briefing**: Intelligent summary of daily performance with key insights
- **Lead Funnel Chart**: Visual representation of visitor to lead conversion
- **Site Status Monitor**: Real-time status indicator with pulsing animation
- **Modular Components**: Easily reusable across different projects
- **Dark Mode**: Premium dark theme optimized for professional use
- **Responsive Design**: Works seamlessly across all device sizes

## Project Structure

```
bento-dashboard/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── AIBriefingCard.tsx
│   │   │   ├── LeadFunnelCard.tsx
│   │   │   ├── SiteStatusCard.tsx
│   │   │   └── index.ts
│   │   ├── shared/             # Reusable components (future)
│   │   └── Dashboard.tsx       # Main dashboard layout
│   ├── data/
│   │   └── mockData.ts         # Mock data for components
│   ├── types/
│   │   └── dashboard.ts        # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Navigate to the project directory:
```bash
cd bento-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Using Components in Other Projects

All dashboard components are modular and can be easily integrated into other websites:

### Example: Using the AI Briefing Card

```tsx
import { AIBriefingCard } from './components/dashboard';

const myBriefing = {
  title: 'Daily Performance Summary',
  date: new Date().toLocaleDateString(),
  summary: 'Your summary here...',
  insights: ['Insight 1', 'Insight 2'],
  priority: 'high'
};

<AIBriefingCard briefing={myBriefing} />
```

### Example: Using the Site Status Card

```tsx
import { SiteStatusCard } from './components/dashboard';

const mySiteStatus = {
  name: 'My Website',
  status: 'online',
  uptime: '99.9%',
  lastChecked: new Date().toLocaleTimeString()
};

<SiteStatusCard status={mySiteStatus} />
```

## Customization

### Colors

Edit [tailwind.config.js](tailwind.config.js) to customize the color scheme:

```js
colors: {
  background: '#0a0a0f',    // Main background
  surface: '#131318',        // Card backgrounds
  primary: '#6366f1',        // Primary accent
  success: '#22c55e',        // Success/online state
  // ... more colors
}
```

### Adding New Components

1. Create component in `src/components/dashboard/`
2. Export it in `src/components/dashboard/index.ts`
3. Import and use in your dashboard layout

## Technologies Used

- **Vite**: Fast build tool and dev server
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Chart library for data visualization

## License

MIT
