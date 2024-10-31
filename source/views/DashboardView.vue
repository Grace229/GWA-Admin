<template>
  <div>
    <div class="flex">

      <main class="flex-1 p-6">

        <!-- Analytics Cards -->
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
          <h3 class="text-xl font-bold mb-4">Analytics</h3>
          <canvas id="myChart"></canvas>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

    const initializeChart = () => {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Sales',
              data: [65, 59, 80, 81, 56, 55],
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
      initializeChart();
    });

</script>
