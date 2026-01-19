import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { LeadData } from '../../types/dashboard';

interface LeadFunnelCardProps {
  data: LeadData[];
}

export const LeadFunnelCard = ({ data }: LeadFunnelCardProps) => {
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalLeads = data.reduce((sum, item) => sum + item.leads, 0);
  const conversionRate = ((totalLeads / totalVisitors) * 100).toFixed(1);

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Lead Funnel</h3>
            <p className="text-sm text-gray-400">7-day performance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">{conversionRate}%</div>
          <div className="text-xs text-gray-400">Conversion</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-light rounded-xl p-4">
          <div className="text-sm text-gray-400 mb-1">Total Visitors</div>
          <div className="text-2xl font-bold text-gray-100">
            {totalVisitors.toLocaleString()}
          </div>
        </div>
        <div className="bg-surface-light rounded-xl p-4">
          <div className="text-sm text-gray-400 mb-1">Total Leads</div>
          <div className="text-2xl font-bold text-success">
            {totalLeads.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272f" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a22',
                border: '1px solid #27272f',
                borderRadius: '8px',
                color: '#f3f4f6',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorVisitors)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorLeads)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
