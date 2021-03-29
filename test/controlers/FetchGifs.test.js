import axios from "axios";
import Constants from "../../src/constants/AppConstants.js";
import { fetchGifs } from "../../src/controllers/FetchGifs.js";
import mockHttpResponse from "../utils/__mock__/mockHttpResponse.json";
import { expectedTruncatedGifData_0, expectedTruncatedGifData_1 } from "./helpers.js";

jest.mock("axios");
axios.get.mockImplementation(() => Promise.resolve(mockHttpResponse));

it("should pass correct params to axios", async () => {
  await fetchGifs(Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, 0, Constants.LIMIT_GIFS_PER_LOAD);
  expect(axios.get)
    .toBeCalledWith(
      Constants.GIPHY_TRENDING_ENDPOINT,
      { "params": { "api_key": Constants.API_KEY, "limit": Constants.LIMIT_GIFS_PER_LOAD, "offset": 0 } }
    );
});

it("should fetch truncated gif data", async () => {
  const { truncatedGifs, pagination } = await fetchGifs(
    Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, 0, Constants.LIMIT_GIFS_PER_LOAD);

  expect(pagination).toEqual({ total_count: 111561, count: 2, offset: 0 });
  expect(truncatedGifs).toHaveLength(2);
  expect(truncatedGifs[0]).toEqual(expectedTruncatedGifData_0);
  expect(truncatedGifs[1]).toEqual(expectedTruncatedGifData_1);
});
