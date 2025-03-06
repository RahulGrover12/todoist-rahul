import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import DropDown from "./DropDown";

const Favorites = () => {
  const [mouseEnter, setMouseEnter] = useState(true);
  const [isToggle, setIsToggle] = useState(false);
  const { projects, loading, error } = useSelector((state) => state.projects);

  if (error) {
    return <h1 className="text-red-500 text-center">Error loading projects</h1>;
  }

  if (loading) {
    return <h1 className="text-gray-500 text-center">Loading projects...</h1>;
  }

  const favoriteProjects = projects.filter(
    (project) => project.name !== "Inbox" && project.is_favorite
  );

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={() => setMouseEnter(false)}
        onMouseLeave={() => setMouseEnter(true)}
        className="p-2 pl-4 flex justify-between items-center text-gray-500"
      >
        <p className="font-bold text-[15px]">Favorites</p>
        <div className={`flex gap-2 ${mouseEnter && "hidden"}`}>
          <DownOutlined
            onClick={() => setIsToggle(!isToggle)}
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
