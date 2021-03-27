import PropTypes from "prop-types";
import React from "react";

export default function Icon({ className, iconClass, description }) {

  return <i className={iconClass + " " + className}>{description}</i>;

}

Icon.propTypes = {
  iconClass: PropTypes.string,
  description: PropTypes.string,
};
