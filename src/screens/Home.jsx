import React, { useEffect, useState } from "react";
import Task from "../components/organisms/Task";

import { useSelector, useDispatch } from "react-redux";
import {
  selectTask,
  fetchTasks,
  getTasks,
} from "../storeManager/slices/taskSlice";

import { useQuery  } from "react-query";
const Home = ({ auth }) => {
  const {company_id,token} = auth.data;
  const authToken = {companyId:company_id,authToken:token};
  const {status,data} = useQuery('tasks',fetchTasks(authToken))
  const [task,setTask] = useState(data);
  const { tasks } = useSelector(selectTask);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(data))
    return () => {};
  }, [company_id,data]);

  return (
    <div className="container mx-auto">
      {
        {
          loading: <p>loading ...</p>,
          success: <>
            { tasks?.map((taskInfo, index) => (
              <Task
                taskInfo={taskInfo}
                key={taskInfo.id}
                auth={authToken}
              />
            )) }
          
          </>,
        }[status]
      }
    </div>
  );
};

export default Home;
