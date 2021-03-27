/**
 * Safely extracting gif data.
 */
export function extractGifsData(httpResponse) {
  const responseData = httpResponse.data;
  if (!responseData) {
    throw new Error("No response data found");
  }
  const { data, pagination } = responseData;
  if (!data) {
    throw new Error("No gif data found");
  }

  return { gifsData: data, pagination };
}

/**
 * Truncate unnecessary meta data.
 */
export function truncateGifData(gifData) {
  const { id, title, images, user } = gifData;
  if (!images) {
    // because 'images' is required data
    throw new Error("no gif images found");
  }
  const { fixed_height, original } = images;
  let result = { id, title, gif: { fixed_height, original } };

  if (user) {
    const { avatar_url, username, profile_url } = user;
    result = { ...result, user: { avatar_url, username, profile_url } };
  }

  return result;
}
