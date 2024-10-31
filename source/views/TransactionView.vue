<template>
    <div>
  
      <!-- Search Input -->
      <div class="mb-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search users..."
          class="px-4 py-2 w-full border rounded-md"
        />
      </div>
  
      <!-- Users Table -->
      <table class="w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="border-b">
            <td class="px-4 py-2">{{ user.id }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.role }}</td>
            <td class="px-4 py-2">{{ user.status }}</td>
            <td class="px-4 py-2">
              <button class="text-blue-500 hover:underline">Edit</button>
              <button class="text-red-500 hover:underline ml-2">Delete</button>
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
        searchTerm: '',
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
          { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
          { id: 4, name: 'Bob Lee', email: 'bob@example.com', role: 'User', status: 'Active' },
          // Add more users here...
        ],
        currentPage: 1,
        itemsPerPage: 2,  // Define how many users to show per page
      };
    },
    computed: {
      filteredUsers() {
        // Filter the users based on the search term
        return this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
      totalPages() {
        // Calculate the total number of pages
        return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
      },
      paginatedUsers() {
        // Paginate the filtered users
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredUsers.slice(start, end);
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
  