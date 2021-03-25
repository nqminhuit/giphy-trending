import React from "react";
import GifCard from "../components/GifCard.jsx";

export default function GiphyGallery() {

  return (
    <>
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="container bg-light d-flex flex-wrap justify-content-evenly">
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
        <GifCard />
      </div>
    </>
  );

}

GiphyGallery.propTypes = {
};
