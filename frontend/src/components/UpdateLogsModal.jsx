import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTimezoneLabel } from '../utils/timezones';
import './UpdateLogsModal.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function UpdateLogsModal({ event, timezone: viewTimezone, onClose }) {
  const formatDateTime = (date) => {
    return dayjs(date).tz(viewTimezone).format('MMM DD, YYYY [at] hh:mm A');
  };

  const formatValue = (field, value) => {
    if (field === 'startDate' || field === 'endDate') {
      return formatDateTime(value);
    } else if (field === 'timezone') {
      return getTimezoneLabel(value);
    } else if (field === 'profiles') {
      return Array.isArray(value) ? `${value.length} profile(s)` : value;
    }
    return String(value);
  };

  const getFieldLabel = (field) => {
    const labels = {
      profiles: 'Profiles',
      timezone: 'Timezone',
      startDate: 'Start date/time',
      endDate: 'End date/time',
    };
    return labels[field] || field;
  };

  const hasLogs = event.updateLogs && event.updateLogs.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content logs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Event Update History</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="logs-content">
          {!hasLogs ? (
            <div className="no-logs">No update history yet</div>
          ) : (
            <div className="logs-list">
              {event.updateLogs.map((log, index) => (
                <div key={index} className="log-item">
                  <div className="log-timestamp">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 3.5V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {formatDateTime(log.updatedAt)}
                  </div>
                  <div className="log-change">
                    <div className="log-field">{getFieldLabel(log.field)} updated</div>
                    <div className="log-values">
                      <div className="log-value old-value">
                        <span className="value-label">From:</span>
                        <span className="value-text">{formatValue(log.field, log.oldValue)}</span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="log-value new-value">
                        <span className="value-label">To:</span>
                        <span className="value-text">{formatValue(log.field, log.newValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateLogsModal;


