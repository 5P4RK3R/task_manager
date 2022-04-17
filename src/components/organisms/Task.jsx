import React from "react";
import CardHeader from "../atoms/CardHeader";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Trash from "../atoms/Trash";
import { useSelector, useDispatch } from "react-redux";
import {
  setTask,
  selectTask,
  addTask,
  removeTask,
  updateTask,
} from "../../storeManager/slices/taskSlice";
import { sectohrs } from "../../utils/sectohrs";
import Update from "../atoms/Update";
const Task = ({ users, taskDetail, id, auth, index }) => {
  const task = useSelector(selectTask);
  const dispatch = useDispatch();
  const setTaskDetail = ({ target }) => {
    dispatch(setTask(target, index));
  };

  const toggleTask = () => {
    dispatch(setTask({ name: "modified", value: null }, id));
  };
  const saveTask = () => {
    taskDetail.modified_by
      ? dispatch(updateTask(auth.companyId, auth.authToken, taskDetail))
      : dispatch(addTask(auth.companyId, auth.authToken, taskDetail));
  };

  const deleteTask = () => {
    dispatch(removeTask(auth, id));
  };

  const cancelTask = () => {
    Object.values(taskDetail).filter(Boolean).length
      ? null
      : dispatch(deleteTask(id));
    dispatch(setTask({ name: "modified", value: true }, id));
  };

  return (
    <div className="flex flex-col m-4 shadow-md border-solid border-2 w-96">
      <CardHeader id={index} />
      {!taskDetail.modified ? (
        <div className="bg-sky-100">
          <div className=" my-4 ">
            <Input
              id="task_msg"
              type="text"
              label=" Task Description"
              event={setTaskDetail}
              value={taskDetail.task_msg}
            />
            <div className="flex flex-row my-4 justify-between">
              <Input
                id="task_date"
                type="date"
                label="Date"
                event={setTaskDetail}
                value={taskDetail.task_date}
              />
              <Input
                id="task_time"
                type="time"
                label="Time"
                event={setTaskDetail}
                value={
                  Number.isInteger(taskDetail.task_time)
                    ? sectohrs(taskDetail.task_time)
                    : taskDetail.task_time
                }
              />
            </div>
            <Select
              id="assigned_user"
              type="time"
              label="Assign Users"
              value={taskDetail.assigned_user}
              event={setTaskDetail}
              options={users}
            />
          </div>
          <div className="flex flex-row justify-evenly">
            {taskDetail.modified_by ? <Trash event={deleteTask} /> : null}
            <div className="flex">
              <Button event={cancelTask} bgColor="bg-white" text="Cancel" />
              <Button
                event={saveTask}
                bgColor="bg-green-400"
                textColor="text-white"
                text="Save"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center  p-4 w-96 bg-white justify-between">
          {taskDetail.assigned_user_icon ? (
            <img
              className="w-12 h-12 object-cover"
              src={taskDetail.assigned_user_icon}
            />
          ) : null}
          <div className="flex flex-col">
            <p>{taskDetail.assigned_user}</p>
            <p>{sectohrs(taskDetail.task_time)}</p>
          </div>
          <Update event={toggleTask} />
        </div>
      )}
    </div>
  );
};

export default Task;
