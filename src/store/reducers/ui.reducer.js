import * as type from "../actions/action.types";

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case type.APP_MODE:
      return {
        ...state,
        dark_mode: action.paylaod,
      };
    default:
      return state;
  }
};

export default uiReducer;
