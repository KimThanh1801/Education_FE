import React, { useState } from "react";
import { notifications as initialData } from "./notificationsData";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState(initialData);

  const handleMarkAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  return (
    <div className="notification-page">
      <h2>Notice</h2>
      <ul className="notification-list">
        {notificationList.map((item) => (
          <li
            key={item.id}
            onClick={() => handleMarkAsRead(item.id)}
            className={`notification-item ${item.read ? "read" : "unread"}`}
          >
            <div>
              <strong>{item.sender}</strong> {item.message}
            </div>
            <div className="time-section">
              <span>{item.time}</span>
              {!item.read && <span className="dot" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
