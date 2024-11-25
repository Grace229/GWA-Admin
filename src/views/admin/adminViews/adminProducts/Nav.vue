<template>
    <div class="flex gap-6 border-b mt-4">
        <div v-for="navItem in navItems" :key="navItem.name" class="flex flex-col gap-4">
            <router-link :to="`/admin/products/${navItem.routeParam}`" exact-active-class="exact-active-link" class="inactive pb-[10px]">
                <div class="">{{ navItem.name }}</div>
                <!-- <div class="h-[2.5px] bg-red-400 mt-3"></div> -->
                <!-- <div :class="['h-[4px] bg-red-400']"></div> -->
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const currentPage = inject('currentPage');

const navItems = [
    {
        name: 'Recommendations',
        routeParam: 'car-parameters',
    }
];
</script>

<style lang="scss" scoped>
.inactive {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    /* Gray/500 */

    color: #667085;
    // border-bottom: 2px solid #667085;
}

.exact-active-link {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    /* Gray/700 */

    color: #344054;
    border-bottom: 2px solid #344054;
}
</style>
