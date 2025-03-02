import React, { useState, createContext, useEffect } from "react";
import { fetchTasks } from "../api/services/GetApi";
import { addTask } from "../api/services/PostApi";
import { deleteTask } from "../api/services/DeleteApi";
import { updateTask } from "../api/services/PutApi";
import { message } from "antd";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const resp = await fetchTasks();
        setTasks(resp);
        setLoading(false);
      } catch {
        setHasError(true);
        setLoading(false);
      }
    };
    getAllTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const resp = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, resp]);
      message.success("Task added successfully");
    } catch {
      message.error("Failed to add task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      message.success("Task Completed Successfully");
    } catch {
      message.error("Failed to complete task, Please try again later!");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const resp = await updateTask(updatedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? resp : task))
      );
      message.success("Task updated successfully");
    } catch {
      message.warning("Task update failed. Try again.");
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        hasError,
        setTasks,
        handleDeleteTask,
        handleUpdateTask,
        handleAddTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
