import React from "react";
import renderer from "react-test-renderer";
import GifCard, { GifMetaDataContext } from "../../src/components/GifCard.jsx";

it("should render <GifCard />", () => {
  const component = renderer.create(
    <GifMetaDataContext.Provider value={{
      imgId: "38e10e68-1749-426e-8988-f1d578ee87cf",
      imgSrc: "https://www.gif.fixed_height.webp",
      imgOrgriginalSrc: "https://www.gif.original/url",
      imgTitle: "title",
      numView: 10_000,
      numComment: 100,
      numLove: 1000,
      authorAvatarUrl: "https://www.author.avatar.url",
      authorProfileUrl: "https://www.author.profile.url",
      authorUsername: "username",
    }}>
      <GifCard />
    </GifMetaDataContext.Provider>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
