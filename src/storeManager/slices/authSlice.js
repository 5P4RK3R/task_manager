import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  authToken: null,
  companyId:null
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state,{payload}) => {
      state.authToken = payload.token;
      state.companyId = payload.company_id
    }
  },
  
});

export const { getAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export const fetchAuth = () => async dispatch => {
    let body = {
        "email" : "smithwills1989@gmail.com",
        "password" : "12345678"
      }

    const data = await axios.post(`https://stage.api.sloovi.com/login`,body)
    dispatch(getAuth(data.data.results));
  };
export default authSlice.reducer;
