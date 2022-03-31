import React from "react";

const Button = ({ text, event, bgColor, textColor }) => {
  return (
    <div
      type="button"
      className={`shadow-md border-solid ${textColor} ${bgColor} w-32 mx-4 my-6 p-2`}
      onClick={event}
    >
      {text}
    </div>
  );
};

export default Button;
