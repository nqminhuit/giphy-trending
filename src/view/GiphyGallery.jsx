import React from "react";
import GifCard from "../components/GifCard.jsx";

export default function GiphyGallery() {

  return (
    <>
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="container bg-light d-flex flex-wrap justify-content-evenly">
        {
          gifCards().map(i => (
            <div key={i} className="col-6 col-md-4 col-lg-3 my-3">
              <GifCard
                imgSrc="https://media3.giphy.com/media/r3Q4NsodpaSpwsOzmF/200_s.gif?cid=1405890bx3dbf14mp804pe78sqmpxxggyqz6p5pmz9yfw0t8&rid=200_s.gif"
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

function gifCards() {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(i);
  }
  return cards;
}

GiphyGallery.propTypes = {
};
