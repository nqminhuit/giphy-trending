import PropTypes from "prop-types";
import React from "react";

export default function Icon({ className, iconClass, description, handleOnClick }) {

  return (
    <span
      className={className + " cursor-pointer text-black-50 text-hover-royalblue"} // TODO fix undefined className
      onClick={handleOnClick}
    >
      <i className={iconClass}>{description}</i>
    </span>
  );

}

Icon.propTypes = {
  iconClass: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleOnClick: PropTypes.func,
};
