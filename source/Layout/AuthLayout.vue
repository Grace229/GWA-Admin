<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div :class="isCollapsed ? 'w-20' : 'w-64'" class="bg-gray-800 text-white transition-width duration-300">
        <div class="flex justify-between items-center p-4">
          <h1 v-if="!isCollapsed" class="text-2xl">Dashboard</h1>
          <button @click="toggleSidebar">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="p-4">
          <router-link to="/" class="block py-2">Dashboard</router-link>
          <router-link to="/tables" class="block py-2">Tables</router-link>
          <router-link to="/analytics" class="block py-2">Analytics</router-link>
        </nav>
      </div>
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Navbar -->
        <nav class="bg-white shadow-md px-4 py-2 flex justify-between items-center">
          <div class="text-lg font-bold">My Dashboard</div>
          <div>
            <button class="bg-gray-800 text-white px-3 py-2 rounded">Logout</button>
          </div>
        </nav>
  
        <!-- Dashboard Main Content -->
        <main class="flex-1 p-6 bg-gray-100">
          <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
  
          <!-- Cards Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white p-4 shadow-md rounded-lg">
              <h3 class="text-lg font-bold">Total Users</h3>
              <p class="text-4xl font-semibold mt-2">1,234</p>
            </div>
            <div class="bg-white p-4 shadow-md rounded-lg">
              <h3 class="text-lg font-bold">Total Sales</h3>
              <p class="text-4xl font-semibold mt-2">$12,345</p>
            </div>
            <div class="bg-white p-4 shadow-md rounded-lg">
              <h3 class="text-lg font-bold">Monthly Growth</h3>
              <p class="text-4xl font-semibold mt-2">15%</p>
            </div>
          </div>
  
          <!-- Chart Section -->
          <div class="bg-white p-6 shadow-md rounded-lg">
            <h3 class="text-xl font-bold mb-4">Sales Overview</h3>
            <canvas id="salesChart"></canvas>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    setup() {
      const isCollapsed = ref(false);
  
      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
      };
  
      const renderChart = () => {
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                label: 'Sales',
                data: [1000, 2000, 3000, 4000, 5000, 6000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Sales',
              },
            },
          },
        });
      };
  
      onMounted(() => {
        renderChart();
      });
  
      return {
        isCollapsed,
        toggleSidebar,
      };
    },
  };
  </script>
  
  <style scoped>
  .transition-width {
    transition-property: width;
  }
  </style>
  