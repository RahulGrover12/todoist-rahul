import React, { useState, useContext } from "react";
import { Form, Button, DatePicker, Select, Input, message } from "antd";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { LoadingOutlined } from "@ant-design/icons";
import { TasksContext } from "../contexts/TasksContext";

const UpdateTask = ({ values }) => {
  const { task, handleEditOnClick } = values;
  const { projects } = useContext(ProjectsContext);
  const { handleUpdateTask, handleDeleteTask, handleAddTask } =
    useContext(TasksContext);
  const [selectedProject, setSelectedProject] = useState(task.project_id);
  const [loading, setLoading] = useState(false);

  const onFinish = async (formValues) => {
    const { taskName, description } = formValues;
    setLoading(true);

    try {
      if (task.project_id !== selectedProject) {
        const originalMessage = message.success;
        message.success = () => {};

        await handleDeleteTask(task.id);

        await handleAddTask({
          content: taskName,
          description: description || "",
          project_id: selectedProject,
        });

        message.success = originalMessage;

        message.success("Task moved to a new project successfully!");
      } else {
        const updatedTask = {
          id: task.id,
          content: taskName,
          description: description || "",
          project_id: selectedProject,
        };

        await handleUpdateTask(updatedTask);
      }

      handleEditOnClick(false);
    } catch {
      message.error("Task update failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="bg-white rounded-lg pl-5 pr-5 border border-gray-400 w-[40vw]"
      initialValues={{
        taskName: task.content,
        description: task.description,
        project: task.project_id,
      }}
    >
      <Form.Item
        name="taskName"
        rules={[{ required: true, message: "Please enter task name" }]}
      >
        <Input
          placeholder="Task Name"
          style={{ marginTop: "20px", fontWeight: 600 }}
        />
      </Form.Item>

      <Form.Item name="description">
        <Input placeholder="Description" />
      </Form.Item>

      <Form.Item name="dueDate">
        <DatePicker placeholder="Due date" />
      </Form.Item>

      <hr />
      <div className="flex justify-between gap-5 mt-3">
        <Form.Item name="project">
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

        <div className="flex gap-2 justify-end">
          <Button onClick={() => handleEditOnClick(false)}>Cancel</Button>
          <Button htmlType="submit" className="bg-red-500 text-white">
            Save {loading && <LoadingOutlined />}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default UpdateTask;
