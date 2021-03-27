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
              <GifCard />
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
