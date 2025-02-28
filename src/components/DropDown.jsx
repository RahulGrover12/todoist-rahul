import { useContext, useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import colorsData from "../../colors.json";
import DropDownMenu from "./DropDownMenu";
import { TasksContext } from "../contexts/TasksContext";

const DropDown = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEllipsClicked, setIsEllipsClicked] = useState(false);
  const { tasks } = useContext(TasksContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (tasks) {
      setCount(tasks.filter((task) => task.projectId === project.id).length);
    }
  }, [tasks, project.id]);

  const handleHoveredEvent = (e) => {
    setIsHovered(e);
  };

  const handleElipseClicked = () => {
    setIsEllipsClicked(!isEllipsClicked);
  };

  const colorsHexCode = colorsData.colors.filter(
    (color) => color.colorName === project.color
  );

  return project ? (
    <div
      onMouseEnter={() => handleHoveredEvent(true)}
      onMouseLeave={() => {
        handleHoveredEvent(false);
      }}
      className={`p-1 pl-8 flex justify-between cursor-pointer hover:bg-[#ffefe5]`}
    >
      <Link to={`/${project.name}-${project.id}`}>
        <div className="flex gap-3 text-[15px] items-center">
          <p
            style={{ color: `${colorsHexCode[0].colorCode}` }}
            className="text-[20px]"
          >
            #
          </p>
          <p>{project.name}</p>
          {!isHovered && (
            <p className="absolute text-gray-500 text-sm right-3">{count}</p>
          )}
        </div>
      </Link>
      <div className="relative flex items-center">
        {isHovered && (
          <EllipsisOutlined
            onClick={handleElipseClicked}
            className="rounded text-center hover:bg-gray-200"
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
        )}
        {isEllipsClicked && (
          <div
            className="absolute right-0"
            style={{
              width: "100px",
            }}
          >
            <DropDownMenu project={project} />
          </div>
        )}
      </div>
    </div>
  ) : (
    <p className="text-gray-400 text-center mt-4">No projects available</p>
  );
};

export default DropDown;
