import { extractGifsData, truncateGifData } from "../../src/utils/ResponseProcessingUtils.js";
import mockHttpResponse from "./__mock__/mockHttpResponse.json";

describe("test extractGifsData", () => {
  it("should extract Gifs Data correctly", () => {
    const data = extractGifsData(mockHttpResponse);
    expect(data).not.toBeNull();

    const { gifsData, pagination } = data;
    expect(gifsData).not.toBeNull();
    expect(pagination).not.toBeNull();

    expect(pagination).toMatchObject({ total_count: 111561, count: 2, offset: 0 });
    expect(gifsData).toHaveLength(2);

    const gifsDataTruncated = gifsData.map(gif => ({ gifId: gif.id, gifTitle: gif.title, user: gif.user, images: gif.images }));
    const gifIds = gifsDataTruncated.map(item => item.gifId);
    expect(gifIds).toContain("KD8Ldwzx90X9hi9QHW");
    expect(gifIds).toContain("WoifpFfPMrbQG875JC");

    const gifTitles = gifsDataTruncated.map(item => item.gifTitle);
    expect(gifTitles).toContain("Wake Up Sleeping GIF by The Creamlovers");
    expect(gifTitles).toContain("Tired At Home GIF by IKEA USA");

    const gifUsers = gifsDataTruncated.map(item => ({
      avatar_url: item.user.avatar_url,
      username: item.user.username,
      profile_url: item.user.profile_url
    }));
    const avatarUrls = gifUsers.map(user => user.avatar_url);
    expect(avatarUrls).toContain("https://media4.giphy.com/avatars/IKEAUSA/cSMrv32MRdWa.png");
    expect(avatarUrls).toContain("https://media0.giphy.com/avatars/Creamlovers/5NOufBa97ZA6.gif");
    const usernames = gifUsers.map(user => user.username);
    expect(usernames).toContain("IKEAUSA");
    expect(usernames).toContain("Creamlovers");
    const profileUrls = gifUsers.map(user => user.profile_url);
    expect(profileUrls).toContain("https://giphy.com/IKEAUSA/");
    expect(profileUrls).toContain("https://giphy.com/Creamlovers/");

    const allImages = gifsDataTruncated.map(item => ({ fixed_height: item.images.fixed_height, original: item.images.original }));
    expect(allImages).toHaveLength(2);
    const fixedHeightGifs = allImages.map(img => img.fixed_height);
    expect(fixedHeightGifs).toContain(mockHttpResponse.data.data[0].images.fixed_height);
    expect(fixedHeightGifs).toContain(mockHttpResponse.data.data[1].images.fixed_height);
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
      title: 'test_title',
      gif: {
        fixed_height: { some_properties: 'some_props_fixed_height' },
        original: { some_properties: 'some_props_original' }
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
      title: 'test_title',
      gif: {
        fixed_height: { some_properties: 'some_props_fixed_height' },
        original: { some_properties: 'some_props_original' }
      }
    });
  });

  it("should truncate gif data correctly with full user", () => {
    const mockGifData = {
      id: 1,
      title: "test_title",
      someOtherThing: "fooobarrr",
      user: {
        "avatar_url": "https://media4.giphy.com/avatars/IKEAUSA/cSMrv32MRdWa.png",
        "banner_image": "https://media4.giphy.com/headers/IKEAUSA/zR9tYDflbD6q.png",
        "banner_url": "https://media4.giphy.com/headers/IKEAUSA/zR9tYDflbD6q.png",
        "profile_url": "https://giphy.com/IKEAUSA/",
        "username": "IKEAUSA",
        "display_name": "IKEA USA",
        "description": "With rising stress in the modern world, a good night’s sleep is nearly extinct...",
        "instagram_url": "",
        "website_url": "https://www.ikea.com/us/en/rooms/bedroom/save-our-sleep-pub66edfe20",
        "is_verified": true
      },
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
      title: 'test_title',
      gif: {
        fixed_height: { some_properties: 'some_props_fixed_height' },
        original: { some_properties: 'some_props_original' }
      },
      user: {
        avatar_url: "https://media4.giphy.com/avatars/IKEAUSA/cSMrv32MRdWa.png",
        profile_url: "https://giphy.com/IKEAUSA/",
        username: "IKEAUSA",
      }
    });
  });
});
