import React from "react";

const Button = ({ label, handleClick, buttonStyle }) => (
  <button className="btn btn-default" style={buttonStyle} onClick={handleClick}>
    {label}
  </button>
);

export default Button;