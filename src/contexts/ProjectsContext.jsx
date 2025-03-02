import React, { useState, createContext, useEffect } from "react";
import { fetchProjects } from "../api/services/GetApi";
import { addProject } from "../api/services/PostApi";
import { updateProject } from "../api/services/PutApi";
import { deleteProject } from "../api/services/DeleteApi";
import { message } from "antd";
export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const resp = await fetchProjects();
        setProjects(resp ?? []);
        setLoading(false);
      } catch {
        setHasError(true);
        setLoading(false);
      }
    };
    getAllProjects();
  }, []);

  const handleProjectAdd = async (newProject) => {
    try {
      const resp = await addProject(newProject);
      setProjects((prevProjects) => [...prevProjects, resp]);
      message.success("Project added successfully!");
    } catch {
      message.error("Failed to add project, Please try again later!");
    }
  };

  const handleEditProject = async (updatedProject) => {
    try {
      const resp = await updateProject(updatedProject.id, updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProject.id ? resp : project
        )
      );
      message.success("Project updated successfully");
    } catch {
      message.warning("Project update failed. Try again.");
    }
  };

  const handleDeleteProject = async (project_id) => {
    try {
      await deleteProject(project_id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== project_id)
      );
      message.success("Project deleted successfully");
    } catch {
      message.error("Failed to delete project");
    }
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
