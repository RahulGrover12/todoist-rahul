import { TodoistApi } from "@doist/todoist-api-typescript";

const apiKey =
  import.meta.env.VITE_API_KEY || "3f36f5d74d3189ba1997fd1a9a310b20eacb9a2d";

if (!apiKey) {
  console.error("Todoist API key is missing!");
}
const api = new TodoistApi(apiKey);

export const getApi = () => api;
