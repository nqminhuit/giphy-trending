import React from "react";
import renderer from "react-test-renderer";
import Icon from "../../../src/components/common/Icon.jsx";

it("should render <Icon />", () => {
  const component = renderer.create(<Icon
    className="me-3"
    iconClass="bi bi-eye-fill"
    description={1234}
  />).toJSON();
  expect(component).toMatchSnapshot();
});
