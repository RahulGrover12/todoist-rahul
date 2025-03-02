import axios from "axios";
import { config } from "../config/config.js";
const { baseUrl, apiKey } = config;
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});
