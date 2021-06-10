import * as type from "../actions/action.types";

const initialState = {
  failed: false,
  searching: false,
  sorting: false,
  date_sorting: false,
  filtering: false,
  loading: true,
  total: 0,
};
const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
      };
    case type.GET_TEMPLATE:
      return {
        ...state,
        loading: false,
        form_template: action.payload.templates,
        original: action.payload.templates,
        total: action.payload.total,
      };
    case type.FILTER_TEMPLATE:
      return {
        ...state,
        loading: false,
        filtering: true,
        failed: false,
        sorting: false,
        date_sorting: false,
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
        total: action.payload.total,
      };
    case type.SORT_BY_DATE:
      return {
        ...state,
        loading: false,
        sorting: false,
        date_sorting: true,
        form_template: action.payload.result,
        total: action.payload.total,
      };
    case type.SEARCH_TEMPLATE:
      return {
        ...state,
        loading: false,
        filtering: false,
        searching: true,
        failed: false,
        form_template: action.payload.result,
        original: action.payload.template,
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
