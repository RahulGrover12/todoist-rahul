import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/taskSlice";
import { LoadingOutlined } from "@ant-design/icons";

const AddNewTask = ({ values }) => {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const { handleAddTaskClicked, splitParam } = values;

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const currentProject = projects.find(
    (project) => project.id === splitParam[1]
  );
  const [selectedProject, setSelectedProject] = useState(splitParam[1]);

  const onFinish = async (formValues) => {
    const { taskName, description } = formValues;

    const taskData = {
      content: taskName,
      description: description || "",
      project_id: selectedProject,
    };

    setIsSubmitting(true);
    await dispatch(addTask(taskData));
    setIsSubmitting(false);
    handleAddTaskClicked(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    handleAddTaskClicked(false);
  };

  return (
    <>
      <Modal
        title="Add Task"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Add Task"
        okButtonProps={{
          disabled: isSubmitting,
          style: { background: isSubmitting ? "#EDA59E" : "#C3392C" },
        }}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>,
          <Button
            key="submit"
            className="bg-red-500 text-white"
            onClick={() => form.submit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingOutlined /> : "Add Task"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          initialValues={{
            taskName: "",
            description: "",
            dueDate: null,
            projects: currentProject?.id || undefined,
          }}
        >
          <Form.Item
            name="taskName"
            label={<p className="font-bold">Task Name</p>}
            rules={[{ required: true, message: "Please enter task name" }]}
          >
            <Input placeholder="Enter new task name" disabled={isSubmitting} />
          </Form.Item>

          <Form.Item
            name="description"
            label={<p className="font-bold">Description</p>}
          >
            <Input placeholder="Enter description" disabled={isSubmitting} />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label={<p className="font-bold">Due Date</p>}
          >
            <DatePicker placeholder="Select due date" disabled={isSubmitting} />
          </Form.Item>

          <Form.Item
            name="projects"
            label={<p className="font-bold">Project</p>}
          >
            <Select
              value={selectedProject}
              onChange={(value) => setSelectedProject(value)}
              disabled={isSubmitting}
            >
              {projects.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  # {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewTask;
