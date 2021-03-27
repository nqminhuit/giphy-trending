import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";
import { isNotBlank } from "../utils/ContentValidationUtils.js";
import Icon from "./common/Icon.jsx";

export default function GifMeta({ numView, numComment, numLove, imgOrgriginalSrc, imgId }) {
  const history = useHistory();

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

GifMeta.propTypes = {
  numView: PropTypes.number,
  numComment: PropTypes.number,
  numLove: PropTypes.number,
  imgOrgriginalSrc: PropTypes.string,
  imgId: PropTypes.string,
};
