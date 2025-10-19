import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './EventCard.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function EventCard({ event, timezone: viewTimezone, onEdit, onViewLogs }) {
  const formatDateTime = (date) => {
    return dayjs(date).tz(viewTimezone).format('MMM D, YYYY');
  };

  const formatTime = (date) => {
    return dayjs(date).tz(viewTimezone).format('h:mm A');
  };

  const formatFullDateTime = (date) => {
    return dayjs(date).tz(viewTimezone).format('MMM D, YYYY [at] hh:mm A');
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-profiles">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="profile-icon">
            <path d="M13 14V12.6667C13 11.9594 12.719 11.2811 12.219 10.781C11.7189 10.281 11.0406 10 10.3333 10H5.66667C4.95942 10 4.28115 10.281 3.78105 10.781C3.28095 11.2811 3 11.9594 3 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47276 7.33333 8 7.33333C6.52724 7.33333 5.33333 6.13943 5.33333 4.66667C5.33333 3.19391 6.52724 2 8 2C9.47276 2 10.6667 3.19391 10.6667 4.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="profile-names">
            {event.profiles.map(p => p.name).join(', ')}
          </span>
        </div>
      </div>

      <div className="event-dates">
        <div className="event-date-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calendar-icon">
            <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 6H14M5 1.5V4.5M11 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="event-date-label">Start: {formatDateTime(event.startDate)}</div>
            <div className="event-time">{formatTime(event.startDate)}</div>
          </div>
        </div>

        <div className="event-date-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calendar-icon">
            <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 6H14M5 1.5V4.5M11 1.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="event-date-label">End: {formatDateTime(event.endDate)}</div>
            <div className="event-time">{formatTime(event.endDate)}</div>
          </div>
        </div>
      </div>

      <div className="event-meta">
        <div className="event-meta-item">
          <span className="meta-label">Created:</span>
          <span className="meta-value">{formatFullDateTime(event.createdAt)}</span>
        </div>
        <div className="event-meta-item">
          <span className="meta-label">Updated:</span>
          <span className="meta-value">{formatFullDateTime(event.updatedAt)}</span>
        </div>
      </div>

      <div className="event-actions">
        <button className="btn-action btn-edit" onClick={onEdit}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.33333 2.66667H2.66667C2.29848 2.66667 2 2.96514 2 3.33333V13.3333C2 13.7015 2.29848 14 2.66667 14H12.6667C13.0349 14 13.3333 13.7015 13.3333 13.3333V8.66667M12.3333 1.66667C12.5985 1.40146 12.9582 1.25244 13.3333 1.25244C13.7085 1.25244 14.0681 1.40146 14.3333 1.66667C14.5985 1.93188 14.7476 2.29158 14.7476 2.66667C14.7476 3.04176 14.5985 3.40146 14.3333 3.66667L8 10L5.33333 10.6667L6 8L12.3333 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button className="btn-action btn-logs" onClick={onViewLogs}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          View Logs
        </button>
      </div>
    </div>
  );
}

export default EventCard;


