const BackEndRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./pages/Dashboard'),
        meta     : {
            title: 'Dashboard',
        }
    },
    {
        path: '/pre-order',
        name: 'preOrder',
        component: () => import('./pages/pre-order/index'),
        meta     : {
            title: 'Product List',
        }
    },

]



export default BackEndRoutes;
