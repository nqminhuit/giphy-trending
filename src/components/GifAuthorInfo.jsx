import React, { useContext } from "react";
import { GifMetaDataContext } from "./GifCard.jsx";

export default function GifAuthorInfo() {
  const { authorAvatarUrl, authorProfileUrl, authorUsername } = useContext(GifMetaDataContext);
  const usernameTrimed = authorUsername.trim();
  return (
    <>
      {usernameTrimed && (
        <div className="mt-2 ms-2">
          <a
            className="text-decoration-none fw-bold cl-royalblue"
            href={authorProfileUrl.trim() || "#"}
            target="_blank"
            rel="noreferrer"
          >
            {authorAvatarUrl.trim() &&
              <img
                className="max-height-1rem rounded-circle me-1"
                src={authorAvatarUrl}
                alt="giphy author image"
              />
            }
            {usernameTrimed}
          </a>
        </div>
      )}
    </>
  );
}
