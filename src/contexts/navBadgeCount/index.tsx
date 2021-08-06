import React, {
  ReactNode, createContext, useContext, useReducer,
} from "react";
import badgeReducer from "./reducers";

type NavBarBadgeState = {
  dashboard: number;
  paymetPending: number;
  subscriptionPending: number;
  chat: number;
  usersPending: number;
};

const initialState: NavBarBadgeState = {
  dashboard: 0,
  paymetPending: 0,
  subscriptionPending: 0,
  chat: 0,
  usersPending: 0,
};

const NavBadgeContext = createContext<{
  badges: NavBarBadgeState;
  dispatch: React.Dispatch<any>;
}>({
  badges: initialState,
  dispatch: () => null,
});

const NavBadgeProvider = ({ children }: { children: ReactNode }) => {
  const [badges, dispatch] = useReducer(badgeReducer, initialState);

  // useEffect(() => {
  //   dispatch({ type: "SET_USERS_PENDING", payload: 3 })
  // }, []);

  return (
    <NavBadgeContext.Provider value={{ badges, dispatch }}>
      {children}
    </NavBadgeContext.Provider>
  );
};

export const useNavBadge = () => {
  const ctx = useContext(NavBadgeContext);
  return ctx;
};

export default NavBadgeProvider;
