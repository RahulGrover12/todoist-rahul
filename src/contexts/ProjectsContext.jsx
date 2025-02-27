/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useEffect } from "react";
import { getApi } from "../api/Api";

const initialState = {
  projects: [],
  hasError: false,
  loading: true,
};

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialState.projects);
  const [hasError, setHasError] = useState(initialState.hasError);
  const [loading, setLoading] = useState(initialState.loading);

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

  const value = {
    projects,
    loading,
    hasError,
    handleProjectAdd,
    handleEditProject,
    handleDeleteProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
