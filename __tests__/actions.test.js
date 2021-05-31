import * as actions from "../src/store/actions/action.creator";

// optional; test for app mode
describe("test for app mode action", () => {
  it("should return the theme type", () => {
    expect(actions.appMode({ theme: true })).toMatchSnapshot();
  });

  it("should check nothing is passed", () => {
    expect(actions.appMode({})).toMatchSnapshot();
  });
});

// test async reduc
describe("test async redux", () => {
  // custom mock function
  const fetchTemplate = (data) => {
    if (data.length > 0) {
      return data;
    } else {
      throw new Error("an error occured");
    }
  };

  // test when request is first sent
  it("should test that it dispatches LOADING", async () => {
    let mocDispatcher = jest.fn();

    await actions.getTemplates()(mocDispatcher);
    expect(mocDispatcher.mock.calls[0]).toMatchSnapshot();
  });

  // test if request comes back as successful and it dispatches GET_TEMPLATES
  it("should test that it dispatches GET_TEMPLATE", async () => {
    let mocDispatcher = jest.fn();

    const data = [
      { id: 1, template_name: "lorem ipsum", description: "lorem ipsum dolor" },
    ];
    await actions.getTemplates(data, fetchTemplate)(mocDispatcher);
    expect(mocDispatcher.mock.calls[1]).toMatchSnapshot();
  });

  // test if request fails and it dispatches GET_TEMPLATE_ERROR
  it("should test that it dispatches GET_TEMPLATE_ERROR", async () => {
    let mocDispatcher = jest.fn();

    await actions.getTemplates([], fetchTemplate)(mocDispatcher);
    expect(mocDispatcher.mock.calls[1]).toMatchSnapshot();
  });
});

// run test for filteration
describe("test filteration", () => {
  let mocDispatcher = jest.fn();

  const templateFilter = (filter_type, templates) => {
    if (filter_type != "" && templates.length > 0) {
      return { filter_type, templates };
    } else {
      throw new Error("an error occured");
    }
  };

  it("should test that it dispatches LOADING", async () => {
    await actions.filterTemplate()(mocDispatcher);
    expect(mocDispatcher.mock.calls[0]).toMatchSnapshot();
  });

  it("should test that it dispatches FILTER_TEMPLATE", async () => {
    const data = [
      { id: 1, template_name: "lorem ipsum", description: "lorem ipsum dolor" },
    ];
    await actions.filterTemplate(
      "Education",
      data,
      templateFilter
    )(mocDispatcher);

    expect(mocDispatcher.mock.calls[1]).toMatchSnapshot();
  });

  it("should test that it dispatches FILTER_ERROR", async () => {
    await actions.filterTemplate("", [], templateFilter)(mocDispatcher);
    expect(mocDispatcher.mock.calls[1]).toMatchSnapshot();
  });
});
