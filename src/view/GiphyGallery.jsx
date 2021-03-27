import React, { useEffect, useState } from "react";
import GifCard from "../components/GifCard.jsx";
import AppConstants from "../constants/AppConstants.js";
import { fetchGifs } from "../utils/FetchGifs.js";

export default function GiphyGallery() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchGifs(AppConstants.GIPHY_TRENDING_ENDPOINT, AppConstants.API_KEY, 0, 2)
      .then(data => {
        console.log("mmm data = ", data);
        setGifs(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="container bg-light d-flex flex-wrap justify-content-evenly">
        {
          gifs.map(gif => (
            <div key={gif.id} className="col-6 col-md-4 col-lg-3 my-3">
              <GifCard
                imgSrc="https://media4.giphy.com/media/IrrYlFmpivxthPksfh/200.gif?cid=1405890bx3dbf14mp804pe78sqmpxxggyqz6p5pmz9yfw0t8&rid=200.gif"
                numView={7693}
                numComment={30}
                numLove={901}
                authorImgUrl="https://media3.giphy.com/channel_assets/snl/FNmjSGabYyy5.jpg"
                authorProfileUrl="#"
                authorUsername="username"
              />
            </div>
          ))
        }
      </div>
    </>
  );
}

GiphyGallery.propTypes = {
};
