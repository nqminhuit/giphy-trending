import React from "react";

export default function GifCard() {

  return (
    <div className="w-75 m-auto">
      <div className="h-200p bg-white shadow">
        <img className="img-fluid p-2"
          src="https://media3.giphy.com/media/r3Q4NsodpaSpwsOzmF/200_s.gif?cid=1405890bx3dbf14mp804pe78sqmpxxggyqz6p5pmz9yfw0t8&rid=200_s.gif"></img>
        <div>
          <i className="bi bi-paperclip"></i>
          <i className="bi bi-eye-fill"></i>
          <i className="bi bi-chat-quote-fill"></i>
          <i className="bi bi-heart-fill"></i>
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
