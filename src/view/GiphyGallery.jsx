import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import GifCard, { GifMetaDataContext } from "../components/GifCard.jsx";
import Constants from "../constants/AppConstants.js";
import { fetchGifs } from "../controllers/FetchGifs.js";
import { randomNumber } from "../utils/RandomNumber.js";

export default function GiphyGallery() {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [paging, setPaging] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", fetchMoreGifs);
    return function cleanUpScrollEvent() {
      window.removeEventListener("scroll", fetchMoreGifs);
    };
  });

  useEffect(() => {
    setLoading(true);
    fetchGifs(Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, offset, Constants.LIMIT_GIFS_PER_LOAD)
      .then(({ truncatedGifs: newGifs, pagination }) => {
        setGifs(oldGifs => oldGifs.concat(newGifs));
        setPaging(pagination);
      })
      .catch(console.error)
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, [offset]);

  const fetchMoreGifs = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const { total_count, count, offset: pagingOffset } = paging;
    if (scrollTop + clientHeight >= scrollHeight - 5 && pagingOffset + count < total_count) {
      setTimeout(() => setOffset(offset + count), 200);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="bg-light d-flex flex-wrap justify-content-evenly">
        {
          gifs.map(gifItem => {
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
                  {loading
                    ? (
                      <Skeleton>
                        <div className="gif-card-fixed-height">
                          <GifCard />
                        </div>
                      </Skeleton>
                    )
                    : <GifCard />
                  }
                </GifMetaDataContext.Provider>
              </div>
            );
          })
        }
      </div>
    </div >
  );
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
