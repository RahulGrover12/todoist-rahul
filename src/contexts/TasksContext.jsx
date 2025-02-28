/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useEffect } from "react";
import { getApi } from "../api/Api";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const api = getApi();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await api.getTasks();
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

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TasksContext.Provider
      value={{
        setTasks,
        tasks,
        loading,
        hasError,
        handleDeleteTask,
        handleUpdateTask,
        handleAddTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
