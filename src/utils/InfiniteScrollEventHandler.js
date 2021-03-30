import Constants from "../constants/AppConstants.js";

export function fetchMoreGifs(paging, setAllGifs, setLoading, setCanFetch, fetchGifs, documentElement) {
  if (!canFetchScroll(paging, documentElement)) {
    return;
  }

  setLoading(true);
  setCanFetch(false);
  if (paging) {
    fetchGifs(
      Constants.GIPHY_TRENDING_ENDPOINT,
      Constants.API_KEY,
      paging.offset + paging.count,
      Constants.LIMIT_GIFS_PER_LOAD
    )
      .then(({ truncatedGifs: newGifs, pagination }) => {
        if (newGifs && newGifs.length > 0) {
          setAllGifs(oldState => ({ gifs: oldState.gifs.concat(newGifs), paging: pagination }));
        }
      })
      .catch(() => {
        throw new Error("error when fetching gifs");
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1500);
      });
  }
}

function canFetchScroll(paging, documentElement) {
  const { total_count, count, offset: pagingOffset } = paging;
  const isNotLastOffset = pagingOffset + count < total_count;

  const { scrollTop, scrollHeight, clientHeight } = documentElement;
  const isAtBottomPage = scrollTop + clientHeight >= scrollHeight - 250;

  return isNotLastOffset && isAtBottomPage;
}
