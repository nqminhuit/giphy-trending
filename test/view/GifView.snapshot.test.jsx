import React from "react";
import renderer from "react-test-renderer";
import GifView from "../../src/view/GifView.jsx";

jest.mock("react-router", () => ({
  useHistory: () => ({ location: { state: { gifOriginUrl: "https://www.giphy.com" } } })
}));

it("should render <GifView />", () => {
  const component = renderer.create(<GifView />).toJSON();
  expect(component).toMatchSnapshot();
});
