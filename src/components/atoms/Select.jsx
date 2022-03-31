import React, { useEffect } from "react";
const Select = ({ label, id, options, event, value }) => {
  useEffect(() => {
    return () => {};
  }, [options]);

  return (
    <div className="flex flex-col mx-4">
      <label className="flex justify-start" htmlFor={id}>
        {label}
      </label>

      <select
        className="shadow-md border-solid border-2 "
        name={id}
        id={id}
        value={value}
        onChange={event}
      >
        {options &&
          options?.map((val, i) => (
            <option key={i} value={val.name}>
              {val.name}
            </option>
          ))}
      </select>
    </div>
  );
};
export default Select;
