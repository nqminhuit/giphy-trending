import React, { useContext } from "react";
import { useHistory } from "react-router";
import { isNotBlank } from "../utils/ContentValidationUtils.js";
import Icon from "./common/Icon.jsx";
import { GifMetaDataContext } from "./GifCard.jsx";

export default function GifMeta() {
  const history = useHistory();
  const { imgId, imgOrgriginalSrc, numView, numComment, numLove } = useContext(GifMetaDataContext);

  return (
    <div className="d-flex justify-content-between px-1 mb-1">
      <Icon iconClass="bi bi-paperclip" />
      <div>
        {isNotBlank(numView) &&
          <Icon
            className="me-3"
            iconClass="bi bi-eye-fill"
            description={numView}
            handleOnClick={() => history.push(`view/${imgId}`, { gifOriginUrl: imgOrgriginalSrc })}
          />
        }
        {isNotBlank(numComment) &&
          <Icon
            className="me-3"
            iconClass="bi bi-chat-quote-fill"
            description={numComment}
          />
        }
        {isNotBlank(numLove) &&
          <Icon
            className="pe-1"
            iconClass="bi bi-heart-fill"
            description={numLove}
          />
        }
      </div>
    </div>
  );

}
