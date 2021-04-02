import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import Loading from "../../../src/components/common/Loading.jsx";
import { mockStore } from "../../helpers/MockStore.js";

it("should render <Loading />", () => {
  const component = renderer.create(
    <Provider store={mockStore(true)}>
      <Loading />
    </Provider>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
