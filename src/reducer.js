import { legacy_createStore as createStore } from "redux";

const reducer = (store = null, action) => {
  switch (action.type) {
    case "CHANGE_STATE_USERS":
      return {
        usersReducer: action.usersList,
      };

    case "API_STATE_USERS":
      return {
        usersAPI: action.usersAPI,
      };
    case "FILTER_STATE_USERS":
      return {
        usersFilter: action.usersFilter,
      };
    case "REMOVE_STATE_USERS":
      return {
        usersRemove: action.usersRemove,
      };
    case "RELOAD_STATE_USERS":
      return {
        reloadReducer: action.reload,
      };

    //...other events...
    default:
      return store;
  }
};

export const store = createStore(reducer);
