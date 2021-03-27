import PropTypes from "prop-types";
import React from "react";

export default function GifAuthorInfo({ authorImgUrl, authorProfileUrl, authorUsername }) {

  return (
    <>
      {authorUsername && (
        <div className="mt-2 ms-2">
          <a href={authorProfileUrl} className="text-decoration-none fw-bold cl-royalblue">
            {authorImgUrl &&
              <img
                className="max-height-1rem rounded-circle me-1"
                src={authorImgUrl}
                alt="giphy author image"
              />
            }
            {authorUsername}
          </a>
        </div>
      )}
    </>
  );
}

GifAuthorInfo.propTypes = {
  authorImgUrl: PropTypes.string,
  authorProfileUrl: PropTypes.string,
  authorUsername: PropTypes.string,
};
