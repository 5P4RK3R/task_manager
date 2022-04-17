import React, { useEffect } from "react";
import Task from "../components/organisms/Task";

import { useSelector, useDispatch } from "react-redux";
import {
  selectTask,
  fetchTasks,
  fetchUsers,
} from "../storeManager/slices/taskSlice";

const Home = ({ auth }) => {
  const { users, tasks } = useSelector(selectTask);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.companyId && auth.authToken) {
      dispatch(fetchTasks(auth.companyId, auth.authToken));
      dispatch(fetchUsers(auth.companyId, auth.authToken));
    }

    return () => {};
  }, [auth]);
  return (
    <div className="container mx-auto">
      {tasks.map((taskDetail, index) => (
        <Task
          users={users}
          taskDetail={taskDetail}
          index={index}
          id={taskDetail.id}
          auth={auth}
        />
      ))}
    </div>
  );
};

export default Home;
