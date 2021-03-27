import React, { useEffect, useState } from "react";
import GifCard from "../components/GifCard.jsx";
import AppConstants from "../constants/AppConstants.js";
import { fetchGifs } from "../controllers/FetchGifs.js";
import { randomNumber } from "../utils/RandomNumber.js";

export default function GiphyGallery() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchGifs(AppConstants.GIPHY_TRENDING_ENDPOINT, AppConstants.API_KEY, 0, 20)
      .then(setGifs)
      .catch(console.error);
  }, []);

  return (
    <>
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="container bg-light d-flex flex-wrap justify-content-evenly">
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
    </>
  );
}
