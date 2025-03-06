import React, { useState } from "react";
import TaskList from "../tasks/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import AddNewTask from "../tasks/AddNewTask";
import { addTask } from "../../features/taskSlice";

const Inbox = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const hasError = useSelector((state) => state.tasks.error);
  const projects = useSelector((state) => state.projects.projects);

  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);
  const handleAddTaskClicked = (e) => setIsAddTaskClicked(e);

  const inboxProject = projects.find((project) => project.is_inbox_project);
  const inboxproject_id = inboxProject ? inboxProject.id : null;
  const inboxTasks = tasks.filter(
    (task) => task.project_id === inboxproject_id
  );

  if (hasError) {
    return <h1 className="text-red-500 text-center">Error loading tasks</h1>;
  }

  if (loading) {
    return <h1 className="text-gray-500 text-center">Loading tasks...</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>

      {inboxTasks.length > 0 ? (
        <TaskList tasks={inboxTasks} />
      ) : (
        <p className="text-gray-400 text-center">No tasks in Inbox</p>
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
            handleAddTask: (task) => dispatch(addTask(task)),
          }}
        />
      )}
    </div>
  );
};

export default Inbox;
