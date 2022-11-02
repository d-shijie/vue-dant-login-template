import { defineStore } from "pinia";
interface IState {
  name: string;
  age: number;
  sex: string;
}
export const useUserStore = defineStore("user", {
  state: (): IState => {
    return {
      name: "张三",
      age: 18,
      sex: "男",
    };
  },
  actions: {
    changeName(name: string) {
      this.name = name;
    },
    addAge() {
      this.age++;
    },
  },
});
