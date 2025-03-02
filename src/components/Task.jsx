import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
// import { getApi } from "../api/Api";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import UpdateTask from "./UpdateTask";
import { TasksContext } from "../contexts/TasksContext";

const Task = ({ values }) => {
  const [isTaskChecked, setIsTaskChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { handleDeleteTask } = useContext(TasksContext);
  // const api = getApi();
  const { task, handleUpdateTask } = values;

  const handleHoveredTask = (value) => {
    setIsHovered(value);
  };

  const handleEditOnClick = (value) => {
    setIsEditClicked(value);
  };

  const deleteTask = async (e) => {
    setIsTaskChecked(e.target.checked);
    setLoading(true);
    await handleDeleteTask(task.id);
    setLoading(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => handleHoveredTask(true)}
        onMouseLeave={() => handleHoveredTask(false)}
        className={`flex justify-between items-center w-full gap-2 p-2 rounded-lg cursor-pointer ${
          isEditClicked && "hidden"
        }`}
      >
        <div className="flex flex-col w-[80%] gap-1">
          <Checkbox
            checked={isTaskChecked}
            className="circle-checkbox flex items-center gap-2"
            onChange={deleteTask}
            disabled={loading}
          >
            <span className="font-medium">{task.content}</span>
            {loading && <LoadingOutlined className="ml-[10px]" />}
          </Checkbox>

          {task.description && (
            <p className="text-gray-600 ml-[30px]">{task.description}</p>
          )}
          {/* {console.log(task.due, task.due.date)} */}
          {/* {console.log(task)} */}
          {task.created_at && (
            <p className="text-blue-600 ml-[30px]">
              {task.created_at.slice(0, 10)}
            </p>
          )}
        </div>

        <EditOutlined
          onClick={() => handleEditOnClick(!isEditClicked)}
          className={`p-1 h-[25px] hover:bg-gray-300 text-[17px] text-gray-500 ${
            !isHovered && "invisible"
          }`}
        />
      </div>
      {isEditClicked && (
        <UpdateTask values={{ task, handleEditOnClick, handleUpdateTask }} />
      )}
      <hr />
    </>
  );
};

export default Task;
