import { useState } from "react";
import { Layout } from "antd";
const { Content } = Layout;
import SliderHeader from "./SliderHeader";
import { useParams } from "react-router-dom";
import ContentHeader from "./ContentHeader";
import ProjectContents from "./ProjectContents";
import MyProject from "./MyProject";
import Inbox from "./Inbox";

const Home = () => {
  const [isMoveLeft, setIsMoveLeft] = useState(false);
  const param = useParams().project;
  const props = { isMoveLeft, setIsMoveLeft };

  return (
    <Layout>
      <SliderHeader {...props} />
      <Content className="mt-[5px] transition-all duration-500 ease-in-out">
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
