/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";
import { getApi } from "../api/Api";

const initialState = {
  tasks: [],
  hasError: false,
  loading: true,
};

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialState.tasks);
  const [hasError, setHasError] = useState(initialState.hasError);
  const [loading, setLoading] = useState(initialState.loading);

  const api = getApi();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await api.getTasks(); // Fetch all tasks
        setTasks(resp);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setHasError(true);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const value = {
    tasks,
    loading,
    hasError,
    handleDeleteTask,
    handleUpdateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
