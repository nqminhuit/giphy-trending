import React from "react";
import GifCard from "../components/GifCard.jsx";

export default function GiphyGallery() {

  return (
    <>
      <h1 className="text-center">Wellcome to Giphy Trending!</h1>
      <div className="container bg-light d-flex flex-wrap justify-content-evenly">
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
        <div className="col-6 col-md-4 col-lg-3"><GifCard /></div>
      </div>
    </>
  );

}

GiphyGallery.propTypes = {
};
