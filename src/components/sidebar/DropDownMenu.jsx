import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "antd";
import { HeartOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProjectModal from "../project/ProjectModal";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

const DropDownMenu = ({ project }) => {
  const [visible, setVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef(null);
  const { handleEditProject, handleDeleteProject } =
    useContext(ProjectsContext);
  const navigate = useNavigate();

  const updateProjectInTodoist = async (updatedValues) => {
    if (!project?.id) {
      return;
    }
    const updatedProject = { ...project, ...updatedValues };
    await handleEditProject(updatedProject);
  };

  const props = {
    title: "Edit Project",
    operation: "Edit",
    project,
    openModal,
    updateProjectInTodoist,
  };

  const handleOpenModal = (e) => {
    setVisible(false);

    if (e.key === "edit") {
      setOpenModal(true);
    } else if (e.key === "favorite") {
      const updatedProject = { ...project, is_favorite: !project.is_favorite };
      handleEditProject(updatedProject);
    } else if (e.key === "delete") {
      handleDeleteProject(project.id);
      setTimeout(() => navigate("/inbox"), 2000);
    }
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => handleOutsideClick(e);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const menuItems = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: <span>Edit</span>,
    },
    {
      key: "favorite",
      icon: <HeartOutlined />,
      label: (
        <span style={{ color: "green" }}>
          {project.is_favorite ? "Remove from favorite" : "Add to favorite"}
        </span>
      ),
    },
    {
      key: "delete",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      label: <span style={{ color: "red" }}>Delete</span>,
    },
  ];

  return (
    <div className="rounded-lg">
      {visible && (
        <div ref={menuRef} className="rounded-lg">
          <Menu
            onClick={handleOpenModal}
            style={{ width: 240 }}
            mode="inline"
            className="absolute mt-7 right-1 rounded-lg z-10"
            items={menuItems}
          />
        </div>
      )}
      {openModal && <ProjectModal className="hidden" {...props} />}
    </div>
  );
};

export default DropDownMenu;
