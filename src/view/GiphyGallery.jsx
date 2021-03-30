import React, { useEffect, useState } from "react";
import Loading from "../components/common/Loading.jsx";
import GifCard, { GifMetaDataContext } from "../components/GifCard.jsx";
import Constants from "../constants/AppConstants.js";
import { fetchGifs } from "../controllers/FetchGifs.js";
import { randomNumber } from "../utils/RandomNumber.js";

export default function GiphyGallery() {
  const [allGifs, setAllGifs] = useState(null);
  const [renderedGifs, setRenderedGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canFetch, setCanFetch] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", fetchMoreGifs);
    return function cleanUpScrollEvent() {
      window.removeEventListener("scroll", fetchMoreGifs);
    };
  });

  useEffect(() => {
    let timeoutId = null;
    setLoading(true);
    fetchGifs(Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, 0, Constants.LIMIT_GIFS_PER_LOAD)
      .then(({ truncatedGifs: newGifs, pagination }) => {
        if (newGifs && newGifs.length > 0) {
          setAllGifs({ gifs: newGifs, paging: pagination });
        }
      })
      .catch(() => {
        throw new Error("error when fetching gifs");
      })
      .finally(() => {
        timeoutId = setTimeout(() => setLoading(false), 1500);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (loading === false && allGifs !== null && allGifs.paging !== null && allGifs.gifs && allGifs.gifs.length > 0) {
      setRenderedGifs(rendereds => {
        const loadingGifs = extractLoadingGifs(allGifs.gifs, allGifs.paging.count);
        const renderLoadingGifs = renderGifs(loadingGifs, false);
        return rendereds.concat(renderLoadingGifs);
      });
    }
  }, [allGifs, loading]);

  useEffect(() => setCanFetch(true), [renderedGifs]);

  const fetchMoreGifs = () => {
    if (!allGifs) {
      return;
    }

    const paging = allGifs.paging;
    if (!canFetchScroll(paging, document.documentElement)) {
      return;
    }

    if (!canFetch) {
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
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Giphy Trending!</h1>
      <div className="bg-light d-flex flex-wrap justify-content-evenly">
        {renderedGifs}
      </div>
      {loading && <Loading />}
    </div >
  );
}

function extractLoadingGifs(allGifs, count) {
  return allGifs.slice(-count);
}

function extractUserInfo(user) {
  let authorAvatarUrl = "", authorProfileUrl = "", authorUsername = "";
  if (user) {
    authorAvatarUrl = user.avatar_url;
    authorProfileUrl = user.profile_url;
    authorUsername = user.username;
  }
  return { authorAvatarUrl, authorProfileUrl, authorUsername };
}

function canFetchScroll(paging, documentElement) {
  const { total_count, count, offset: pagingOffset } = paging;
  const isNotLastOffset = pagingOffset + count < total_count;

  const { scrollTop, scrollHeight, clientHeight } = documentElement;
  const isAtBottomPage = scrollTop + clientHeight >= scrollHeight - 250;

  return isNotLastOffset && isAtBottomPage;
}

function renderGifs(gifs) {
  return gifs.map(gifItem => {
    const { id, user, title, gif } = gifItem;
    const { authorAvatarUrl, authorProfileUrl, authorUsername } = extractUserInfo(user);
    return (
      <div key={id} className="col-6 col-md-4 col-lg-3 my-3">
        <GifMetaDataContext.Provider value={{
          imgId: id,
          imgSrc: gif.fixed_height.webp,
          imgOrgriginalSrc: gif.original.url,
          imgTitle: title,
          numView: randomNumber(0, 10_000), // pretends these numbers are from API
          numComment: randomNumber(0, 100),
          numLove: randomNumber(0, 1000),
          authorAvatarUrl,
          authorProfileUrl,
          authorUsername,
        }}>
          <GifCard />
        </GifMetaDataContext.Provider>
      </div>
    );
  });
}
