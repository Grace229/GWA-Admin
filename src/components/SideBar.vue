<template>
  <div :class="isCollapsed ? 'w-20' : 'w-64'" class="bg-gray-800 text-white transition-width duration-300">
    <div class="flex justify-between items-center p-4">
      <div v-if="!isCollapsed" class="text-2xl">
        <img src="../assets/logo.svg" alt="logo" />
      </div>
      <button @click="toggleSidebar">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <nav class="p-6">
  <router-link to="/admin/dashboard" class="block py-4 flex items-center space-x-2" active-class="text-white font-bold "
  exact>
    <DashboardIcon /> 
    <span>Dashboard</span>
  </router-link>
  
  <router-link to="/admin/users" class="block py-4 flex items-center space-x-2">
    <UsersIcon /> 
    <span>Users</span>
  </router-link>

  <router-link to="/admin/subscriptions" class="block py-4 flex items-center space-x-2">
    <SubscriptionIcon /> 
    <span>Subscription</span>
  </router-link>

  <router-link to="/admin/admin-users" class="block py-4 flex items-center space-x-2">
    <AdminIcon /> 
    <span>Admin</span>
  </router-link>

  <router-link to="/admin/transactions" class="block py-4 flex items-center space-x-2">
    <TransactionIcon /> 
    <span>Transaction History</span>
  </router-link>

  <router-link to="/admin/promotions" class="block py-4 flex items-center space-x-2">
    <PromotionIcon />
    <span>Promotions</span>
  </router-link>

  <router-link to="/logout" class="block py-4 flex items-center space-x-2">
    <LogoutIcon /> 
    <span>Logout</span>
  </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminIcon from './icons/AdminIcon.vue';
import DashboardIcon from './icons/DashboardIcon.vue';
import UsersIcon from './icons/UsersIcon.vue';
import SubscriptionIcon from './icons/SubscriptionIcon.vue';
import LogoutIcon from './icons/LogoutIcon.vue';
import TransactionIcon from './icons/TransactionIcon.vue';
import PromotionIcon from './icons/PromotionIcon.vue';

    const isCollapsed = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };
</script>

<style scoped>
.transition-width {
  transition-property: width;
}
</style>
