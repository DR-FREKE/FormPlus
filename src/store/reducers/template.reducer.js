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
        original: action.payload.templates,
        total: action.payload.total,
        failed: false,
      };
    case type.FILTER_TEMPLATE:
      return {
        ...state,
        loading: false,
        filtering: true,
        filter_data: action.payload.filter_data,
        form_template: action.payload.result,
        original: action.payload.template,
        total: action.payload.total,
      };
    case type.SORT_BY_ORDER:
      return {
        ...state,
        loading: false,
        date_sorting: false,
        sorting: true,
        form_template: action.payload.result,
        original: action.payload.template,
      };
    case type.SORT_BY_DATE:
      return {
        ...state,
        loading: false,
        sorting: false,
        date_sorting: true,
        form_template: action.payload.result,
      };
    case type.SEARCH_TEMPLATE:
      return {
        ...state,
        loading: false,
        searching: true,
        failed: "",
        form_template: action.payload.result,
        total: action.payload.total,
      };
    case type.GET_ERROR:
      return {
        ...state,
        loading: false,
        searching: false,
        failed: true,
        failed_message: action.payload,
      };
    default:
      return state;
  }
};

export default templateReducer;
