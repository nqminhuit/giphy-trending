import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";
import GifAuthorInfo from "./GifAuthorInfo.jsx";
import GifMeta from "./GifMeta.jsx";

// TODO introduce context to avoid props drilling
export default function GifCard({
  imgId, imgSrc, imgTitle, numView, numComment, numLove, authorImgUrl, authorProfileUrl, authorUsername,
  imgOrgriginalSrc
}) {
  const history = useHistory();

  return (
    <>
      {imgSrc && (
        <div className="w-95 m-auto font-size-small">
          <div className="d-flex flex-column bg-white shadow gif-card-fixed-height">
            <div className="d-flex flex-grow-1 mx-auto">
              <img
                className="img-fluid gif-card-max-height p-2 cursor-pointer align-self-center fit-contain"
                src={imgSrc}
                alt={imgTitle}
                onClick={() => history.push(`view/${imgId}`, { gifOriginUrl: imgOrgriginalSrc })}
              />
            </div>
            <GifMeta {...{ numView, numComment, numLove, imgId, imgOrgriginalSrc }} />
          </div>
          <GifAuthorInfo {...{ authorImgUrl, authorProfileUrl, authorUsername }} />
        </div>
      )}
    </>
  );

}

GifCard.propTypes = {
  imgSrc: PropTypes.string,
  imgId: PropTypes.string,
  imgOrgriginalSrc: PropTypes.string,
  imgTitle: PropTypes.string,
  numView: PropTypes.number,
  numComment: PropTypes.number,
  numLove: PropTypes.number,
  authorImgUrl: PropTypes.string,
  authorProfileUrl: PropTypes.string,
  authorUsername: PropTypes.string,
};
