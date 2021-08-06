export default (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      localStorage.clear();
      return null;
    default:
      return state;
  }
};
