import React from "react";
import renderer from "react-test-renderer";
import App from "../../src/App.jsx";

it("should render <App />", () => {
  const component = renderer.create(<App />).toJSON();
  expect(component).toMatchSnapshot();
});
