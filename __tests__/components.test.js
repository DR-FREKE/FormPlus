import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import Header from "../src/components/Header";
import Layout from "../src/components/Layout";
import TemplateBox from "../src/components/TemplateBox";
import TemplateList from "../src/components/TemplateList";

const mockStore = configureStore([]);

/** test for Layout of the page */
describe("test for AppLayout", () => {
  const layout = renderer.create(<Layout />);

  it("should render the Layout component", () => {
    expect(layout.toJSON()).toMatchSnapshot();
  });

  it("should have children", () => {
    const child_length = layout.toJSON().children.length;
    expect(child_length).toBeGreaterThan(0);
  });
});

/** test for the top header */
describe("test for header component", () => {
  const header = renderer.create(<Header />);

  it("should render the Header component", () => {
    expect(header.toJSON()).toMatchSnapshot();
  });

  it("should test input is rendered", () => {
    const input_field = header.root;
    expect(input_field.findByType("input").type).toMatchSnapshot();
  });
});

/** test for template listing */
describe("test for template listing", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      template: {
        filtering: false,
      },
    });
  });
  it("should render template box", () => {
    const template_box = renderer.create(<TemplateBox />).toJSON();
    expect(template_box).toMatchSnapshot();
  });

  it("should render all boxes as list", () => {
    const template_list = renderer
      .create(
        <Provider store={store}>
          <TemplateList />
        </Provider>
      )
      .toJSON();
    expect(template_list).toMatchSnapshot();
  });
});
