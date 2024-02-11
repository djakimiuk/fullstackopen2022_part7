import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "createNotification":
      return payload;
    case "clearNotification":
      return null;
    default:
      return null;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
  };

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null);
}

return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
)

export default NotificationContext;