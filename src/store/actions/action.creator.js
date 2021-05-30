import * as type from "./action.types";
import { fetchTemplateData, filterTemplateData } from "../../api/template.api";

export const appMode = (payload) => ({
  type: type.APP_MODE,
  payload,
});

export const getTemplates = () => async (dispatch) => {
  dispatch({ type: type.LOADING });
  try {
    const { templates, total } = await fetchTemplateData();
    dispatch({ type: type.GET_TEMPLATE, payload: { templates, total } });
  } catch (error) {
    dispatch({ type: type.GET_TEMPLATE_ERROR, payload: error.message });
  }
};

export const filterTemplate = (templates, filter_data) => async (dispatch) => {
  dispatch({ type: type.LOADING });
  try {
    const { result, total } = await filterTemplateData(templates, filter_data);
    dispatch({ type: type.FILTER_TEMPLATE, payload: { result, total } });
  } catch (error) {
    dispatch({ type: type.FILTER_ERROR, payload: error.message });
  }
};
