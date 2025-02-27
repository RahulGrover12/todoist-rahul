import { Flex } from "antd";
import sidebarImage from "../assets/images/sidebar.png";
import { Link, useLocation } from "react-router-dom";

const ContentHeader = ({ isMoveLeft, setIsMoveLeft }) => {
  const handleSliderClick = () => {
    setIsMoveLeft(!isMoveLeft);
  };
  const location = useLocation();
  const inboxPage = location.pathname === "/inbox";

  return (
    <Flex
      gap={10}
      align="center"
      className={`p-2 transform transition-transform ${
        isMoveLeft && "absolute left-2"
      }`}
    >
      <div
        onClick={handleSliderClick}
        className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
          !isMoveLeft && "hidden"
        }`}
      >
        <img className="h-[25px]" src={sidebarImage} alt="sidebar" />
      </div>
      {!inboxPage && (
        <Flex>
          <Link to="/">
            <p className="p-1 font-bold hover:bg-gray-200 rounded-lg cursor-pointer">
              My Projects
            </p>
          </Link>
          <p className="p-1 font-bold">/</p>
        </Flex>
      )}
    </Flex>
  );
};

export default ContentHeader;
