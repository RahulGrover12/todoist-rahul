/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useEffect } from "react";
import { getApi } from "../api/Api";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const api = getApi();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const resp = await api.getProjects();
        setProjects(resp);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setHasError(true);
        setLoading(false);
      }
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProjectAdd = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleEditProject = (editedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === editedProject.id ? editedProject : project
      )
    );
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        hasError,
        handleProjectAdd,
        handleEditProject,
        handleDeleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
