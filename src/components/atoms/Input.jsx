import React from "react";
const Input = ({ type, id, value, label, event }) => {
  return (
    <div className="flex flex-col mx-4">
      <label className="flex justify-start" htmlFor={id}>
        {label}
      </label>
      <input
        step="1"
        className="shadow-md border-solid border-2 "
        name={id}
        id={id}
        value={value}
        type={type}
        onChange={event}
      ></input>
    </div>
  );
};

export default Input;
