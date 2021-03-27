import axios from "axios";

export function fetchGifs(apiEndpoint, api_key, offset, limit) {
  return new Promise((resolve, reject) => {
    axios.get(apiEndpoint, { params: { api_key, offset, limit, } })
      .then(result => {
        const gifsData = extractGifsData(result);
        const truncatedGifs = gifsData.map(truncateGifData);
        resolve(truncatedGifs);
      })
      .catch(reject);
  });
}

/**
 * Safely extracting gif data.
 */
function extractGifsData(httpResponse) {
  const responseData = httpResponse.data;
  if (!responseData) {
    throw new Error("No response data found");
  }

  const gifsData = responseData.data;
  if (!gifsData) {
    throw new Error("No gif data found");
  }

  return gifsData;
}

/**
 * Truncate unnecessary meta data.
 */
function truncateGifData(gifData) {
  const { id, images, user } = gifData;
  if (!images) {
    // because images is required data
    throw new Error("no gif images found");
  }
  const { fixed_height, original } = images;
  let result = { id, gif: { fixed_height, original } };

  if (user) {
    const { avatar_url, username, profile_url } = user;
    result = { ...result, user: { avatar_url, username, profile_url } };
  }

  return result;
}
