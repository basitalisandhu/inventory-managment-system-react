import React from "react";
import "./style.scss";

const ButtonSecondary = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} type={type} className="button-secondary">
      {text}
    </button>
  );
};

export default ButtonSecondary;
