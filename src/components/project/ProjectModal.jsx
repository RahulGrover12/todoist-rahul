import React, { useState } from "react";
import { Modal, Form, Input, Select, Switch, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import colorsData from "../../styles/colors.json";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../../features/projectSlice";

const ProjectModal = ({ title, operation, project, openModal }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(openModal);
  const [projectName, setProjectName] = useState(project ? project.name : "");
  const [selectedColor, setSelectedColor] = useState(
    project ? project.color : "charcoal"
  );
  const [is_favorite, setIsFavorite] = useState(
    project ? project.is_favorite : false
  );
  const [form] = Form.useForm();

  const handleProjectSubmit = (values) => {
    if (operation === "Add") {
      dispatch(addProject(values));
    } else {
      const updatedProject = { ...project, ...values, id: project.id };
      dispatch(
        updateProject({
          project_id: project.id,
          updatedProjectData: updatedProject,
        })
      );
    }
    resetFields();
  };

  const resetFields = () => {
    setIsModalVisible(false);
    setProjectName("");
    setSelectedColor("charcoal");
    setIsFavorite(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFields();
  };

  return (
    <div>
      {operation === "Add" && (
        <PlusOutlined
          onClick={() => setIsModalVisible(true)}
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
        <Form form={form} layout="vertical" onFinish={handleProjectSubmit}>
          <Form.Item name="name" label="Name" initialValue={projectName}>
            <Input onChange={(e) => setProjectName(e.target.value)} />
          </Form.Item>
          <Form.Item name="color" label="Color" initialValue={selectedColor}>
            <Select onChange={(value) => setSelectedColor(value)}>
              {colorsData.colors.map((color) => (
                <Select.Option key={color.colorName}>
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
                  setIsFavorite(checked);
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
