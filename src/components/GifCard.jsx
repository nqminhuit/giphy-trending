import React from "react";
import Icon from "./common/Icon.jsx";

export default function GifCard() {

  return (
    <div className="w-75 m-auto">
      <div className="d-flex flex-column justify-content-between h-200p bg-white shadow py-2">
        <img className="img-fluid p-2"
          src="https://media3.giphy.com/media/r3Q4NsodpaSpwsOzmF/200_s.gif?cid=1405890bx3dbf14mp804pe78sqmpxxggyqz6p5pmz9yfw0t8&rid=200_s.gif"></img>
        <div className="d-flex justify-content-between px-1">
          <Icon iconClass="bi bi-paperclip" />
          <div>
            <Icon className="me-3" iconClass="bi bi-eye-fill" description="7693" />
            <Icon className="me-3" iconClass="bi bi-chat-quote-fill" description="30" />
            <Icon className="pe-1" iconClass="bi bi-heart-fill" description="901" />
          </div>
        </div>
      </div>
      <div className="my-3">
        <a href="#" className="text-decoration-none fw-bold cl-royalblue">
          username
        </a>
      </div>
    </div>
  );

}

GifCard.propTypes = {
};
