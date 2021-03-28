import axios from "axios";
import { fetchGifs } from "../../src/controllers/FetchGifs.js";
import mockHttpResponse from "../utils/__mock__/mockHttpResponse.json";
import Constants from "../../src/constants/AppConstants.js";

jest.mock("axios");

it("should pass correct params to axios", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockHttpResponse));
  await fetchGifs(Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, 0, Constants.LIMIT_GIFS_PER_LOAD);
  expect(axios.get)
    .toBeCalledWith(
      Constants.GIPHY_TRENDING_ENDPOINT,
      { "params": { "api_key": Constants.API_KEY, "limit": Constants.LIMIT_GIFS_PER_LOAD, "offset": 0 } }
    );
});
