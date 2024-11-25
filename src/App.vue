<template>
    <SpinnerLoader v-if="tabLoad" class="mx-auto my-40 h-[50px] w-[50px]" />
    <!-- <DuplicateTab v-if="noTab" /> -->
     <div v-else>
        <DuplicateTab v-if="noTab"  />
<div v-else>
    <global-alert />
    <router-view></router-view>
     </div>
   

</div>
</template>

<script setup>
import GlobalAlert from '/src/views/alert/GlobalAlert.vue';
import DuplicateTab from './components/DuplicateTab.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Reactive state
const tabLoad = ref(true);
const noTab = ref(false);
let callCenterInterval = null;

// Generate a unique cookie name based on the application's hostname
const cookieName = `ic_window_id_${window.location.hostname}`;

// Helper function to set a cookie
const setCookie = (cname, cvalue, seconds) => {
  const d = new Date();
  d.setTime(d.getTime() + seconds * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

// Helper function to get a cookie
const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Helper function to clear the cookie
const clearCookie = () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Function to validate the call center tab
const validateCallCenterTab = () => {
  const winIdCookieDuration = 10; // in seconds

  if (!window.name) {
    window.name = Math.random().toString();
  }

  const icWindowId = getCookie(cookieName);

  if (!icWindowId || window.name === icWindowId) {
    // One tab, set/clobber cookie
    setCookie(cookieName, parseFloat(window.name), winIdCookieDuration);
  } else if (icWindowId !== window.name) {
    // Multiple tabs error
    noTab.value = true;
    clearInterval(callCenterInterval);
    throw "Multiple call center tabs error. Program terminating.";
  }
};

// Lifecycle hook to run code when the component is mounted
onMounted(() => {
  clearCookie();

  // Simulate a loading state for 2.5 seconds
  setTimeout(() => {
    tabLoad.value = false;
  }, 2500);

  // Set an interval to validate tabs every 2 seconds
  callCenterInterval = setInterval(validateCallCenterTab, 2000);
});

// Lifecycle hook to clear interval when the component is destroyed
onBeforeUnmount(() => {
  clearInterval(callCenterInterval);
});
</script>

<style lang="scss">

</style>
