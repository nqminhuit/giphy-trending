import React, { useEffect, useState } from "react";
import GifCard from "../components/GifCard.jsx";
import Constants from "../constants/AppConstants.js";
import { fetchGifs } from "../controllers/FetchGifs.js";
import { randomNumber } from "../utils/RandomNumber.js";

export default function GiphyGallery() {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [paging, setPaging] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", fetchMoreGifs);
    return function cleanUpScrollEvent() {
      window.removeEventListener("scroll", fetchMoreGifs);
    };
  });

  useEffect(() => {
    fetchGifs(Constants.GIPHY_TRENDING_ENDPOINT, Constants.API_KEY, offset, Constants.LIMIT_GIFS_PER_LOAD)
      .then(({ truncatedGifs: newGifs, pagination }) => {
        setGifs(oldGifs => oldGifs.concat(newGifs));
        setPaging(pagination);
      })
      .catch(console.error);
  }, [offset]);

  function fetchMoreGifs() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const { total_count, count, offset: pagingOffset } = paging;
    if (scrollTop + clientHeight >= scrollHeight - 10 && pagingOffset + count < total_count) {
      setOffset(offset + count);
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="bg-light d-flex flex-wrap justify-content-evenly">
        {
          gifs.map(gifItem => {
            const { id, user, title, gif } = gifItem;
            return (
              <div key={id} className="col-6 col-md-4 col-lg-3 my-3">
                <GifCard
                  imgSrc={gif.fixed_height.webp}
                  imgTitle={title}
                  numView={randomNumber(0, 10_000)}
                  numComment={randomNumber(0, 100)}
                  numLove={randomNumber(0, 1000)}
                  authorImgUrl={user && user.avatar_url}
                  authorProfileUrl={user && user.profile_url}
                  authorUsername={user && user.username}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
