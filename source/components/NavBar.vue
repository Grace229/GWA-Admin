<template>
  <nav class="bg-white shadow-md px-4 py-2 fixed w-[77%] z-10 flex justify-between items-center">
    <div class="text-lg font-bold">{{currentPageName}}</div>
    <div>
      <button class="bg-gray-800 text-white px-3 py-2 rounded">Logout</button>
    </div>
  </nav>
</template>
<script setup>
import {useRoute} from 'vue-router'
import {computed} from 'vue'
// Use the `useRoute` hook to access the current route
const route = useRoute();

// Create a computed property to display the current page name
const currentPageName = computed(() => {
  return route.name || 'Unknown Page'; // Fallback in case name is not defined
});
defineProps({
  isCollapsed : Boolean
})
const navbarStyle = computed(() => {
      return isCollapsed.value ? { width: 'calc(100% - 5rem)' } : { width: 'calc(100% - 16rem)' };
    });
</script>