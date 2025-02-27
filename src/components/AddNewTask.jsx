import { useState, useContext } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { getApi } from "../api/Api";

const AddNewTask = ({ values }) => {
  const { projects } = useContext(ProjectsContext);
  const { handleAddTaskClicked, splitParam, handleAddTask } = values;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [form] = Form.useForm();
  const api = getApi();

  const currentProject = projects.find(
    (project) => project.id === splitParam[1]
  );

  const [selectedProject, setSelectedProject] = useState(splitParam[1]);

  const onFinish = async (formValues) => {
    const { taskName, description, dueDate } = formValues;

    const taskData = {
      content: taskName,
      description: description || "",
      dueDate: dueDate || null,
      projectId: selectedProject,
    };

    try {
      const response = await api.addTask(taskData);
      message.success("Task added successfully");
      console.log("Task added:", response);
      handleAddTaskClicked(false);
      if (response) {
        handleAddTask(response);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      message.error("Failed to add task");
    }
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
          style: { background: "#C3392C" },
        }}
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
            <Input placeholder="Enter new task name" />
          </Form.Item>

          <Form.Item
            name="description"
            label={<p className="font-bold">Description</p>}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label={<p className="font-bold">Due Date</p>}
          >
            <DatePicker placeholder="Select due date" />
          </Form.Item>

          <Form.Item
            name="projects"
            label={<p className="font-bold">Project</p>}
          >
            <Select
              value={selectedProject}
              onChange={(value) => setSelectedProject(value)}
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
