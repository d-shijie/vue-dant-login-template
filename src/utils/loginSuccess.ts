// import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { TOKEN } from "@/stroage/stroage_types";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import storage from "store";
const store = useUserStore();
// const router = useRouter();
export const loginSuccess = (data: any) => {
  if (!data.data) {
    ElMessage.error(data);
    return;
  }
  storage.set(TOKEN, data.data.token);
  store.SET_TOKEN(data.data.token);
  store.SET_USERNAME(data.data.username);
  router.push("/");
};
