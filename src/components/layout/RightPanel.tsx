export function RightPanel() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1)

  return (
    <aside className="right-panel">
      <div className="mini-calendar">
        <div className="calendar-head">
          <strong>June 2026</strong>
          <div>
            <button>today</button>
            <button>{'<'}</button>
            <button>{'>'}</button>
          </div>
        </div>

        <div className="calendar-grid calendar-days">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="calendar-grid">
          {days.map((day) => (
            <span className={day === 23 ? 'selected-day' : ''} key={day}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className="add-event">
        <h3>Add Event</h3>

        <label>Date:</label>
        <input value="June 23, 2026" readOnly />

        <label>Hour:</label>
        <input value="12:00 AM" readOnly />

        <label>Title:</label>
        <input />

        <label>Message:</label>
        <textarea />

        <label>Priority</label>
        <select defaultValue="Medium">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="primary-button full">Save Event</button>
      </div>
    </aside>
  )
}
