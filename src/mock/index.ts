import Mock from "mockjs";
Mock.setup({
  timeout: 800,
});
// const baseUrl = "http://localhost:3000";
interface Idata {
  code: number;
  msg: string;
  data: any;
}
const userData: Idata = {
  code: 200,
  msg: "success",
  data: {
    token: "dant_template_token",
    username: "dant",
    role: "admin",
    id: 1,
  },
};
const captchaData = () => {
  return {
    code: 200,
    msg: "success",
    data: {
      captcha: Mock.Random.dataImage("120x40", "dant"),
    },
  };
};
Mock.mock("/api/user/login", "post", (options: { body: any }) => {
  const { username, password, captcha } = JSON.parse(options.body);
  if (username === "admin" && password === "admin" && captcha === "dant") {
    return userData;
  } else if (
    username !== "admin" &&
    password === "admin" &&
    captcha === "dant"
  ) {
    return "账号错误";
  } else if (
    username === "admin" &&
    password !== "admin" &&
    captcha === "dant"
  ) {
    return "密码错误";
  } else if (
    username === "admin" &&
    password === "admin" &&
    captcha !== "dant"
  ) {
    return "验证码错误";
  } else {
    return "登录失败";
  }
});
Mock.mock("/api/user/captcha", "get", captchaData);
Mock.mock("/api/user/faceLogin", "post", () => {
  return userData;
});
