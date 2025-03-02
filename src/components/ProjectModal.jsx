import React, { useState, useContext } from "react";
import { Modal, Form, Input, Select, Switch, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import colorsData from "../../colors.json";
// import { getApi } from "../api/Api";
import { ProjectsContext } from "../contexts/ProjectsContext";

const ProjectModal = ({
  title,
  operation,
  project,
  openModal,
  updateProjectInTodoist,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(openModal);
  const [projectName, setProjectName] = useState(project ? project.name : "");
  const [selectedColor, setSelectedColor] = useState(
    project ? project.color : "charcoal"
  );
  const [is_favorite, setis_favorite] = useState(
    project ? project.is_favorite : false
  );
  const [form] = Form.useForm();
  // const api = getApi();

  const { handleProjectAdd } = useContext(ProjectsContext);

  const addProjectInTodoist = (values) => {
    if (operation === "Add") {
      handleProjectAdd(values);
    } else {
      const updatedProject = { ...project, ...values, id: project.id };
      updateProjectInTodoist(updatedProject);
    }
  };

  const resetFields = () => {
    setIsModalVisible(false);
    setProjectName("");
    setSelectedColor("charcoal");
    setis_favorite(false);
    form.resetFields();
    form.setFieldsValue({
      name: "",
      color: "charcoal",
      is_favorite: false,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFields();
  };

  const onFormSubmit = (values) => {
    addProjectInTodoist(values);
    resetFields();
  };

  return (
    <div>
      {operation === "Add" && (
        <PlusOutlined
          onClick={showModal}
          className="p-1 mr-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        />
      )}
      <Modal
        title={title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={operation}
        okButtonProps={{
          style: {
            background: `${projectName ? "#C3392C" : "#EDA59E"}`,
          },
          disabled: !projectName,
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFormSubmit}>
          <Form.Item
            name="name"
            label={<p className="font-bold">Name</p>}
            initialValue={projectName}
          >
            <Input
              initialvalue={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="color"
            label={<p className="font-bold">Color</p>}
            initialValue={selectedColor}
          >
            <Select
              value={selectedColor}
              initialvalue={selectedColor}
              onChange={(value) => {
                setSelectedColor(value);
              }}
            >
              {colorsData.colors.map((color) => (
                <Select.Option
                  key={color.colorName}
                  initialvalue={color.colorName}
                >
                  <div className="flex gap-5 items-center">
                    <div
                      className="h-[10px] w-[10px] rounded-full"
                      style={{ background: `${color.colorCode}` }}
                    ></div>
                    <p>{color.colorName}</p>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="is_favorite" valuePropName="checked">
            <Flex gap={20} align="center">
              <Switch
                size="small"
                className="w-[30px]"
                checked={is_favorite}
                onChange={(checked) => {
                  setis_favorite(checked);
                  form.setFieldsValue({ is_favorite: checked });
                }}
              />
              <p>Add to favorite</p>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectModal;
