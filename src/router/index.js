import { createRouter, createWebHistory } from "vue-router";
import ROIPage from "../components/ROICalculator.vue";
import TokenPage from "../components/TokenCalculator.vue";
import AboutPage from "../components/About.vue";

const routes = [
  {
    path: "/",
    component: ROIPage,
  },
  {
    path: "/tokens",
    component: TokenPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
