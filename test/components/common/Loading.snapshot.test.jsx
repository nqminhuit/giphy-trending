import React from "react";
import renderer from "react-test-renderer";
import Loading from "../../../src/components/common/Loading.jsx";

it("should render <Loading />", () => {
  const component = renderer.create(<Loading />).toJSON();
  expect(component).toMatchSnapshot();
});
