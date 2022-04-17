import React from "react";

import { useDispatch } from "react-redux";
import { incrementTasks } from "../../storeManager/slices/taskSlice";
const CardHeader = ({ id }) => {
  const dispatch = useDispatch();
  const addtask = () => {
    dispatch(incrementTasks());
  };
  return (
    <div className=" bg-slate-200	justify-evenly shadow-md border-solid border-2 w-96 flex flex-row space-x-4">
      <div className="flex flex-row  w-64">
        <h2 className="mx-4">Task </h2>
        <p>{id} </p>
      </div>
      <div className="flex justify-end w-64" onClick={addtask}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  );
};

export default CardHeader;
