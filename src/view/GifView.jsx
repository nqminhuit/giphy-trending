import React from "react";
import { useHistory } from "react-router";

export default function GifView() {
  const history = useHistory();
  if (!history.location) {
    throw new Error("location not found");
  }

  const { state } = history.location;
  if (!state) {
    throw new Error("state not found");
  }

  const { gifOriginUrl } = state;
  return (
    <div className="w-100 h-100 bg-dark position-fixed d-flex">
      {gifOriginUrl
        ? <img className="img-fluid m-auto" src={gifOriginUrl} alt="giphy gif" />
        : <h2 className="text-light m-auto">Gif not found!</h2>
      }
    </div>
  );

}
