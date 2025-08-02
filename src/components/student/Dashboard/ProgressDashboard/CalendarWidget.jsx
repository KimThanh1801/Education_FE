import React from "react";
import './ProgressDashboard.css';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      if (
        now.getDate() !== currentDate.getDate() ||
        now.getMonth() !== currentDate.getMonth() ||
        now.getFullYear() !== currentDate.getFullYear()
      ) {
        setCurrentDate(now);
      }
    };
    const interval = setInterval(checkDate, 60000); // Kiểm tra mỗi phút
    return () => clearInterval(interval);
  }, [currentDate]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weeks = [];
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay() || 7;

  let dayCount = 1;
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthStart = prevMonthLastDay - (startDay - 2);

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 1; j <= 7; j++) {
      if (i === 0 && j < startDay) {
        week.push({ day: prevMonthStart + j - 1, isCurrentMonth: false });
      } else if (dayCount > totalDays) {
        week.push({ day: dayCount - totalDays, isCurrentMonth: false });
        dayCount++;
      } else {
        week.push({ day: dayCount++, isCurrentMonth: true });
      }
    }
    weeks.push(week);
    if (dayCount > totalDays && i >= 4) break;
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>←</button>
        <span>
          {currentDate.toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          <div key={index} className="day-label">{day}</div>
        ))}
        {weeks.map((week, i) =>
          week.map((dayObj, j) => (
            <div
              key={`${i}-${j}`}
              className={`day ${
                dayObj.day === currentDate.getDate() && dayObj.isCurrentMonth
                  ? 'day-highlight'
                  : dayObj.isCurrentMonth
                  ? ''
                  : 'day-empty'
              }`}
            >
              {dayObj.day}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;