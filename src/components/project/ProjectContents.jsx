import React, { useContext, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import AddNewTask from "../task/AddNewTask";
import Task from "../task/Task";
import { TasksContext } from "../../contexts/TasksContext";

const ProjectContents = ({ param }) => {
  const splitParam = param.split("-");

  const [isHovered, setIsHovered] = useState(false);
  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);
  const {
    tasks,
    loading,
    hasError,
    handleDeleteTask,
    handleUpdateTask,
    handleAddTask,
  } = useContext(TasksContext);

  const handleAddTaskClicked = (clickedEvent) => {
    setIsAddTaskClicked(clickedEvent);
  };

  const handleHoverEvent = (event) => {
    setIsHovered(event);
  };

  if (hasError) {
    return <h1 className="text-red-500 text-center">No Project Found</h1>;
  }

  return loading ? (
    <LoadingOutlined />
  ) : (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="mt-5 w-[50%]">
        <p className="w-full text-[25px] font-bold">{splitParam[0]}</p>
        <div>
          {tasks.filter((task) => task.project_id === splitParam[1]).length >
          0 ? (
            tasks
              .filter((task) => task.project_id === splitParam[1])
              .map((task) => (
                <Task
                  key={task.id}
                  values={{ task, handleDeleteTask, handleUpdateTask }}
                />
              ))
          ) : (
            <p className="text-gray-400 text-center mt-4">No tasks available</p>
          )}
        </div>
        <div
          onMouseEnter={() => handleHoverEvent(true)}
          onMouseLeave={() => handleHoverEvent(false)}
          onClick={() => handleAddTaskClicked(!isAddTaskClicked)}
          className={`flex items-center gap-4 ml-5 mt-3 cursor-pointer relative ${
            isHovered && "text-red-600"
          }`}
        >
          <PlusOutlined
            className={`p-1 ${
              isHovered ? "text-white bg-red-700 rounded-full" : "text-red-700"
            } `}
          />
          <p className="text-[14px]">Add Task</p>
        </div>
        {isAddTaskClicked && (
          <AddNewTask
            values={{
              handleAddTaskClicked,
              splitParam,
              handleAddTask,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectContents;
