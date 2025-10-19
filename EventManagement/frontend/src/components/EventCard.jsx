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
        <div className="profiles">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="profile-icon">
            <path d="M13 14V12.6661.2811 3 11.9594 3 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47276 7.33333 8 7.33333C6.52724 7.33333 5.33333 6.13943 5.33333 4.66667C5.33333 3.19391 6.52724 2 8 2C9.47276 2 10.6667 3.19391 10.6667 4.66667Z" stroke="currentColor" strokeWidth="1.5"VstrokeLinejoin="round"/>
          </svg>
          <span className="profile-names">
            {event.profiles.map(p => p.name).join(', ')}
          </span>
        </div>
      </div>

      <div className="event-dates">

        <div className="event-date-row">
          <div>
            <div className="event-date-label">End: {formatDateTime(event.endDate)}</div>
            <div className="event-time">{formatTime(event.endDate)}</div>
          </div>
        </div>
      </div>

      <div className="event-meta">
        <div className="event-meta-item">
          <span className="meta-label">Updated:</span>
          <span className="meta-value">{formatFullDateTime(event.updatedAt)}</span>
        </div>
      </div>

      <div className="event-actions">
        <button className="btn-action btn-edit" onClick={onEdit}>
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


