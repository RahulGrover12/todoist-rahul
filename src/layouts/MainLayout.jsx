import { Outlet } from "react-router-dom";
import { ProjectsContextProvider } from "../contexts/ProjectsContext";
import { TasksProvider } from "../contexts/TasksContext";

const MainLayout = () => {
  return (
    <ProjectsContextProvider>
      <TasksProvider>
        <Outlet />
      </TasksProvider>
    </ProjectsContextProvider>
  );
};

export default MainLayout;
