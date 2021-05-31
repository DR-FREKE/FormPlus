import * as type from "../actions/action.types";

const templateReducer = (state = {}, action) => {
  switch (action.type) {
    case type.LOADING:
      return {
        ...state,
        loading: true,
      };
    case type.GET_TEMPLATE:
      return {
        ...state,
        loading: false,
        filtering: false,
        form_template: action.payload.templates,
        // filter_form_template: [],
        total: action.payload.total,
        failed: null,
      };
    case type.GET_TEMPLATE_ERROR:
      return {
        ...state,
        loading: false,
        filtering: false,
        failed: action.payload,
      };
    case type.FILTER_TEMPLATE:
      return {
        ...state,
        loading: false,
        filtering: true,
        filter_data: action.payload.filter_data,
        // form_template: [],
        filter_form_template: action.payload.result,
        total: action.payload.total,
      };
    case type.FILTER_ERROR:
      return {
        ...state,
        loading: false,
        filtering: true,
        failed: action.payload,
      };
    default:
      return state;
  }
};

export default templateReducer;
