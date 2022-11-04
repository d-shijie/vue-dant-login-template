import { defineStore } from "pinia";
interface IState {
  flag: string;
}
export const useControlStore = defineStore("control", {
  state: (): IState => {
    return {
      flag: "userLogin",
    };
  },
  actions: {
    SET_FLAG(flag: string) {
      this.flag = flag;
    },
  },
});
