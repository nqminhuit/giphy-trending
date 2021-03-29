import React, { useContext } from "react";
import { useHistory } from "react-router";
import GifAuthorInfo from "./GifAuthorInfo.jsx";
import GifMeta from "./GifMeta.jsx";

export const GifMetaDataContext = React.createContext(null);

export default function GifCard() {
  const history = useHistory();
  const { imgId, imgTitle, imgSrc, imgOrgriginalSrc } = useContext(GifMetaDataContext);

  return (
    <>
      {imgSrc && (
        <div className="w-95 m-auto font-size-small">
          <div className="d-flex flex-column bg-white shadow gif-card-fixed-height">
            <div className="d-flex flex-grow-1 mx-auto overflow-hidden">
              <img
                className="img-fluid gif-card-max-height p-2 cursor-pointer align-self-center fit-contain hover-scale transition-eio-3"
                src={imgSrc}
                alt={imgTitle}
                onClick={() => history.push(`view/${imgId}`, { gifOriginUrl: imgOrgriginalSrc })}
              />
            </div>
            <GifMeta />
          </div>
          <GifAuthorInfo />
        </div>
      )}
    </>
  );

}
