import { Avatar, Layout } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import sidebarImage from "../assets/images/sidebar.png";
import MyProject from "./MyProject";
import Favorites from "./Favorites";
import { ProjectsContext } from "../contexts/ProjectsContext";
import React, { useContext, useState } from "react";
import AddNewTask from "./AddNewTask";
const { Sider } = Layout;
import { message } from "antd";

const SideBar = ({ expand, setExpand }) => {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectsContext);

  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);

  const handleAddTaskClicked = (e) => {
    setIsAddTaskClicked(e);
  };
  const handleSliderClick = () => {
    setExpand(!expand);
    setIsAddTaskClicked(false);
  };

  const inboxProject = projects.find((project) => project.is_inbox_project);
  const inboxproject_id = inboxProject ? inboxProject.id : null;

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out ${
        expand ? "bg-white" : ""
      }`}
    >
      <Sider
        width="300px"
        className={`h-screen bg-[#f9f5f3] relative transition-transform duration-500 ease-in-out transform ${
          expand ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ zIndex: 10, position: "relative" }}
      >
        <div className="p-2.5">
          <div className="flex items-center space-x-2">
            <Avatar
              style={{
                backgroundColor: "#30a685",
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
              }}
              className="mt-2"
            >
              R
            </Avatar>
            <p className="font-semibold pt-1.5">RahulGrover</p>
          </div>

          <div className="absolute right-5 top-2 flex text-gray-500">
            <BellOutlined
              className="p-3 text-[18px] cursor-pointer hover:bg-gray-200 rounded-lg"
              onClick={() => message.success("Notifications on successfully")}
            />
            <div
              onClick={handleSliderClick}
              className="p-2 cursor-pointer hover:bg-gray-200 hover:text-gray-400 rounded-lg"
            >
              <img
                className="h-[25px] filter grayscale text-gray-500"
                src={sidebarImage}
                alt="sidebar"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div
            onClick={handleAddTaskClicked}
            className="p-2 pl-4 text-gray-500 font-bold cursor-pointer hover:bg-[#ffefe5] rounded-lg flex items-center"
          >
            <PlusCircleFilled className="text-sm text-red-700 bg-gray-100 rounded-full pr-3" />
            Add Task
          </div>
          {isAddTaskClicked && (
            <AddNewTask
              values={{
                handleAddTaskClicked,
                splitParam: ["Inbox", inboxproject_id],
                handleAddTask: () => {},
              }}
              style={{ padding: "10rem" }}
            />
          )}
          <div
            onClick={() => navigate("/inbox")}
            className="p-2 pl-4 text-gray-500 font-bold cursor-pointer hover:bg-[#ffefe5] rounded-lg"
          >
            <InboxOutlined className="text-red-600 text-sm pr-3 text-center" />
            Inbox
          </div>
          <div
            onClick={() => navigate("/today")}
            className="p-2 pl-4 text-gray-500 font-bold cursor-pointer hover:bg-[#ffefe5] rounded-lg"
          >
            <CalendarOutlined className="text-red-600 text-sm pr-3 text-center" />
            Today
          </div>
          <Favorites />
          <MyProject from={"slider"} />
        </div>
      </Sider>
    </div>
  );
};

export default SideBar;
