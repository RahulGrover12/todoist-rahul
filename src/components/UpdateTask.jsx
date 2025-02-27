import { useState, useContext } from "react";
import { Form, Button, DatePicker, Select, Input } from "antd";
import { ProjectsContext } from "../contexts/ProjectsContext";
import { getApi } from "../api/Api";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateTask = ({ values }) => {
  const { task, handleEditOnClick, handleUpdateTask } = values;
  const { projects } = useContext(ProjectsContext);

  const [selectedProject, setSelectedProject] = useState(task.projectId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onFinish = (formValues) => {
    const { taskName, description, dueDate } = formValues;

    const taskData = {
      content: taskName,
      description: description || "",
      dueDate: dueDate || null,
      projectId: selectedProject,
    };

    setLoading(true);
    taskUpdater(taskData);
  };

  const taskUpdater = async (taskData) => {
    const api = getApi();

    try {
      const resp = await api.updateTask(task.id, taskData);
      if (resp) {
        handleUpdateTask({ ...task, ...taskData });
        handleEditOnClick(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="bg-white rounded-lg pl-5 pr-5 border border-gray-400 w-[40vw]"
      initialValues={{
        taskName: task.content,
        description: task.description,
        dueDate: task.dueDate ? task.dueDate : null,
        project: task.projectId,
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
            onChange={(value) => {
              setSelectedProject(value);
            }}
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
