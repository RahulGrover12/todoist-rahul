import { useContext } from "react";
import Task from "./Task";
import { TasksContext } from "../contexts/TasksContext";

const TaskList = ({ tasks }) => {
  const { handleDeleteTask, handleUpdateTask } = useContext(TasksContext);
  return (
    <div className="flex flex-col gap-2">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            values={{ task, handleDeleteTask, handleUpdateTask }}
          />
        ))
      ) : (
        <p className="text-gray-400 px-4">No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
