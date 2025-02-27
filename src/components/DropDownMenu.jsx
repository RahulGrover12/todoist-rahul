import { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "antd";
import { HeartOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProjectModal from "./ProjectModal";
import { getApi } from "../api/Api";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

const DropDownMenu = ({ project }) => {
  const [visible, setVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef(null);
  const api = getApi();
  const { handleEditProject, handleDeleteProject } =
    useContext(ProjectsContext);
  const navigate = useNavigate();

  const updateProjectInTodoist = async (values) => {
    try {
      const resp = await api.updateProject(project.id, values);
      console.log("Project Updated..", resp);
      handleEditProject(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProjectFromTodoist = async () => {
    try {
      const isSuccess = await api.deleteProject(project.id);
      if (isSuccess) {
        console.log("Project Deleted..");
        handleDeleteProject(project.id);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const props = {
    title: "Edit Project",
    operation: "Edit",
    project,
    openModal,
    updateProjectInTodoist,
  };

  const handleOpenModal = (e) => {
    if (e.key === "edit") {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
    setVisible(false);
    if (e.key === "favorite") {
      project.isFavorite = !project.isFavorite;
      updateProjectInTodoist(project);
    } else if (e.key === "delete") {
      deleteProjectFromTodoist();
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
          {project.isFavorite ? "Remove from favorite" : "Add to favorite"}
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
