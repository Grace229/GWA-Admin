<template>
    <div class="flex h-screen">
        <Sidebar :toggleSidebar="toggleSidebar" :isCollapsed="isCollapsed" />

        <div class="flex-1 flex flex-col ml-20 transition-all duration-300" :class="isCollapsed ? 'ml-20' : 'ml-64'">
      <Navbar :isCollapsed="isCollapsed" />
      <main class="flex-1 mt-16 p-6 bg-gray-100 w-[99%]">
       <router-view></router-view>

        </main>
        </div>

    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Sidebar from '../components/SideBar.vue';
  import Navbar from '../components/NavBar.vue';
  const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
const mainStyle = computed(() => {
      return isCollapsed.value ? { width: 'calc(100% - 7%)' } : { width: 'calc(100% - 20%)' };
    });  
  </script>
  
  