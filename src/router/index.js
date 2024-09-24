import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth';

import FrontEndLayout from '../views/frontend/Layout';
import FrontEndRoutes from '../views/frontend/routes';

// Backend
import BackendEndLayout from '../views/backend/Layout';
import BackEndRoutes from '../views/backend/routes';

import NotFound from '../components/404';
import ApiService from "@/service/api.service";

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
        name: 'NotFound',
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


// Route guard for authentication and permission checking
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Check if the route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'login' });
    }
    else if (to.name === 'login' && authStore.isAuthenticated) {
        next({ name: 'dashboard' });
    }
    else {
        // If user is authenticated and route requires permissions, check them
        if (to.meta.requiredPermission) {
            try {
                // Check if permissions are already loaded, otherwise fetch them
                if (!authStore.permissions.length) {
                    const permissions = await ApiService.get('/user');
                    authStore.SET_PERMISSIONS(permissions.data.data.permissions);
                }

                // Check if the user has the required permission
                if (authStore.permissions.includes(to.meta.requiredPermission)) {
                    next();
                } else {
                    next({ name: 'NotFound' }); // Redirect to 404 or any other page if permission denied
                }
            } catch (error) {
                next({ name: 'login' }); // Redirect to login if there's an issue
            }
        }
        else {
            next(); // No permissions required for the route
        }
    }
});

export default router
