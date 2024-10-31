import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AdminLayout from '../Layout/DashboardLayout.vue'
import AdminView from '../views/AdminView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'
import TransactionView from '../views/TransactionView.vue'
import UsersView from '../views/UsersView.vue'
import PromotionsView from '../views/PromotionsView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      name: 'AdminLayout',
      component: AdminLayout,
      // meta: {
      //     requiresAuth: true
      // },
      children: [
          {
              path: '/admin/dashboard',
              name: 'Dashboard  ',
              component: DashboardView,
              // meta: {
              //     auth: Constants.adminRoles,
              // },
          },
          {
            path: '/admin/users',
            name: 'Users  ',
            component: UsersView,
            // meta: {
            //     auth: Constants.adminRoles,
            // },
        },
        {
          path: '/admin/subscriptions',
          name: 'Subscriptions',
          component: SubscriptionView,
          // meta: {
          //     auth: Constants.adminRoles,
          // },
      },
      {
        path: '/admin/admin-users',
        name: 'Admin',
        component: AdminView,
        // meta: {
        //     auth: Constants.adminRoles,
        // },
    },
    {
      path: '/admin/transactions',
      name: 'Transactions',
      component: TransactionView,
      // meta: {
      //     auth: Constants.adminRoles,
      // },
  },
  {
    path: '/admin/promotions',
    name: 'Promotions',
    component: PromotionsView,
    // meta: {
    //     auth: Constants.adminRoles,
    // },
},

      ],
  },
  
  ],
})

export default router
