import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const task = {
  'task_msg':'',
  'task_date':'',
  'task_time':'',
  'assigned_user':''
};
const initialState = {
  taskDetail: task,
  tasks: [task],
  
  users:[]
};


export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getUsers: (state,{payload}) => {
      state.users = payload;
    },
    getTasks: (state,{payload}) => {

      state.tasks =  payload;
    },
    getTask: (state,{payload}) => {
      state.taskDetail[payload.name] = payload.value;
      if(payload.id.length > 1) {
        let index = state.tasks.findIndex((v)=> v.id === payload?.id)
        state.tasks[index][payload.name] = payload.value 
      }
      else {

      state.tasks[payload.id][payload.name] = payload.value 
      }
    },
    addTasks: (state,{payload}) => {
      state.tasks = [payload];
    },
    deleteTask: (state,{payload}) => {
      let index = state.tasks.findIndex((v)=> v.id === payload?.id)
      state.tasks.splice(index ? index : payload.id,1);
      state.tasks = state.tasks.length ? state.tasks : [task]
    },
    incrementTasks: (state,{payload}) => {
      state.tasks = [...state.tasks,task];
    },
  },
  
});

export const { getTasks, deleteTask, addTasks ,getUsers, getTask,incrementTasks} = taskSlice.actions;

export const selectTask = (state) => state.task;

export const fetchUsers = (companyId,token) => async dispatch => {
    const header = { 'Authorization': `Bearer ${token}`}
    const data = await axios.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`, {headers: header })
    dispatch(getUsers(data.data.results.data));
  };
export const fetchTasks = (companyId,token) => async dispatch => {
    const header = { 'Authorization': `Bearer ${token}`}
    const data = await axios.get(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${companyId}`, {headers: header })
    dispatch(getTasks(data.data.results));
  };
export const setTask = ({name,value},id) => async dispatch => {
    dispatch(getTask({name,value,id}));
  };
export const removeTask = (auth,id) => async dispatch => {

  const header = { 'Authorization': `Bearer ${auth.authToken}`}
  const data = await axios.delete(` https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${id}?company_id=${auth.companyId}`,{headers: header })
    dispatch(deleteTask(id));
    dispatch(fetchTasks(auth.companyId,auth.authToken))
  };

export const addTask = (companyId,token,task) => async dispatch => {
  var taskTime = null // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = null;
  if(!Number.isInteger(task.task_time)){
    taskTime = task.task_time.split(':');
    seconds = (+taskTime[0]) * 60 * 60 + (+taskTime[1]) * 60 +  (+taskTime[2]);
  }
  else {
    seconds = task.task_time
  }
  let body ={
    "assigned_user":  task.assigned_user, 
    "task_date": task.task_date,
    "task_time": seconds,
    "is_completed":0,
    "time_zone":19800,
    "task_msg": task.task_msg
   }; 

  const header = { 'Authorization': `Bearer ${token}`}
  const data = await axios.post(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${companyId}`,body,{headers: header })
  dispatch(addTasks(data.data.results))
  dispatch(fetchTasks(companyId,token))
}
export const updateTask = (companyId,token,task) => async dispatch => {
  var taskTime = null // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
var seconds = null;
if(!Number.isInteger(task.task_time)){
  taskTime = task.task_time.split(':');
  seconds = (+taskTime[0]) * 60 * 60 + (+taskTime[1]) * 60 +  (+taskTime[2]);
}
else {
  seconds = task.task_time
}
  
  let body ={
    "assigned_user":  task.assigned_user, 
    "task_date": task.task_date,
    "task_time": seconds,
    "is_completed":0,
"time_zone":19800,
    "task_msg": task.task_msg
   }; 

  const header = { 'Authorization': `Bearer ${token}`}
  const data = await axios.put(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${task.id}?company_id=${companyId}`,body,{headers: header })

  dispatch(addTasks(data.data.results))
  dispatch(fetchTasks(companyId,token))
}
export default taskSlice.reducer;
