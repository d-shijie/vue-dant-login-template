import { request } from "@/utils/request";
interface ILogin {
  username: string;
  password: string;
  captcha?: string;
}
export function login(data: ILogin) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
export function getCaptcha() {
  return request({
    url: "/user/captcha",
    method: "get",
  });
}
export function faceLogin() {
  return request({
    url: "/user/faceLogin",
    method: "post",
  });
}
