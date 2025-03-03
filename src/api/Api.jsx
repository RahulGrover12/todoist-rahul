import { TodoistApi } from "@doist/todoist-api-typescript";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("Todoist API key is missing!");
}
const api = new TodoistApi(apiKey);

export const getApi = () => api;
