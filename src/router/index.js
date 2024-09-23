import {createRouter, createWebHistory} from 'vue-router'
import FrontEndLayout from '../views/frontend/Layout';
import FrontEndRoutes from '../views/frontend/routes';

// Backend
import BackendEndLayout from '../views/backend/Layout';
import BackEndRoutes from '../views/backend/routes';

import NotFound from '../components/404';

const routes = [

    {
        path: '/',
        component: FrontEndLayout,
        children: FrontEndRoutes
    },

    {
        path: '/',
        component: BackendEndLayout,
        children: BackEndRoutes,
        meta: {
            requireAuth: true,
        }
    },

    {
        path: '/:catchAll(.*)',
        name: 'Not Found',
        component: NotFound,
        meta: {
            title: 'Not Found'
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
