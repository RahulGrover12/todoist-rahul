import React, { useState } from "react";
import { Layout } from "antd";
const { Content } = Layout;
import SideBar from "./sidebar/SideBar";
import { useParams } from "react-router-dom";
import ContentHeader from "./pages/ContentHeader";
import ProjectContents from "./pages/ProjectContents";
import MyProject from "./project/MyProject";
import Inbox from "./pages/Inbox";
import Today from "./pages/Today";

const Home = () => {
  const [expand, setExpand] = useState(false);
  const param = useParams().project;
  const props = { expand, setExpand };

  return (
    <Layout>
      <SideBar {...props} />
      <Content className="mt-[5px] transition-all duration-500 ease-in-out bg-white">
        <ContentHeader {...props} />
        {location.pathname === "/inbox" && <Inbox />}
        {location.pathname === "/today" && <Today />}
        {!param &&
          location.pathname !== "/inbox" &&
          location.pathname !== "/today" && (
            <>
              <MyProject from={"home"} />
            </>
          )}
        {param && <ProjectContents param={param} />}
      </Content>
    </Layout>
  );
};

export default Home;
