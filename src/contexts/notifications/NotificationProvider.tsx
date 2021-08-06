import React, { createContext } from "react";

const initialState: any[] = [];

export const NotificationContext = createContext(initialState);

const NotificationProvider = () => <div />;

export default NotificationProvider;
