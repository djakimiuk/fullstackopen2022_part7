import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setUser":
      return payload;
    case "clearUser":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
