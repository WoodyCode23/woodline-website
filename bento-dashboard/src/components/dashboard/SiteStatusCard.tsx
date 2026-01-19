import { SiteStatus } from '../../types/dashboard';

interface SiteStatusCardProps {
  status: SiteStatus;
}

export const SiteStatusCard = ({ status }: SiteStatusCardProps) => {
  const statusConfig = {
    online: {
      color: 'bg-success',
      ringColor: 'ring-success/30',
      text: 'Online',
      textColor: 'text-success',
    },
    offline: {
      color: 'bg-danger',
      ringColor: 'ring-danger/30',
      text: 'Offline',
      textColor: 'text-danger',
    },
    warning: {
      color: 'bg-warning',
      ringColor: 'ring-warning/30',
      text: 'Warning',
      textColor: 'text-warning',
    },
  };

  const config = statusConfig[status.status];

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Site Status</h3>
          <p className="text-sm text-gray-400">{status.name}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="relative mb-6">
          <div
            className={`absolute inset-0 ${config.color} opacity-20 rounded-full animate-ping`}
          />
          <div
            className={`absolute inset-0 ${config.color} opacity-10 rounded-full animate-pulse-slow ring-8 ${config.ringColor}`}
          />
          <div className={`relative w-24 h-24 ${config.color} rounded-full`} />
        </div>

        <div className={`text-3xl font-bold ${config.textColor} mb-2`}>
          {config.text}
        </div>
        <div className="text-sm text-gray-400">
          All systems operational
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
        <div>
          <div className="text-sm text-gray-400 mb-1">Uptime</div>
          <div className="text-xl font-bold text-gray-100">{status.uptime}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Last Checked</div>
          <div className="text-xl font-bold text-gray-100">
            {status.lastChecked}
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2.5 px-4 bg-surface-light hover:bg-border rounded-lg text-gray-300 font-medium transition-colors duration-200 border border-border">
        View Details
      </button>
    </div>
  );
};
