<template>
    <div class="flex gap-6">
        <div v-for="navItem in navItems" :key="navItem.name" class="flex flex-col gap-4">
            <router-link :to="`/settings/car-financing/${navItem.routeParam}`" exact-active-class="exact-active-link" class="inactive pb-[10px]">
                <div class="text-xs sm:text-sm">{{ navItem.name }}</div>
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
        name: 'Auto Loan',
        routeParam: 'auto-loan',
    },
    {
        name: 'Purchased Cars',
        routeParam: 'purchased-cars',
    },
    {
        name: 'Leased Cars',
        routeParam: 'leased-cars',
    },
    {
        name: 'Rented Cars',
        routeParam: 'rented-cars',
    },
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
