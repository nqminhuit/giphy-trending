import PropTypes from "prop-types";
import React from "react";
import Icon from "./common/Icon.jsx";

export default function GifCard({ imgSrc, numView, numChat, numLove }) {

  return (
    imgSrc
      ? (
        <div className="w-75 m-auto">
          <div className="d-flex flex-column justify-content-between h-200p bg-white shadow py-2">
            <img className="img-fluid p-2" src={imgSrc} />
            <div className="d-flex justify-content-between px-1">
              <Icon iconClass="bi bi-paperclip" />
              <div>
                {numView && <Icon className="me-3" iconClass="bi bi-eye-fill" description={numView} />}
                {numChat && <Icon className="me-3" iconClass="bi bi-chat-quote-fill" description={numChat} />}
                {numLove && <Icon className="pe-1" iconClass="bi bi-heart-fill" description={numLove} />}
              </div>
            </div>
          </div>
          <div className="my-3">
            <a href="#" className="text-decoration-none fw-bold cl-royalblue">
              username
        </a>
          </div>
        </div>
      )
      : null
  );

}

GifCard.propTypes = {
  imgSrc: PropTypes.string,
  numView: PropTypes.number,
  numChat: PropTypes.number,
  numLove: PropTypes.number,
};
