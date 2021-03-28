import React from "react";

export default function Loading() {

  return (
    <div className="position-sticky bottom-0 bg-light d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status" />
      <div className="spinner-grow text-secondary" role="status" />
      <div className="spinner-grow text-success" role="status" />
      <div className="spinner-grow text-danger" role="status" />
      <div className="spinner-grow text-warning" role="status" />
      <div className="spinner-grow text-info" role="status" />
    </div>
  );

}
