import React, { useEffect } from "react";
import Home from "./screens/Home";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, fetchAuth } from "./storeManager/slices/authSlice";
const App = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuth());
    return () => {};
  }, []);
  return (
    <div className="App">
      <Home auth={auth} />
    </div>
  );
};

export default App;
