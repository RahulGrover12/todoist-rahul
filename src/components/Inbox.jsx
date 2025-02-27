import { useState, useContext } from "react";
import TaskList from "./TaskList";
import { TasksContext } from "../contexts/TasksContext";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { PlusOutlined } from "@ant-design/icons";
import AddNewTask from "./AddNewTask";

const Inbox = () => {
  const { tasks, loading, hasError } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);

  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);
  const handleAddTaskClicked = (e) => {
    setIsAddTaskClicked(e);
  };

  const handleAddTask = (newTask) => {
    tasks.push(newTask);
  };

  const inboxProject = projects.find((project) => project.isInboxProject);
  const inboxProjectId = inboxProject ? inboxProject.id : null;

  const inboxTasks = tasks.filter((task) => task.projectId === inboxProjectId);

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
            splitParam: ["Inbox", inboxProjectId],
            handleAddTask,
          }}
        />
      )}
    </div>
  );
};

export default Inbox;
