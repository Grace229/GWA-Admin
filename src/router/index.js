import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/components/HomeView.vue';
import TestView from '/src/components/TestView.vue';
import { Constants } from '@/util';
import SidebarLayout from '/src/layouts/SideBar.vue';
import About from '/src/components/About.vue';
import MainLayout from '/src/layouts/AltDrive.vue';
import LandingPage from '/src/views/LandingPages/Main/LandingPage.vue';
import BuyACar from '/src/views/LandingPages/BuyACar/BuyACar.vue';
import LeaseACar from '/src/views/LandingPages/LeaseACar/LeaseACar.vue';
import RentACar from '/src/views/LandingPages/RentACar/RentACar.vue';
import LandingPageBaseLayout from '/src/layouts/LandingPageBaseLayout.vue';
import OnboardingBaseLayout from '/src/layouts/OnboardingBaseLayout.vue';
import VendorSignupBaseLayout from '/src/views/signup/vendor/VendorSignupBaseLayout.vue';
import Signup from '/src/views/signup/Signup.vue';
import Login from '/src/views/login/Login.vue';
import VueIndex from '/src/views/VueIndex.vue';
import OrdersIndex from '@/views/admin/adminViews/adminOrders/OrdersIndex.vue';
import PaymentIndex from '@/views/admin/adminViews/adminPayments/PaymentIndex.vue';
import AdminUsersIndex from '@/views/admin/adminViews/adminUsers/AdminUsersIndex.vue';
import ProductsIndex from '@/views/admin/adminViews/adminProducts/ProductsIndex.vue';
import AuthLayout from '/src/layouts/AuthLayout.vue';
import Profile from '/src/views/AuthPages/Profile.vue';
import Dashboard from '/src/views/AuthPages/Dashboard.vue';
import SignupIndividual from '/src/views/signup/SignupIndividual.vue';
import AdminLayout from '@/views/admin/AdminLayout.vue';
import AdminDashboard from '@/views/admin/adminViews/adminDashboard/AdminDashboard.vue';
import Search from '@/views/search/Search.vue';
import guard from '@/router/guard.js';
import store from '@/store';


