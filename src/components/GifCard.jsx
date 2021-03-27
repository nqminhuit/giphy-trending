import PropTypes from "prop-types";
import React from "react";
import { isNotBlank } from "../utils/ContentValidationUtils.js";
import Icon from "./common/Icon.jsx";

export default function GifCard({ imgSrc, numView, numComment, numLove, authorProfileUrl, authorUsername }) {

  const saveImage = () => {
    console.log("mmm save image");
  };

  const viewImage = () => {
    console.log("mmm view image");
  };

  const commentImage = () => {
    console.log("mmm comment image");
  };

  const loveImage = () => {
    console.log("mmm love image");
  };

  return (
    imgSrc
      ? (
        <div className="w-75 m-auto">
          <div className="d-flex flex-column justify-content-between h-200p bg-white shadow py-2">
            <img className="img-fluid p-2 cursor-pointer" src={imgSrc} onClick={viewImage} />
            <div className="d-flex justify-content-between px-1">
              <Icon iconClass="bi bi-paperclip" handleOnClick={saveImage} />
              <div>
                {isNotBlank(numView) &&
                  <Icon
                    className="me-3"
                    iconClass="bi bi-eye-fill"
                    description={numView}
                    handleOnClick={viewImage}
                  />
                }
                {isNotBlank(numComment) &&
                  <Icon
                    className="me-3"
                    iconClass="bi bi-chat-quote-fill"
                    description={numComment}
                    handleOnClick={commentImage}
                  />
                }
                {isNotBlank(numLove) &&
                  <Icon
                    className="pe-1"
                    iconClass="bi bi-heart-fill"
                    description={numLove}
                    handleOnClick={loveImage}
                  />
                }
              </div>
            </div>
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
  numView: PropTypes.number,
  numComment: PropTypes.number,
  numLove: PropTypes.number,
  authorProfileUrl: PropTypes.string,
};
