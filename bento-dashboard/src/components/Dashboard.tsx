import { AIBriefingCard, LeadFunnelCard, SiteStatusCard, MessagingHubCard, ScheduleCard } from './dashboard/index';
import { mockAIBriefing, mockLeadData, mockSiteStatus, mockEmails, mockCalendarEvents } from '../data/mockData';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your sites today.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* AI Briefing - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 lg:row-span-2">
            <AIBriefingCard briefing={mockAIBriefing} />
          </div>

          {/* Site Status */}
          <div className="lg:col-span-1">
            <SiteStatusCard status={mockSiteStatus} />
          </div>

          {/* Lead Funnel */}
          <div className="lg:col-span-1 lg:row-span-1">
            <LeadFunnelCard data={mockLeadData} />
          </div>

          {/* Schedule - Takes 2 rows on large screens */}
          <div className="lg:col-span-1 lg:row-span-2">
            <ScheduleCard events={mockCalendarEvents} />
          </div>

          {/* Messaging Hub - Takes 2 rows on large screens */}
          <div className="lg:col-span-1 lg:row-span-2">
            <MessagingHubCard emails={mockEmails} />
          </div>
        </div>
      </div>
    </div>
  );
};
