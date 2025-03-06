import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../app/store";
import { fetchTasks } from "../features/taskSlice";
import { fetchProjects } from "../features/projectSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
};

export default MainLayout;
