import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import AddNewTask from "../tasks/AddNewTask";
import Task from "../tasks/Task";
import { addTask, deleteTask, updateTask } from "../../features/taskSlice";

const ProjectContents = ({ param }) => {
  const dispatch = useDispatch();
  const splitParam = param.split("-");
  const [isHovered, setIsHovered] = useState(false);
  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const hasError = useSelector((state) => state.tasks.error);

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
                  values={{
                    task,
                    handleDeleteTask: (id) => dispatch(deleteTask(id)),
                    handleUpdateTask: (task) => dispatch(updateTask(task)),
                  }}
                />
              ))
          ) : (
            <p className="text-gray-400 text-center mt-4">No tasks available</p>
          )}
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsAddTaskClicked(!isAddTaskClicked)}
          className={`flex items-center gap-4 ml-5 mt-3 cursor-pointer relative ${
            isHovered && "text-red-600"
          }`}
        >
          <PlusOutlined
            className={`p-1 ${
              isHovered ? "text-white bg-red-700 rounded-full" : "text-red-700"
            }`}
          />
          <p className="text-[14px]">Add Task</p>
        </div>

        {isAddTaskClicked && (
          <AddNewTask
            values={{
              handleAddTaskClicked: setIsAddTaskClicked,
              splitParam,
              handleAddTask: (task) => dispatch(addTask(task)),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectContents;
