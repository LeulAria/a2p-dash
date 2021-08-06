import React, {
  createContext, useDebugValue, useEffect, useReducer,
} from "react";
import authReducer from "./reducers";
import firebase from "../../firebase";

const initialState: any = {
  use: null,
};

export const AuthContext = createContext(initialState);

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, [], () => {
    const localData = localStorage.getItem("User");
    return localData ? { ...JSON.parse(localData) } : initialState;
  });

  const getUserRoles = (role: any) => {
    const userRole: string[] = [];

    if (role) {
      if (role?.isAdmin) {
        userRole.push("ADMIN");
        userRole.push("LOGGED_IN");
      } else if (role?.isSalesSupport) {
        userRole.push("SALSE");
        userRole.push("LOGGED_IN");
      } else if (role?.isTechSupport) {
        userRole.push("TECH_SUPPORT");
        userRole.push("LOGGED_IN");
      } else if (role?.isClient) {
        userRole.push("CLIENT");
        userRole.push("LOGGED_IN");
      }
    }

    return userRole;
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }, [user]);

  useDebugValue(user || user);
  useDebugValue(user ? "Their is user" : "No user found");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        if (res) {
          let user: any = {
            email: res.email,
            uid: res.uid,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(res.uid)
            .onSnapshot((res) => {
              const userData = res.data();
              user = {
                ...user,
                ...userData,
              };
              const userRole: string[] = getUserRoles(user.roles);
              dispatch({
                type: "SET_USER",
                payload: { ...user, UserRole: userRole },
              });
            });
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
