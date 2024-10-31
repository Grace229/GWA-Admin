<template>
    <div>
        <Logo  class="logoClass m-5" />
        <div class="duplicate-tab-warning">

<h2>Duplicate Tab Warning</h2>
<p>You have a duplicate tab open. Please close this tab to continue.</p>
</div>
    </div>
 
</template>
<script setup>
import Logo from './reusable/SterlingLogo.vue'
</script>
<style lang="css" scoped>
.duplicate-tab-warning {
  text-align: center;
  padding: 50px;
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #ff0000;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  margin: 50px;
}

.duplicate-tab-warning h2 {
  font-size: 24px;
}

.duplicate-tab-warning p {
  font-size: 18px;
}
</style>