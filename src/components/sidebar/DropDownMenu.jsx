import React, { useState, useEffect, useRef } from "react";
import { Menu } from "antd";
import { HeartOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProjectModal from "../project/ProjectModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, deleteProject } from "../../features/projectSlice";
import { useNavigate } from "react-router-dom";

const DropDownMenu = ({ project }) => {
  const [visible, setVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingProject = useSelector((state) =>
    state.projects.projects.find((p) => p.id === project.id)
  );

  const handleToggleFavorite = () => {
    console.log("Dispatching Favorite Toggle for Project:", project.id);

    if (!existingProject) {
      console.error("Project not found in Redux state");
      return;
    }

    dispatch(
      updateProject({
        project_id: project.id,
        updatedProjectData: {
          is_favorite: !project.is_favorite,
          name: existingProject.name, // Ensure name is sent
          color: existingProject.color, // Ensure color is sent
        },
      })
    );
  };

  // Update project details
  const updateProjectInTodoist = async (updatedValues) => {
    if (!project?.id) return;
    dispatch(
      updateProject({
        project_id: project.id,
        updatedProjectData: updatedValues,
      })
    );
  };

  // Handle menu clicks
  const handleMenuClick = (e) => {
    setVisible(false);

    if (e.key === "edit") {
      setOpenModal(true);
    } else if (e.key === "favorite") {
      handleToggleFavorite();
    } else if (e.key === "delete") {
      dispatch(deleteProject(project.id));
      setTimeout(() => navigate("/inbox"), 2000);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Menu items
  const menuItems = [
    { key: "edit", icon: <EditOutlined />, label: <span>Edit</span> },
    {
      key: "favorite",
      icon: <HeartOutlined />,
      label: (
        <span style={{ color: "green" }}>
          {project.is_favorite ? "Remove from favorites" : "Add to favorites"}
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
            onClick={handleMenuClick}
            style={{ width: 240 }}
            mode="inline"
            className="absolute mt-7 right-1 rounded-lg z-10"
            items={menuItems}
          />
        </div>
      )}
      {openModal && (
        <ProjectModal
          title="Edit Project"
          operation="Edit"
          project={project}
          openModal={openModal}
          updateProjectInTodoist={updateProjectInTodoist}
        />
      )}
    </div>
  );
};

export default DropDownMenu;
