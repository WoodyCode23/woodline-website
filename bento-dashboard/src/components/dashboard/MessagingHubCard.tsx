import { Email } from '../../types/dashboard';

interface MessagingHubCardProps {
  emails: Email[];
}

export const MessagingHubCard = ({ emails }: MessagingHubCardProps) => {
  const unreadCount = emails.filter((email) => !email.isRead).length;

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Messages</h3>
            <p className="text-sm text-gray-400">{unreadCount} unread</p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-primary-hover transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`p-4 rounded-xl transition-all duration-200 cursor-pointer border ${
              email.isRead
                ? 'bg-surface-light border-transparent hover:border-border'
                : 'bg-primary/5 border-primary/20 hover:border-primary/40'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {email.sender
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold truncate ${
                        email.isRead ? 'text-gray-300' : 'text-gray-100'
                      }`}
                    >
                      {email.sender}
                    </span>
                    {email.isImportant && (
                      <svg
                        className="w-4 h-4 text-warning flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {email.hasAttachment && (
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {email.timestamp}
                  </span>
                </div>

                <div
                  className={`text-sm mb-1 ${
                    email.isRead ? 'text-gray-400' : 'text-gray-300 font-medium'
                  }`}
                >
                  {email.subject}
                </div>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {email.preview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full py-2.5 px-4 bg-surface-light hover:bg-border rounded-lg text-gray-300 font-medium transition-colors duration-200 border border-border">
          Compose Message
        </button>
      </div>
    </div>
  );
};
