import { useContext, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { ProjectsContext } from "../contexts/ProjectsContext";
import DropDown from "./DropDown";

const Favorites = () => {
  const [mouseEnter, setMouseEnter] = useState(true);
  const [isToggle, setIsToggle] = useState(false);
  const { projects, loading, hasError } = useContext(ProjectsContext);

  const handleFavoriteEvent = (e) => {
    setMouseEnter(e);
  };

  const handleToggleClick = () => {
    setIsToggle(!isToggle);
  };

  if (hasError) {
    return (
      <h1 className="text-red-500 text-center">
        Something went wrong while fetching projects
      </h1>
    );
  }

  if (loading) {
    return (
      <h1 className="text-gray-500 text-center">
        Loading projects, please wait...
      </h1>
    );
  }

  const favoriteProjects = projects.filter(
    (project) => project.name !== "Inbox" && project.isFavorite
  );

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={() => handleFavoriteEvent(false)}
        onMouseLeave={() => handleFavoriteEvent(true)}
        className="p-2 pl-4 flex justify-between items-center text-gray-500"
      >
        <p className="font-bold text-[15px]">Favorites</p>
        <div className={`flex gap-2 ${mouseEnter && "hidden"}`}>
          <DownOutlined
            onClick={handleToggleClick}
            className={`mr-4 p-1 hover:bg-gray-200 rounded-lg cursor-pointer transform transition-transform ${
              isToggle && "rotate-[-180deg]"
            }`}
          />
        </div>
      </div>

      {!isToggle && (
        <div>
          {favoriteProjects.length > 0 ? (
            favoriteProjects.map((project) => (
              <DropDown key={project.id} project={project} />
            ))
          ) : (
            <p className="text-gray-400 px-4 text-center">
              No favorites available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
