import { useContext } from "react";
import Task from "./Task";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { TasksContext } from "../contexts/TasksContext";

const TaskList = ({ tasks, showProjectName = false }) => {
  const { projects } = useContext(ProjectsContext);
  const { handleDeleteTask, handleUpdateTask } = useContext(TasksContext);
  return (
    <div className="flex flex-col gap-1">
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const project = projects.find(
            (project) => project.id === task.projectId
          );
          return (
            <div
              key={task.id}
              className="p-1 border-b border-gray-300 flex items-center"
            >
              <Task values={{ task, handleDeleteTask, handleUpdateTask }} />
              {showProjectName && project && (
                <span className="text-gray-500 text-xs italic ml-4 text-nowrap">
                  {project.name}
                </span>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 px-4">No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
