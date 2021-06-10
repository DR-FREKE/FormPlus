import {
  fetchTemplateData,
  filterTemplateData,
  sortByOrder,
  searchTemplateForm,
  sortByDate,
} from "../../api/template.api";
import * as type from "./action.types";

export const appMode = (payload) => ({
  type: type.APP_MODE,
  payload,
});

// add dependency injection so we could test with jest
export const getTemplates =
  (data = null, fetchFn = fetchTemplateData) =>
  async (dispatch) => {
    dispatch({ type: type.LOADING });
    try {
      const { templates, total } = await fetchFn(data);
      dispatch({ type: type.GET_TEMPLATE, payload: { templates, total } });
    } catch (error) {
      dispatch({ type: type.GET_ERROR, payload: error.message });
    }
  };

// also add dependency injection here to test for filteration in jest
export const filterTemplate =
  (template, filter_data, filterFn = filterTemplateData) =>
  async (dispatch) => {
    dispatch({ type: type.LOADING });
    try {
      const { result, total } = await filterFn(template, filter_data);
      filter_data =
        filter_data == "All Templates"
          ? filter_data
          : filter_data + " Templates";
      dispatch({
        type: type.FILTER_TEMPLATE,
        payload: { result, total, filter_data, template },
      });
    } catch (error) {
      dispatch({ type: type.GET_ERROR, payload: error.message });
    }
  };

export const sortTemplateByOrder = (template, value) => async (dispatch) => {
  dispatch({ type: type.LOADING });

  try {
    const { result, total } = await sortByOrder(template, value);
    dispatch({
      type: type.SORT_BY_ORDER,
      payload: { result, total },
    });
  } catch (error) {
    dispatch({ type: type.GET_ERROR, payload: error.message });
  }
};

export const sortTemplateByDate = (template, value) => async (dispatch) => {
  dispatch({ type: type.LOADING });

  try {
    const { result, total } = await sortByDate(template, value);
    dispatch({ type: type.SORT_BY_DATE, payload: { result, total } });
  } catch (error) {
    dispatch({ type: type.GET_ERROR, payload: error.message });
  }
};

export const searchTemplate = (template, value) => async (dispatch) => {
  // dispatch({ type: type.LOADING });

  try {
    const { result, total } = await searchTemplateForm(template, value);
    dispatch({
      type: type.SEARCH_TEMPLATE,
      payload: { result, total, template },
    });
  } catch (error) {
    dispatch({ type: type.GET_ERROR, payload: error.message });
  }
};
