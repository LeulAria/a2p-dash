import React, { useContext } from "react";

import ReactRoleAccessRouter from "react-rolebased-router";
import { RouterConfig } from "react-rolebased-router/lib/types";
import Layout from "../layout/Layout";
import { AuthContext } from "../contexts/auth/AuthProvider";
import Error from "./util/Error";
import { redirectUserHome, redirectUserLogin } from "../utils/userRoleUtils";

interface IProps {
  routes: RouterConfig[];
}

function App({ routes }: IProps) {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <ReactRoleAccessRouter
        routes={routes}
        userAuthRoles={user.UserRole ? user.UserRole : ["NOT_LOGGED_IN"]}
        loginRedirectPath={user ? redirectUserHome(user) : redirectUserLogin(user)}
        isUserAuthenticated={!!user}
        blocked={{
          isBlocked: (user && user.accountStatus) === "pending",
          component: <Error />,
        }}
      />
    </Layout>
  );
}

export default App;
