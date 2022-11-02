import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import storage from "store";
import { TOKEN } from "@/stroage/stroage_types";
import { ElMessage } from "element-plus";

export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 3000,
    withCredentials: true,
  });
  // instance.interceptors.request.use(
  //   (config: any) => {
  //     const token = storage.get(TOKEN);
  //     if (token) {
  //       if (config.headers) {
  //         config.headers[TOKEN] = token;
  //       }
  //       return config;
  //     }
  //   },
  //   (error) => Promise.reject(error)
  // );
  // instance.interceptors.response.use(
  //   (response: any) => {
  //     return response;
  //   }
  //   // (error: any) => {
  //   //   const status = error.response.status;
  //   //   switch (status) {
  //   //     case 400:
  //   //       error.message = "参数错误";
  //   //       break;
  //   //     case 404:
  //   //       error.message = "请求地址错误";
  //   //       break;
  //   //     default:
  //   //       break;
  //   //   }
  //   //   ElMessage.error(error.message);
  //   // }
  // );

  return instance(config);
}
