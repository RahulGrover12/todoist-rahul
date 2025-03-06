import React, { useState } from "react";
import TaskList from "../tasks/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import AddNewTask from "../tasks/AddNewTask";
import { addTask } from "../../features/taskSlice";

const Today = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const hasError = useSelector((state) => state.tasks.error);
  const projects = useSelector((state) => state.projects.projects);

  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);
  const inboxProject = projects.find((project) => project.is_inbox_project);
  const inboxproject_id = inboxProject ? inboxProject.id : null;

  if (hasError) {
    return (
      <h1 className="text-red-500 text-center">
        Something went wrong while loading tasks
      </h1>
    );
  }

  if (loading) {
    return <h1 className="text-gray-500 text-center">Loading tasks...</h1>;
  }

  const formattedDate = new Date().toLocaleDateString("en-CA");
  const todayTasks = tasks.filter(
    (task) => task.created_at.slice(0, 10) === formattedDate
  );

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {todayTasks.length > 0 ? (
        <TaskList tasks={todayTasks} showProjectName={true} />
      ) : (
        <p className="text-gray-400 text-center">No tasks available</p>
      )}

      <div
        onClick={() => setIsAddTaskClicked(true)}
        className="flex items-center gap-4 mt-5 cursor-pointer text-gray-600 hover:text-red-600"
      >
        <PlusOutlined className="p-1 text-red-700 bg-gray-100 rounded-full hover:bg-red-700 hover:text-white" />
        <p className="text-[14px]">Add Task</p>
      </div>

      {isAddTaskClicked && (
        <AddNewTask
          values={{
            handleAddTaskClicked: setIsAddTaskClicked,
            splitParam: ["Inbox", inboxproject_id],
            handleAddTask: (task) => dispatch(addTask(task)),
          }}
        />
      )}
    </div>
  );
};

export default Today;
