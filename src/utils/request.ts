import axios from "axios";
import type { AxiosRequestConfig } from "axios";
export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 3000,
    withCredentials: true,
  });
  // instance.interceptors.request.use();
  instance.interceptors.response.use(function resolve(res) {
    return res;
  });
  return instance(config);
}
