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
    <>
      {imgSrc && (
        <div className="w-95 m-auto font-size-small">
          <div className="d-flex flex-column bg-white shadow gif-card-fixed-height">
            <div className="d-flex flex-grow-1 mx-auto">
              <img
                className="img-fluid gif-card-max-height p-2 cursor-pointer align-self-center fit-contain"
                src={imgSrc}
                onClick={viewImage}
              />
            </div>
            <GifMeta {...{ numView, numComment, numLove }} />
          </div>
          <GifAuthorInfo {...{ authorImgUrl, authorProfileUrl, authorUsername }} />
        </div>
      )}
    </>
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
