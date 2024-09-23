import { createRouter, createWebHistory } from 'vue-router'
import FrontEndLayout from '../views/frontend/Layout';
import FrontEndRoutes from '../views/frontend/routes';
import NotFound from '../components/404';

const routes = [

  {
    path     : '/',
    component: FrontEndLayout,
    children : FrontEndRoutes
  },

  {
    path     : '/:catchAll(.*)',
    name     : 'Not Found',
    component: NotFound,
    meta     : {
      title: 'Not Found'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
