import React, { lazy } from "react";

import { RouterConfig } from "react-rolebased-router/lib/types";
import TopLoader from "../components/shared/TopLoader";

const routes: RouterConfig[] = [
  {
    path: "/",
    exact: true,
    fallback: <TopLoader />,
    component: lazy(() => import("../pages/home")),
    private: true,
  },
  {
    path: "/admin",
    exact: false,
    component: lazy(() => import("../pages/home/AdminHome")),
    fallback: <TopLoader />,
    private: true,
  },
  {
    path: "/app",
    exact: false,
    component: lazy(() => import("../pages/app")),
    fallback: <TopLoader />,
    permissions: ["LOGGED_IN"],
    routes: [
      {
        path: "/app/dashboard-admin",
        exact: false,
        component: lazy(() => import("../pages/dashboard/AdminDashboard")),
        fallback: <TopLoader />,
        permissions: ["ADMIN"],
      },
      {
        path: "/app/user/orders",
        exact: false,
        component: lazy(() => import("../pages/dashboard/UserOrders")),
        fallback: <TopLoader />,
        permissions: ["CLIENT"],
      },
      {
        path: "/app/orders",
        exact: false,
        component: lazy(() => import("../pages/orders")),
        fallback: <TopLoader />,
        permissions: ["SALSE"],
      },
      {
        path: "/app/order/detail/:id",
        exact: false,
        component: lazy(() => import("../pages/order/OrderDetail")),
        fallback: <TopLoader />,
        permissions: ["SALSE"],
      },
      {
        path: "/app/order/form/:id",
        exact: false,
        component: lazy(() => import("../pages/order/OrderForm")),
        fallback: <TopLoader />,
        permissions: ["SALSE", "ADMIN", "TECH_SUPPORT"],
      },
      {
        path: "/app/attendees",
        exact: false,
        component: lazy(() => import("../pages/attendees")),
        fallback: <TopLoader />,
        permissions: ["SALSE"],
      },
      {
        path: "/app/subscribers",
        exact: false,
        component: lazy(() => import("../pages/subscribers")),
        fallback: <TopLoader />,
        permissions: ["TECH_SUPPORT"],
      },
      {
        path: "/app/attended-subscribers",
        exact: false,
        component: lazy(() => import("../pages/subscribersAttended")),
        fallback: <TopLoader />,
        permissions: ["TECH_SUPPORT"],
      },
      {
        path: "/app/approvals-payment",
        exact: false,
        component: lazy(() => import("../pages/payApprovals")),
        fallback: <TopLoader />,
        permissions: ["ADMIN"],
      },
      {
        path: "/app/approvals-subscription",
        exact: false,
        component: lazy(() => import("../pages/subscriptionApproval")),
        fallback: <TopLoader />,
        permissions: ["ADMIN"],
      },
      {
        path: "/app/chat",
        exact: false,
        component: lazy(() => import("../pages/chat")),
        fallback: <TopLoader />,
        permissions: ["LOGGED_IN"],
      },
      {
        path: "/app/employees",
        exact: false,
        component: lazy(() => import("../pages/employees")),
        fallback: <TopLoader />,
        permissions: ["ADMIN"],
      },
      {
        path: "/app/my/orders",
        exact: false,
        component: lazy(() => import("../pages/orders/detail")),
        fallback: <TopLoader />,
        permissions: ["CLIENT"],
      },
      {
        path: "/app/users",
        exact: false,
        component: lazy(() => import("../pages/accountApproval")),
        fallback: <TopLoader />,
        permissions: ["ADMIN"],
      },
      {
        path: "/app/notifications",
        exact: false,
        component: lazy(() => import("../pages/notifications")),
        fallback: <TopLoader />,
        permissions: ["LOGGED_IN"],
      },
      {
        path: "/app/u/profile",
        exact: false,
        component: lazy(() => import("../pages/users/profile")),
        fallback: <TopLoader />,
        permissions: ["LOGGED_IN"],
      },
      {
        path: "*",
        exact: false,
        fallback: <TopLoader />,
        component: lazy(() => import("../pages/util/NotFound")),
        permissions: ["ADMIN"],
      },
    ],
  },
  {
    path: "/user/change-password",
    exact: false,
    component: lazy(() => import("../pages/util/Logout")),
    fallback: <TopLoader />,
    private: false,
    permissions: ["LOGGED_IN"],
  },
  {
    path: "/user/login",
    exact: false,
    component: lazy(() => import("../pages/auth/user/Login")),
    fallback: <TopLoader />,
  },
  {
    path: "/forgot-password",
    exact: false,
    component: lazy(() => import("../pages/users/forgotPassword")),
    fallback: <TopLoader />,
    permissions: ["NOT_LOGGED_IN"],
  },
  {
    path: "/email-verification/:email",
    exact: false,
    component: lazy(() => import("../pages/auth/CheckEmail")),
    fallback: <TopLoader />,
  },
  {
    path: "/email-verification-confirmation/:email",
    exact: false,
    component: lazy(() => import("../pages/auth/ConfirmEmail")),
    fallback: <TopLoader />,
  },
  {
    path: "/account-pending-verficiation",
    exact: false,
    component: lazy(() => import("../pages/util/Error")),
    fallback: <TopLoader />,
  },
  {
    path: "/logout",
    exact: false,
    component: lazy(() => import("../pages/util/Logout")),
    fallback: <TopLoader />,
    private: false,
    permissions: ["LOGGED_IN"],
  },
  {
    path: "/auth-admin",
    exact: false,
    component: lazy(() => import("../pages/auth")),
    fallback: <TopLoader />,
    private: false,
    routes: [
      {
        path: "/auth-admin/signup",
        exact: false,
        fallback: <TopLoader />,
        component: lazy(() => import("../pages/auth/admin/Signup")),
        private: false,
      },
      {
        path: "/auth-admin/login",
        exact: false,
        fallback: <TopLoader />,
        component: lazy(() => import("../pages/auth/admin/Login")),
        private: false,
      },
      {
        path: "*",
        exact: false,
        fallback: <TopLoader />,
        component: lazy(() => import("../pages/util/NotFound")),
        private: false,
      },
    ],
  },
  {
    path: "*",
    exact: false,
    fallback: <TopLoader />,
    component: lazy(() => import("../pages/util/NotFound")),
    private: false,
  },
];

export default routes;
