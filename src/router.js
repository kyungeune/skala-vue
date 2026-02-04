import { createRouter, createWebHistory } from 'vue-router'

// import DisguiseMain from '@/pages/DisguiseMain.vue'
// import DisguiseResult from '@/pages/DisguiseResult.vue'
import AppLecture from './AppLectures.vue'
import LoginPage from './pages/LoginPage.vue';
import ProductListPage from './pages/ProductListPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import CartPage from './pages/CartPage.vue';

const routes = [
  // { path: "/", component: DisguiseMain },
  // { path: "/result", component: DisguiseResult },
  { path: '/', redirect: { name: 'login' } },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/products', name: 'products', component: ProductListPage },
  { path: '/products/:id', name: 'productDetail', component: ProductDetailPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;