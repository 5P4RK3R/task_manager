import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const task = {
  task_msg: "",
  task_date: "",
  task_time: "",
  assigned_user: "",
  id: Math.random()
};
const initialState = {
  taskDetail: task,
  tasks: [task]
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: (state, { payload }) => {
      state.tasks = payload 
      // state.tasks = payload.length ? payload : [taskDetail];
    },
    // getTask: (state, { payload }) => {
    //   state.taskDetail[payload.name] = payload.value;
    //   if (payload.id.length > 1) {
    //     let index = state.tasks.findIndex((v) => v.id === payload?.id);
    //     state.tasks[index][payload.name] = payload.value;
    //   } else {
    //     state.tasks[payload.id][payload.name] = payload.value;
    //   }
    // },
    setTask:(state, { payload }) => {
      let index = state.tasks.findIndex((v) => v.id === payload?.id);
      state.tasks[index][payload.name] = payload.value;
    },
    addTasks: (state, { payload }) => {
      state.tasks = [payload];
    },
    deleteTask: (state, { payload }) => {
      
      const filteredTask = state.tasks.filter((task)=> task.id !== payload.id)
      state.tasks = filteredTask.length ? filteredTask : [task];
    },
    incrementTask: (state, { payload }) => {
      state.tasks = [...state.tasks, task];
    },
    decrementTask : (state, { payload }) => {
      const filteredTask = state.tasks.filter((task)=> task.id !== payload.id)
      state.tasks = filteredTask
    },
  },
});

export const {
  deleteTask,
  addTasks,
  getTask,
  getTasks,
  setTask,
  incrementTask,
  decrementTask
} = taskSlice.actions;

export const selectTask = (state) => state.task;

export const fetchUsers = ({companyId,authToken }) => async (dispatch) => {
  const header = { Authorization: `Bearer ${authToken}` };
  const data = await axios.get(
    `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
    { headers: header }
  );
  return data.data.results.data
};
export const fetchTasks = ({companyId, authToken}) => async (dispatch) => {
  const header = { Authorization: `Bearer ${authToken}` };
  const data = await axios.get(
    `https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${companyId}`,
    { headers: header }
  );
  return data.data.results;
};

export const removeTask = (auth, id) => async (dispatch) => {
  const header = { Authorization: `Bearer ${auth.authToken}` };
  const data = await axios.delete(
    ` https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${id}?company_id=${auth.companyId}`,
    { headers: header }
  );
  // dispatch(deleteTask(id));
  // dispatch(fetchTasks(auth));
};

export const addTask = ({companyId, authToken}, task) => async (dispatch) => {
  var taskTime = null; // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = null;
  if (!Number.isInteger(task.task_time)) {
    taskTime = task.task_time.split(":");
    seconds = +taskTime[0] * 60 * 60 + +taskTime[1] * 60 + +taskTime[2];
  } else {
    seconds = task.task_time;
  }
  let body = {
    assigned_user: task.assigned_user,
    task_date: task.task_date,
    task_time: seconds,
    is_completed: 0,
    time_zone: 19800,
    task_msg: task.task_msg,
  };

  const header = { Authorization: `Bearer ${authToken}` };
  const data = await axios.post(
    `https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${companyId}`,
    body,
    { headers: header }
  );
  return data.data.results;
  // dispatch(addTasks(data.data.results));
  // dispatch(fetchTasks({companyId, authToken}));
};
export const updateTask = ({companyId, authToken}, task) => async (dispatch) => {
  var taskTime = null; // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = null;
  if (!Number.isInteger(task.task_time)) {
    taskTime = task.task_time.split(":");
    seconds = +taskTime[0] * 60 * 60 + +taskTime[1] * 60 + +taskTime[2];
  } else {
    seconds = task.task_time;
  }

  let body = {
    assigned_user: task.assigned_user,
    task_date: task.task_date,
    task_time: seconds,
    is_completed: 0,
    time_zone: 19800,
    task_msg: task.task_msg,
  };

  const header = { Authorization: `Bearer ${authToken}` };
  const data = await axios.put(
    `https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${task.id}?company_id=${companyId}`,
    body,
    { headers: header }
  );
    return data.data.results;
  // dispatch(addTasks(data.data.results));
  // dispatch(fetchTasks({companyId, authToken}));
};
export default taskSlice.reducer;
