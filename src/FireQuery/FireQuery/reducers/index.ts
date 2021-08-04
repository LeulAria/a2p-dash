export const fireReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT':
      const firestore = action.firebase.firestore();
      state = {
        ...state,
        devtools: action.devtools,
        firebase: action.firebase,
      };
      return state;
    default:
      return state;
  }
};
