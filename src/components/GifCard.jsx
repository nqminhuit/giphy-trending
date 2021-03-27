import PropTypes from "prop-types";
import React from "react";
import { viewImage } from "../utils/ImageMetaUtils.js";
import GifAuthorInfo from "./GifAuthorInfo.jsx";
import GifMeta from "./GifMeta.jsx";

// TODO introduce context to avoid props drilling
export default function GifCard({
  imgSrc, numView, numComment, numLove, authorImgUrl, authorProfileUrl, authorUsername
}) {

  return (
    imgSrc
      ? (
        <div className="w-95 m-auto font-size-small">
          <div className="d-flex flex-column justify-content-between bg-white shadow py-2">
            <img className="img-fluid p-2 cursor-pointer" src={imgSrc} onClick={viewImage} />
            <GifMeta {...{ numView, numComment, numLove }} />
          </div>
          <GifAuthorInfo {...{ authorImgUrl, authorProfileUrl, authorUsername }} />
        </div>
      )
      : null
  );

}

GifCard.propTypes = {
  imgSrc: PropTypes.string,
  numView: PropTypes.number,
  numComment: PropTypes.number,
  numLove: PropTypes.number,
  authorImgUrl: PropTypes.string,
  authorProfileUrl: PropTypes.string,
  authorUsername: PropTypes.string,
};
