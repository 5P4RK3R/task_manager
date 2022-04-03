import React, {useEffect} from "react";
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
  deleteTask,
  decrementTask,
  fetchUsers
} from "../../storeManager/slices/taskSlice";
import { sectohrs } from "../../utils/sectohrs";
import Update from "../atoms/Update";
import { useQuery ,useMutation,useQueryClient } from "react-query";

const Task = ({ taskInfo, auth }) => {
  // const {tasks} = useSelector(selectTask);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {status,data} = useQuery('users',fetchUsers(auth)) 
  // useEffect(() => {
  //   // dispatch(getTasks(data))
  //   return () => {};
  // }, [data]);
  console.log(data)
  const { mutate, isLoading } = useMutation(addTask, {
    onSuccess: data => {
      console.log(data);
      const message = "success"
      console.log(message)
    },
    onError: (err) => {
      console.log(err)
      // alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('delete');
    }
  });
  const setTaskDetail = ({ target:{name,value} }) => {
    dispatch(setTask({name,value,id: taskInfo.id}));
  };

  const updateTask = () => {
    dispatch(setTask({ name: "modified", value: null ,id: taskInfo.id}));

  };
  const saveTask = () => {
    mutate(auth, taskInfo)
    // taskInfo.modified_by
    //   ? dispatch(updateTask(auth, taskInfo))
    //   : dispatch(addTask(auth, taskInfo));
  };

  const deleteTask = () => {
    // mutate(auth, taskInfo.id);
  };

  const cancelTask = () => {
    const {id, ...task} = taskInfo;
    // Object.values(task).filter(Boolean).length
    //   ? null
    //   : dispatch(deleteTask(taskInfo.id));
    Object.values(task).filter(Boolean).length ? dispatch(setTask({ name: "modified", value: true ,id: taskInfo.id}, )) : dispatch(decrementTask({id:taskInfo.id}))
    // dispatch(setTask({ name: "modified", value: true },taskInfo.id));
  };

  return (
    <div className="flex flex-col m-4 shadow-md border-solid border-2 w-96">
      <CardHeader />
      {!taskInfo.modified ? (
        <div className="bg-sky-100">
          <div className=" my-4 ">
            <Input
              id="task_msg"
              type="text"
              label=" Task Description"
              event={setTaskDetail}
              value={taskInfo.task_msg}
            />
            <div className="flex flex-row my-4 justify-between">
              <Input
                id="task_date"
                type="date"
                label="Date"
                event={setTaskDetail}
                value={taskInfo.task_date}
              />
              <Input
                id="task_time"
                type="time"
                label="Time"
                event={setTaskDetail}
                value={
                  Number.isInteger(taskInfo.task_time)
                    ? sectohrs(taskInfo.task_time)
                    : taskInfo.task_time
                }
              />
            </div>
            <Select
              id="assigned_user"
              type="time"
              label="Assign Users"
              value={taskInfo.assigned_user}
              event={setTaskDetail}
              options={data}
            />
          </div>
          <div className="flex flex-row justify-evenly">
            {taskInfo.modified_by ? <Trash event={deleteTask} /> : null}
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
          {taskInfo.assigned_user_icon ? (
            <img
              className="w-12 h-12 object-cover"
              src={taskInfo.assigned_user_icon}
            />
          ) : null}
          <div className="flex flex-col">
            <p>{taskInfo.assigned_user}</p>
            <p>{sectohrs(taskInfo.task_time)}</p>
          </div>
          <Update event={updateTask} />
        </div>
      )}
    </div>
  );
};

export default Task;
