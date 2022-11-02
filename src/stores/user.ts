import { defineStore } from "pinia";
interface IState {
  username: string;
  token: string;
  role: string;
  info?: any;
}
export const useUserStore = defineStore("user", {
  state: (): IState => {
    return {
      username: "",
      token: "",
      role: "",
      info: {},
    };
  },
  actions: {
    SET_USERNAME(username: string) {
      this.username = username;
    },
    SET_ROLE(role: string) {
      this.role = role;
    },
    SET_TOKEN(token: string) {
      this.token = token;
    },
  },
});
