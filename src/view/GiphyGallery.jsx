import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../components/common/CommonSlice.js";
import GifCard, { GifMetaDataContext } from "../components/GifCard.jsx";
import Constants from "../constants/AppConstants.js";
import { fetchGifs } from "../controllers/FetchGifs.js";
import { fetchMoreGifs } from "../utils/InfiniteScrollEventHandler.js";
import { randomNumber } from "../utils/RandomNumber.js";

export default function GiphyGallery() {
  const [allGifs, setAllGifs] = useState(null);
  const [renderedGifs, setRenderedGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canFetch, setCanFetch] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler);
    return function cleanUpScrollEvent() {
      window.removeEventListener("scroll", scrollEventHandler);
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
    if (loading === true) {
      dispatch(toggleLoading(true));
      return;
    }

    if (loading === false && allGifs !== null && allGifs.paging !== null && allGifs.gifs && allGifs.gifs.length > 0) {
      dispatch(toggleLoading(false));
      setRenderedGifs(rendereds => {
        const loadingGifs = extractLoadingGifs(allGifs.gifs, allGifs.paging.count);
        const renderLoadingGifs = renderGifs(loadingGifs, false);
        return rendereds.concat(renderLoadingGifs);
      });
    }
  }, [allGifs, loading, dispatch]);

  useEffect(() => setCanFetch(true), [renderedGifs]);

  const scrollEventHandler = () => {
    if (!allGifs || !canFetch) {
      return;
    }
    const paging = allGifs.paging;
    fetchMoreGifs(paging, setAllGifs, setLoading, setCanFetch, fetchGifs, document.documentElement);
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Giphy Trending!</h1>
      <div className="bg-light d-flex flex-wrap justify-content-evenly">
        {renderedGifs}
      </div>
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
