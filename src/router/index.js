import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth';

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
        children: FrontEndRoutes,
        meta: {
            requiresAuth: false,
        }
    },

    {
        path: '/',
        component: BackendEndLayout,
        children: BackEndRoutes,
        meta: {
            requiresAuth: true,
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

// Route guard for authentication
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' });
    }
    else if (to.name === 'login' && authStore.isAuthenticated) {
        console.log('User is already authenticated')
        next({ name: 'dashboard' });
    }
    else {
        next();
    }
});

export default router
