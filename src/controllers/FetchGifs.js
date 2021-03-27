import axios from "axios";
import { extractGifsData, truncateGifData } from "../utils/ResponseProcessingUtils.js";

export function fetchGifs(apiEndpoint, api_key, offset, limit) {
  return new Promise((resolve, reject) => {
    axios.get(apiEndpoint, { params: { api_key, offset, limit } })
      .then(result => {
        const gifsData = extractGifsData(result);
        const truncatedGifs = gifsData.map(truncateGifData);
        resolve(truncatedGifs);
      })
      .catch(reject);
  });
}
