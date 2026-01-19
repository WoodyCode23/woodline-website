import { AIBriefing } from '../../types/dashboard';

interface AIBriefingCardProps {
  briefing: AIBriefing;
}

export const AIBriefingCard = ({ briefing }: AIBriefingCardProps) => {
  const priorityColors = {
    high: 'border-l-primary',
    medium: 'border-l-warning',
    low: 'border-l-success',
  };

  return (
    <div className={`bento-card border-l-4 ${priorityColors[briefing.priority]} h-full flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">
              {briefing.title}
            </h3>
            <p className="text-sm text-gray-400">{briefing.date}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-border">
        <p className="text-gray-300 leading-relaxed">{briefing.summary}</p>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Key Insights
        </h4>
        <ul className="space-y-3">
          {briefing.insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-300 leading-relaxed">
                {insight}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors duration-200">
          View Full Report
        </button>
      </div>
    </div>
  );
};
