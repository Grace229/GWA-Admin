<template>
    <div class="flex h-screen">
        <Sidebar />

        <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-1 p-6 bg-gray-100">
       <router-view></router-view>

        </main>
        </div>

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import Navbar from '../components/Navbar.vue';
  
  export default {
    components: {
      Sidebar,
      Navbar,
    },
    setup() {
      const items = ref([
        { id: 1, name: 'Item 1', status: 'Active' },
        { id: 2, name: 'Item 2', status: 'Inactive' },
        { id: 3, name: 'Item 3', status: 'Active' },
      ]);
  
      return {
        items,
      };
    },
  };
  </script>
  