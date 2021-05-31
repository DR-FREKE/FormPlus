import { fetchTemplateData, filterTemplateData } from "../../api/template.api";
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
      dispatch({ type: type.GET_TEMPLATE_ERROR, payload: error.message });
    }
  };

// also add dependency injection here to test for filteration
export const filterTemplate =
  (templates, filter_data, filterFn = filterTemplateData) =>
  async (dispatch) => {
    dispatch({ type: type.LOADING });
    try {
      const { result, total } = await filterFn(templates, filter_data);
      dispatch({
        type: type.FILTER_TEMPLATE,
        payload: { result, total, filter_data },
      });
    } catch (error) {
      dispatch({ type: type.FILTER_ERROR, payload: error.message });
    }
  };
