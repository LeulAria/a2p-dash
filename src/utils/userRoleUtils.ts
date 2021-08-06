export const getUserRoles = (role: any) => {
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

export const redirectUserHome = (role: any) => {
  let uri = "";
  if (role?.isAdmin) {
    uri = "/app/dashboard-admin";
  } else if (role?.isClient) {
    uri = "/app/user/orders";
  } else if (role?.isSalesSupport) {
    uri = "/app/orders";
  } else if (role?.isTechSupport) {
    uri = "/app/subscribers";
  }

  return uri;
};

export const redirectUserLogin = (user: any) => {
  let uri = "";

  if (user?.roles?.isSruff) {
    uri = "/admin";
  } else if (user?.roles?.isClient) {
    uri = "/user/login";
  }

  return uri;
};
