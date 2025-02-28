import { useState } from "react";
import { Layout } from "antd";
const { Content } = Layout;
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import ContentHeader from "./ContentHeader";
import ProjectContents from "./ProjectContents";
import MyProject from "./MyProject";
import Inbox from "./Inbox";

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
        {!param && location.pathname !== "/inbox" && (
          <>
            <MyProject callingFrom={"home"} />
          </>
        )}
        {param && <ProjectContents param={param} />}
      </Content>
    </Layout>
  );
};

export default Home;
