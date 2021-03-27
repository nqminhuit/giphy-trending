import PropTypes from "prop-types";
import React from "react";
import { viewImage } from "../utils/ImageMetaUtils.js";
import GifMeta from "./GifMeta.jsx";

export default function GifCard({ imgSrc, numView, numComment, numLove, authorProfileUrl, authorUsername }) {

  return (
    imgSrc
      ? (
        <div className="w-75 m-auto">
          <div className="d-flex flex-column justify-content-between h-200p bg-white shadow py-2">
            <img className="img-fluid p-2 cursor-pointer" src={imgSrc} onClick={viewImage} />
            <GifMeta {...{ numView, numComment, numLove }} />
          </div>
          {authorUsername && (
            <div className="my-3">
              <a href={authorProfileUrl} className="text-decoration-none fw-bold cl-royalblue">
                {authorUsername}
              </a>
            </div>
          )}
        </div>
      )
      : null
  );

}

GifCard.propTypes = {
  imgSrc: PropTypes.string,
  authorProfileUrl: PropTypes.string,
};
