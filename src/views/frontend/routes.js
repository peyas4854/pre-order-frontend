const FrontendRoutes = [

    {
        path: '/',
        name: 'home',
        component: () => import('../frontend/pages/Home'),
        meta     : {
            title: 'Home',
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../frontend/pages/Login'),
        meta     : {
            title: 'Login',
        }
    },

]

export default FrontendRoutes;