const routes = [
    {
        path: '/admin',
        // meta: {
        //     auth: Constants.adminRoles,
        // },
        redirect: '/admin/dashboard',
        name: 'AdminLayout',
        component: AdminLayout,
        // meta: {
        //     auth: Constants.adminRoles,
        //     requiresAuth: true
        // },
        children: [
            {
                path: '/admin/dashboard',
                name: 'Dashboard  ',
                component: VueIndex,
                // meta: {
                //     auth: Constants.adminRoles,
                //     requireAuth: true
                // },
                children: [
                    {
                        path: '',
                        name: 'AdminDashboard',
                        component: AdminDashboard,
                    },
                ],
            },
            {
                path: '/admin/users',
                redirect: '/admin/users/users-list',
                name: 'User Management',
                component: VueIndex,
                children: [
                    {
                        path: '/admin/users/:list',
                        name: 'User Listing',
                        component: () => import('@/views/admin/adminViews/adminVendors/Vendors.vue'),
                    },
                    {
                        path: '/admin/users/details/:id',
                        name: 'User Details',
                        component: () => import('@/views/admin/adminViews/adminVendors/VendorDetails.vue'),
                    },
                ],
            },
            {
                path: '/admin/customers',
                redirect: '/admin/customers/customers-list',
                name: 'Customer Management',
                component: VueIndex,
                children: [
                    {
                        path: '/admin/customers/:list',
                        name: 'Customer Listing',
                        component: () => import('@/views/admin/adminViews/adminCustomer/Customers.vue'),
                    },
                    {
                        path: '/admin/customers/details/:id',
                        name: 'Customer Details',
                        component: () => import('@/views/admin/adminViews/adminCustomer/CustomerDetails.vue'),
                    },
                ],
            },
            {
                path: '/admin/orders',

                name: 'Transactions',
                component: OrdersIndex,
                children: [
                    {
                        path: '',
                        name: 'Orders Listing',
                        component: () => import('@/views/admin/adminViews/adminOrders/OrdersList.vue'),
                    },

                    {
                        path: '/admin/order/:tab/:vehicleId/:orderId/:customerId',
                        name: 'Order',
                        component: () => import('@/views/admin/adminViews/adminOrders/Order.vue'),
                    },
                    //     ],
                    // },
                ],
            },
            {
                path: '/admin/payments',

                name: 'Payment',
                component: PaymentIndex,
                children: [
                    {
                        path: '',
                        name: 'Payments Listing',
                        component: () => import('@/views/admin/adminViews/adminPayments/PaymentsList.vue'),
                    },

                    // {
                    //     path: '/admin/order/:tab/:vehicleId/:orderId/:customerId',
                    //     name: 'Order',
                    //     component: () => import('@/views/admin/adminViews/adminOrders/Order.vue'),
                    // },
                    //     ],
                    // },
                ],
            },
            {
                path: '/admin/products',
                redirect: '/admin/products/all-cars',
                name: 'Recommendations',
                component: ProductsIndex,
                children: [
                    {
                        path: '/admin/products',
                        name: 'Product Listing',
                        component: () => import('@/views/admin/adminViews/adminProducts/Products.vue'),
                    },
                    {
                        path: '/admin/product/vehicle-details/:vehicleId',
                        name: 'Product',
                        component: () => import('@/views/admin/adminViews/adminProducts/vehicleDetails/Product.vue'),
                    },
                    {
                        path: '/admin/product/edit/:vehicleId',
                        name: 'Edit Product',
                        meta: {
                            action: 'Edit Car',
                        },
                        component: () => import('@/views/admin/adminViews/adminProducts/editProduct/EditProductParam.vue'),
                    },
                ],
            },
            //
            {
                path: '/admin/admin_users',

                name: 'Admin Management',
                component: AdminUsersIndex,
                children: [
                    {
                        path: '',
                        name: 'Admin Users Listing',
                        component: () => import('@/views/admin/adminViews/adminUsers/AdminUsersList.vue'),
                        // meta: {
                        //     auth: ['SuperAdmin'],
                        // },
                    },

                    //     ],
                    // },
                ],
            },
            //
            {
                path: '/admin/subscriptions',
                redirect: '/admin/subscriptions/subscriptions',
                name: 'Subscriptions',
                component: VueIndex,
                children: [
                    {
                        path: '/admin/subscriptions/:list',
                        name: 'Subscriptions Listing',
                        component: () => import('@/views/admin/adminViews/feesAndCommission/FeesAndCommission.vue'),
                    },
                ],
            },
            {
                path: '/admin/audit_logs',

                name: 'Audit Logs',
                component: VueIndex,
                children: [
                    {
                        path: '',
                        name: 'AuditLogs Listing',
                        component: () => import('@/views/admin/adminViews/auditLogs/AuditLogs.vue'),
                        // meta: {
                        //     auth: ['SuperAdmin'],
                        // },
                    },
                    // {
                    //     path: '/admin/vendors/:list',
                    //     name: 'Order Listing',
                    //     component: () => import('@/views/admin/adminViews/adminVendors/Vendors.vue'),
                    // },
                ],
            },
        ],
    },
    // {
    //     path: '/baselayouts',
    //     name: 'SidebarLayout',
    //     component: SidebarLayout,
    //     children: [
    //         // {
    //         //     path: '',
    //         //     name: 'Test',
    //         //     component: TestView,
    //         // },
    //         {
    //             path: 'home',
    //             name: 'Home',
    //             component: Home,
    //         },
    //         // {
    //         //     path: '/about',
    //         //     name: 'About',
    //         //     component: About,
    //         // },
    //     ],
    // },

    {
        path: '/',

        redirect: '/login',
        component: OnboardingBaseLayout,
        name: 'OnboardingBaseLayout',
        meta: {
            skipAuth: true,
        },
        children: [
            {
                path: '/signup',
                name: 'Signup',
                component: Signup,
            },
            {
                path: '/signup/individual',
                name: 'SignupIndividual',
                component: SignupIndividual,
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },

            {
                path: '/forgot-password',
                name: 'Forgot Password',
                component: () => import('/src/views/login/ForgotPassword.vue'),
            },

            {
                path: '/reset-password',
                name: 'Reset Password',
                component: () => import('/src/views/login/ResetPassword.vue'),
            },
        ],
    },

    // {
    //     path: '/vendor',
    //     name: 'Vendor',
    //     meta: {
    //         skipAuth: true,
    //     },

    //     component: VueIndex,
    //     children: [
    //         {
    //             path: '',
    //             redirect: '/vendor-signup/provide-contacts',
    //             meta: {
    //                 skipAuth: true,
    //             },
    //             component: VendorSignupBaseLayout,
    //             children: [
    //                 {
    //                     path: '/vendor-signup/:step',
    //                     name: 'Vendor Signup',
    //                     component: () => import('/src/views/signup/vendor/SignupVendor.vue'),
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        path: '/confirm-email',
        // redirect: '/vendor-signup/choose-password',
        name: 'ConfirmVendorEmail',
        component: () => import('/src/views/signup/ConfirmVendorEmail.vue'),
    },
    {
        path: '/landing',
        name: 'LandingPageBaseLayout',
        component: LandingPageBaseLayout,
        children: [
            {
                path: '',
                name: 'LandingPage',
                component: LandingPage,
                meta: {
                    skipAuth: true,
                },
            },
            {
                path: '/buy',
                name: 'BuyACar',
                component: BuyACar,
                meta: {
                    skipAuth: true,
                },
            },
            {
                path: '/lease',
                name: 'LeaseACar',
                component: LeaseACar,
                meta: {
                    skipAuth: true,
                },
            },

] 
},     
    {
        path: '/:catchAll(.*)',
        name: 'Not found',
        component: () => import(/* webpackChunkName: "notfound" */ '/src/views/NotFound.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return { ...savedPosition, behavior: 'smooth' };
        }
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
        return { top: 0, behavior: 'smooth' };
    },
});


// router.beforeEach((to, from, next) => {
//     const isAuthenticated = store.getters['authToken/loggedIn']
//     if (to.meta.requiresAuth && !isAuthenticated) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   });

router.beforeEach(guard);

// export { routes, router as default };
export default router;
