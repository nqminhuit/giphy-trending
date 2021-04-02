import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import App from "../../src/App.jsx";
import { mockStore } from "../helpers/MockStore.js";

it("should render <App />", () => {
  const component = renderer.create(
    <Provider store={mockStore()}>
      <App />
    </Provider>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
