import { createRouter, createWebHistory } from "vue-router";
import Auth from "../pages/Auth.vue";
import Home from "../pages/Home.vue";
import Create from "../pages/Create.vue";

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
