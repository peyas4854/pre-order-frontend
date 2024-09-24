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
            requiredPermission: 'pre-order-list'
        }
    },
    {
        path: 'pre-order/view/:id',
        name: 'preOrderView',
        component: () => import('./pages/pre-order/view'),
        meta     : {
            title: 'Product View',
            requiredPermission: 'pre-order-show'
        }
    },

]



export default BackEndRoutes;
