import { Layout, Progress } from "antd";
import {
  BellOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import sidebarImage from "../assets/images/sidebar.png";
const { Sider } = Layout;
import MyProject from "./MyProject";
import Favorites from "./Favorites";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { useContext, useState } from "react";
import AddNewTask from "./AddNewTask";
import { message } from "antd";

const SliderHeader = ({ isMoveLeft, setIsMoveLeft }) => {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectsContext);

  const [isAddTaskClicked, setIsAddTaskClicked] = useState(false);

  const handleAddTaskClicked = (clickedEvent) => {
    setIsAddTaskClicked(clickedEvent);
  };
  const handleSliderClick = () => {
    setIsMoveLeft(!isMoveLeft);
    setIsAddTaskClicked(false);
  };

  const inboxProject = projects.find((project) => project.isInboxProject);
  const inboxProjectId = inboxProject ? inboxProject.id : null;

  return (
    <Sider
      width="300px"
      className={`h-screen bg-[#f9f5f3] relative transition-transform duration-500 ease-in-out transform ${
        isMoveLeft ? "-translate-x-full" : "translate-x-0"
      }`}
      style={{ zIndex: 10, position: "relative" }}
    >
      <div className="p-2">
        <div className="flex items-center space-x-4">
          <Progress
            size={30}
            type="circle"
            percent={50}
            format={() => (
              <span className="p-1 pl-[6px] pr-[6px] bg-green-700 rounded-full text-white">
                R
              </span>
            )}
            strokeColor="#DC4C3E"
            className="rounded-full mt-2"
          />
          <p className="font-bold pt-1.5">RahulGrover</p>
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
              splitParam: ["Inbox", inboxProjectId],
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
        <Favorites />
        <MyProject callingFrom={"slider"} />
      </div>
    </Sider>
  );
};

export default SliderHeader;
