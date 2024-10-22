<template>
    <div>
      <!-- Subscriptions Table -->
      <table class="w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="px-4 py-2">Subscription ID</th>
            <th class="px-4 py-2">User</th>
            <th class="px-4 py-2">Plan</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Start Date</th>
            <th class="px-4 py-2">End Date</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subscription in paginatedSubscriptions" :key="subscription.id" class="border-b">
            <td class="px-4 py-2">{{ subscription.id }}</td>
            <td class="px-4 py-2">{{ subscription.user }}</td>
            <td class="px-4 py-2">{{ subscription.plan }}</td>
            <td class="px-4 py-2">{{ subscription.status }}</td>
            <td class="px-4 py-2">{{ subscription.startDate }}</td>
            <td class="px-4 py-2">{{ subscription.endDate }}</td>
            <td class="px-4 py-2">
              <button class="text-blue-500 hover:underline">Upgrade</button>
              <button class="text-red-500 hover:underline ml-2">Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="mt-4 flex justify-between">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>
  
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
  
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        subscriptions: [
          { id: 1, user: 'John Doe', plan: 'Pro', status: 'Active', startDate: '2024-01-01', endDate: '2025-01-01' },
          { id: 2, user: 'Jane Smith', plan: 'Free', status: 'Expired', startDate: '2022-01-01', endDate: '2023-01-01' },
          { id: 3, user: 'Alice Johnson', plan: 'Premium', status: 'Active', startDate: '2023-06-01', endDate: '2024-06-01' },
          { id: 4, user: 'Bob Lee', plan: 'Pro', status: 'Expired', startDate: '2023-04-01', endDate: '2024-04-01' },
          // Add more subscriptions here...
        ],
        currentPage: 1,
        itemsPerPage: 2,  // Define how many subscriptions to show per page
      };
    },
    computed: {
      totalPages() {
        // Calculate the total number of pages
        return Math.ceil(this.subscriptions.length / this.itemsPerPage);
      },
      paginatedSubscriptions() {
        // Paginate the subscriptions
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.subscriptions.slice(start, end);
      },
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
  };
  </script>
  