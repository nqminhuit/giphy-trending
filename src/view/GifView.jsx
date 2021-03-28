import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";

// TODO:Introducing Error Boundaries: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
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
      <img className="img-fluid m-auto" src={gifOriginUrl} alt="giphy gif" />
    </div>
  );

}

GifView.propTypes = {
  gifUrl: PropTypes.string,
};
