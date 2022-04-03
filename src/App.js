import React, { useEffect } from "react";
import Home from "./screens/Home";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, fetchAuth } from "./storeManager/slices/authSlice";
import { useQuery } from "react-query";
const App = () => {
  // const auth = useSelector(selectAuth);
  const auth = useQuery('auth',fetchAuth())
  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchAuth());
    return () => {};
  }, []);

  
  return (
    <div className="App">
      {
        {
          loading: <p>loading ...</p>,
          success: <Home auth={auth} />,
        }[auth.status]
      }
    </div>
  );
};

export default App;
