import React, { useState, useContext } from "react";
import TaskList from "./tasks/TaskList";
import { TasksContext } from "../contexts/TasksContext";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { PlusOutlined } from "@ant-design/icons";
import AddNewTask from "./tasks/AddNewTask";

const Today = () => {
  const { tasks, loading, hasError, handleAddTask } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);
  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);

  const inboxProject = projects.find((project) => project.is_inbox_project);
  const inboxproject_id = inboxProject ? inboxProject.id : null;

  const handleAddTaskClicked = (clicked) => {
    setIsAddTaskClicked(clicked);
  };

  if (hasError) {
    return (
      <h1 className="text-red-500 text-center">
        Something went wrong while loading tasks
      </h1>
    );
  }

  if (loading) {
    return (
      <h1 className="text-gray-500 text-center">
        Loading tasks, please wait...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {tasks.length > 0 ? (
        <TaskList tasks={tasks} showProjectName={true} />
      ) : (
        <p className="text-gray-400 text-center">No tasks available</p>
      )}

      <div
        onClick={() => handleAddTaskClicked(true)}
        className="flex items-center gap-4 mt-5 cursor-pointer text-gray-600 hover:text-red-600"
      >
        <PlusOutlined className="p-1 text-red-700 bg-gray-100 rounded-full hover:bg-red-700 hover:text-white" />
        <p className="text-[14px]">Add Task</p>
      </div>

      {isAddTaskClicked && (
        <AddNewTask
          values={{
            handleAddTaskClicked,
            splitParam: ["Inbox", inboxproject_id],
            handleAddTask,
          }}
        />
      )}
    </div>
  );
};

export default Today;
