export default (state: any, action: any) => {
  switch (action.type) {
    case "SET_USERS_PENDING":
      return { ...state, usersPending: action.payload };
    case "SET_DASHBOARD":
      return { ...state, usersPending: action.payload };
    case "SET_PAYMENT_PENDING":
      return { ...state, usersPending: action.payload };
    case "SET_SUBSCRIPTION_PENDING":
      return { ...state, usersPending: action.payload };
    case "CHAT":
      return { ...state, usersPending: action.payload };
    default:
      return state;
  }
};
