import { createRouter, createWebHistory } from 'vue-router'

import DisguiseMain from '@/pages/DisguiseMain.vue'
import DisguiseResult from '@/pages/DisguiseResult.vue'

const routes = [
  { path: "/", component: DisguiseMain },
  { path: "/result", component: DisguiseResult },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;