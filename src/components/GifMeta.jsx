import PropTypes from "prop-types";
import React from "react";
import { isNotBlank } from "../utils/ContentValidationUtils.js";
import { commentImage, loveImage, saveImage, viewImage } from "../utils/ImageMetaUtils.js";
import Icon from "./common/Icon.jsx";

export default function GifMeta({ numView, numComment, numLove }) {

  return (
    <div className="d-flex justify-content-between px-1 mb-1">
      <Icon iconClass="bi bi-paperclip" handleOnClick={saveImage} />
      <div>
        {isNotBlank(numView) &&
          <Icon
            className="me-3"
            iconClass="bi bi-eye-fill"
            description={numView}
            handleOnClick={viewImage}
          />
        }
        {isNotBlank(numComment) &&
          <Icon
            className="me-3"
            iconClass="bi bi-chat-quote-fill"
            description={numComment}
            handleOnClick={commentImage}
          />
        }
        {isNotBlank(numLove) &&
          <Icon
            className="pe-1"
            iconClass="bi bi-heart-fill"
            description={numLove}
            handleOnClick={loveImage}
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
};
