import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  if (!notification) {
    return null;
  }
  if (notification.error === false) {
    return <div className="notification">{notification.body}</div>;
  } else {
    return <div className="error">{notification.body}</div>;
  }
};

export default Notification;
