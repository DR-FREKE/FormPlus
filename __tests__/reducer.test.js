import { templateReducer, uiReducer } from "../src/store/reducers";
import * as actions from "../src/store/actions/action.creator";

const initialState = {
  dark_mode: false,
};

describe("test the reducer", () => {
  it("should test for app mode", () => {
    expect(
      uiReducer(initialState, actions.appMode({ theme: false }))
    ).toMatchSnapshot();
  });

  it("should test for default state", () => {
    expect(uiReducer({}, actions.appMode)).toMatchSnapshot();
  });

  it("should test for templateReducer", () => {
    expect(templateReducer({}, actions.getTemplates)).toMatchSnapshot();
  });

  it("should return initial state for templateReducer", () => {
    expect(templateReducer({ loading: true }, actions.getTemplates)).toEqual({
      loading: true,
    });
  });
});
