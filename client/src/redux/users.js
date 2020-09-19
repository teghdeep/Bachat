import * as ActionTypes from "./ActionTypes";

export const Users = (
  state = {
    isLoading: true,
    errMess: null,
    users: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload,
      };

    case ActionTypes.USERS_LOADING:
      return { ...state, isLoading: true, errMess: null, users: [] };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        users: [],
      };

    case ActionTypes.ADD_USER:
      var user = action.payload;
      return { ...state, users: state.users.concat(user) };

    default:
      return state;
  }
};
