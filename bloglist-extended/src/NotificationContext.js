import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "createNotification":
      return payload;
    case "clearNotification":
      return null;
    default:
      return state;
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

export const useNotify = () => {
  const dispatch = useNotificationDispatch();
  return (payload) => {
    dispatch({ type: "createNotification", payload });
    setTimeout(() => {
      dispatch({ type: "clearNotification" });
    }, 5000);
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
