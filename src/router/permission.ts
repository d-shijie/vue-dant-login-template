import storage from "store";
import { TOKEN } from "@/stroage/stroage_types";
import router from "@/router";
import type { RouteLocationNormalized } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
router.beforeEach(
  (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
    NProgress.start();
    const token = storage.get(TOKEN);
    if (token || to.path === "/login") {
      next();
      NProgress.done();
    } else {
      next("/login");
      NProgress.done();
    }
    // if (token) {
    //   if (to.path === "/login") {
    //     next({ path: "/" });
    //     NProgress.done();
    //   } else {
    //     next();
    //   }
    // } else {
    //   next("/login");
    //   NProgress.done();
    // }
  }
);

router.afterEach(() => {
  NProgress.done();
});
