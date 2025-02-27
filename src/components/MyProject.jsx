import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import ProjectModal from "./ProjectModal";
import ProjectList from "./DropDown";
import { ProjectsContext } from "../contexts/ProjectsContext";

const MyProject = ({ callingFrom }) => {
  const [isHovered, setIsHovered] = useState(true);
  const [isToggle, setIsToggle] = useState(false);
  const { projects, loading, hasError } = useContext(ProjectsContext);

  const props = {
    title: "Add Project",
    operation: "Add",
  };

  const handleMyProjectHoverEvent = (mouseEvent) => {
    setIsHovered(mouseEvent);
  };

  const handleShowProjectsClick = () => {
    setIsToggle(!isToggle);
  };

  if (hasError) {
    return <h1 className="text-red-500 text-center">No Project Found</h1>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onMouseEnter={() => handleMyProjectHoverEvent(false)}
        onMouseLeave={() => handleMyProjectHoverEvent(true)}
        className="p-2 pl-4 bg-red-100 flex justify-between items-center text-gray-500 cursor-pointer hover:bg-gray-100 relative"
      >
        {callingFrom === "home" ? (
          <p>Projects {projects.length - 1}</p>
        ) : (
          <Link to="/">
            <p className="font-bold text-[15px] text-gray-800">My Projects</p>
          </Link>
        )}

        <div className={`flex ${isHovered && "hidden"}`}>
          <ProjectModal {...props} />
          <DownOutlined
            onClick={handleShowProjectsClick}
            className={`hover:bg-gray-200 p-1 mr-4 rounded-lg cursor-pointer transform transition-transform ${
              isToggle && "rotate-[-180deg]"
            }`}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 px-4 text-center">Loading projects...</p>
      ) : projects.length > 1 ? (
        !isToggle && (
          <div>
            {projects
              .filter((project) => project.name !== "Inbox")
              .map((project) => (
                <ProjectList key={project.id} project={project} />
              ))}
          </div>
        )
      ) : (
        <p className="text-gray-400 px-4 text-center">No projects available</p>
      )}
    </div>
  );
};

export default MyProject;
