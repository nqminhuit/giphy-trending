import { extractGifsData, truncateGifData } from "../../src/utils/ResponseProcessingUtils.js";
import mockHttpResponse from "./__mock__/mockHttpResponse.json";

describe("test extractGifsData", () => {
  it("should extract Gifs Data correctly", () => {
    const data = extractGifsData(mockHttpResponse);
    expect(data).not.toBeNull();

    const { gifsData, pagination } = data;

    expect(pagination).not.toBeNull();
    expect(pagination).toMatchObject({ total_count: 111561, count: 2, offset: 0 });

    expect(gifsData).not.toBeNull();
    expect(gifsData).toHaveLength(2);

    expect(gifsData[0]).toEqual(mockHttpResponse.data.data[0]);
    expect(gifsData[1]).toEqual(mockHttpResponse.data.data[1]);
  });

  it("should throw error if no httpResponse provided", () => {
    expect(() => extractGifsData(null)).toThrow("No http response found");
  });

  it("should throw error if no responseData provided", () => {
    expect(() => extractGifsData({})).toThrow("No response data found");
  });

  it("should throw error if no responseData provided", () => {
    expect(() => extractGifsData({ data: {} })).toThrow("No gif data found");
  });
});

describe("test truncateGifData", () => {
  it("should throw error if no gifData provided", () => {
    expect(() => truncateGifData(null)).toThrow("No gif data provided");
  });

  it("should throw error if no require 'images' provided", () => {
    expect(() => truncateGifData({ id: 1, title: "test", user: "uuu" })).toThrow("No gif images found");
  });

  it("should truncate gif data correctly without user", () => {
    const mockGifData = {
      id: 1,
      title: "test_title",
      someOtherThing: "fooobarrr",
      images: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        fixed_height_abc: { some_properties: "some_props_fixed_height" },
        fixed_width: { some_properties: "some_props_original" },
        original: { some_properties: "some_props_original" }
      }
    };
    const truncatedData = truncateGifData(mockGifData);
    expect(truncatedData).toEqual({
      id: 1,
      title: "test_title",
      gif: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        original: { some_properties: "some_props_original" }
      }
    });
  });

  it("should truncate gif data correctly with empty user", () => {
    const mockGifData = {
      id: 1,
      title: "test_title",
      someOtherThing: "fooobarrr",
      user: {},
      images: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        fixed_height_abc: { some_properties: "some_props_fixed_height" },
        fixed_width: { some_properties: "some_props_original" },
        original: { some_properties: "some_props_original" }
      }
    };
    const truncatedData = truncateGifData(mockGifData);
    expect(truncatedData).toEqual({
      id: 1,
      title: "test_title",
      gif: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        original: { some_properties: "some_props_original" }
      }
    });
  });

  it("should truncate gif data correctly with full user info", () => {
    const mockGifData = {
      id: 1,
      title: "test_title",
      someOtherThing: "fooobarrr",
      user: mockHttpResponse.data.data[0].user,
      images: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        fixed_height_abc: { some_properties: "some_props_fixed_height" },
        fixed_width: { some_properties: "some_props_original" },
        original: { some_properties: "some_props_original" }
      }
    };
    const truncatedData = truncateGifData(mockGifData);
    expect(truncatedData).toEqual({
      id: 1,
      title: "test_title",
      gif: {
        fixed_height: { some_properties: "some_props_fixed_height" },
        original: { some_properties: "some_props_original" }
      },
      user: {
        avatar_url: "https://media4.giphy.com/avatars/IKEAUSA/cSMrv32MRdWa.png",
        profile_url: "https://giphy.com/IKEAUSA/",
        username: "IKEAUSA",
      }
    });
  });
});
