import PropTypes from "prop-types";
import React from "react";

export default function Icon({ className, iconClass, description }) {

  return (
    <span className={className + " cursor-pointer text-black-50 text-hover-royalblue"}>
      <i className={iconClass}>{description}</i>
    </span>
  );

}

Icon.propTypes = {
  iconClass: PropTypes.string,
  description: PropTypes.string,
};
