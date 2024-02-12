import { createRouter, createWebHistory } from "vue-router";
import SigninView from "../views/SignInView.vue";
import TasksView from "../views/TasksView.vue";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Sign In",
      component: SigninView,
    },
    {
      path: "/tasks",
      name: "Tasks",
      component: TasksView,
      meta: { requiresAuth: true },
    },
    { path: "/", redirect: "/tasks" },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
