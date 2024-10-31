<template>
    <div class="container pt-[32px]">
        <div class="pr-[30px] pb-[20px] border-b border-[EAECF0]">
            <h1 class="text-[#30374F] font-semibold text-[30px] mb-1 capitalize">Hello, {{ name }}!</h1>

            <!-- {{ email }} -->
            <p class="font-normal text-base text-[#475467]">Manage your account and activities here</p>
        </div>
        <div class="flex flex-col sm:flex-row mt-[32px] gap-[62px]">
            <div v-if="Util.checkIndividualAuth()" class="hidden lg:flex w-full sm:w-[119px] flex-col gap-1">
                <router-link
                    v-for="button in routeButtons"
                    :key="button"
                    active-class="exact-active-link"
                    class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm py-[8px] px-[12px]"
                    :to="button.path"
                    >{{ button.name }}</router-link
                >
            </div>
            <!-- {{ vendorInfo.profileStatus }} -->
            <div v-if="Util.checkVendorAuth()" class="hidden lg:flex w-full sm:w-[119px]">
                <!-- profile status of 4 = blocked; -->

                <div v-if="vendorInfo?.profileStatus === 4" class="w-full flex flex-row sm:flex-col gap-1">
                    <router-link
                        v-for="button in blockedVendorRouteButtons"
                        :key="button"
                        active-class="exact-active-link"
                        class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm py-[8px] px-[12px]"
                        :to="button.path"
                        >{{ button.name }}</router-link
                    >
                </div>

                <div v-else class="w-full flex flex-row sm:flex-col gap-1">
                    <router-link
                        v-for="button in vendorRouteButtons"
                        :key="button"
                        active-class="exact-active-link"
                        class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm py-[8px] px-[12px]"
                        :to="button.path"
                        >{{ button.name }}</router-link
                    >
                </div>
            </div>

            <div class="flex-1 overflow-x-auto">
                <router-view></router-view>
            </div>
        </div>
        <FloatingSidemenuModal class="lg:hidden">
            <template v-slot:menu-items>
                <div class="flex flex-col mt-[100px] gap-[62px]">
                    <div v-if="Util.checkIndividualAuth()" class="flex w-full sm:w-[119px] flex-col gap-1">
                        <router-link
                            v-for="button in routeButtons"
                            :key="button"
                            active-class="exact-active-link"
                            class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm"
                            :to="button.path"
                        >
                            <div @click="toggleSideBar" class="flex items-center py-[8px] px-[12px] w-full">{{ button.name }}</div>
                        </router-link>
                    </div>

                    <div v-if="Util.checkVendorAuth()" class="flex w-full sm:w-[119px]">
                        <!-- profile status of 4 = blocked; -->

                        <div v-if="vendorInfo?.profileStatus === 4" class="w-full flex flex-col gap-1">
                            <router-link
                                v-for="button in blockedVendorRouteButtons"
                                :key="button"
                                active-class="exact-active-link"
                                class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm"
                                :to="button.path"
                            >
                                <div @click="toggleSideBar" class="flex items-center py-[8px] px-[12px] w-full">{{ button.name }}</div>
                            </router-link>
                        </div>

                        <div v-else class="w-full flex flex-col gap-1">
                            <router-link
                                v-for="button in vendorRouteButtons"
                                :key="button"
                                active-class="exact-active-link"
                                class="flex max-h-max rounded-[6px] text-[#667085] font-semibold text-sm"
                                :to="button.path"
                            >
                                <div @click="toggleSideBar" class="flex items-center py-[8px] px-[12px] w-full">{{ button.name }}</div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </template>
        </FloatingSidemenuModal>
    </div>
</template>

<script setup>
import FloatingSidemenuModal from '@/components/reusable/FloatingSidemenuModal.vue';
import { Util } from '/src/util';
import { useStore } from 'vuex';
import { computed, provide, ref } from 'vue';

const store = useStore();
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const sidebarOpen = ref(false);
const name = computed(() => store.getters['authToken/fullName'].split(' ')[0]);
// const email = computed(() => store.getters['authToken/email']);
const toggleSideBar = () => {
    sidebarOpen.value = !sidebarOpen.value;
    // alert('Toggled');
};
const routeButtons = [
    {
        name: 'Profile',
        path: '/settings/profile',
    },
    {
        name: 'Password',
        path: '/settings/password',
    },
    {
        name: 'Saved Cars',
        path: '/settings/saved-cars',
    },
    {
        name: 'My Cars',
        path: '/settings/car-financing',
    },
];

const vendorRouteButtons = [
    {
        name: 'Dashboard',
        path: '/dashboard',
    },
    {
        name: 'Car Listing',
        path: '/listed-cars',
    },
    {
        name: 'Rejected Cars',
        path: '/rejected-cars',
    },
    {
        name: 'Car Order',
        path: '/ordered-cars',
    },
    {
        name: 'Profile',
        path: '/settings/profile',
    },
    {
        name: 'Password',
        path: '/settings/password',
    },
];

const blockedVendorRouteButtons = [
    {
        name: 'Dashboard',
        path: '/dashboard',
    },

    {
        name: 'Profile',
        path: '/settings/profile',
    },
    {
        name: 'Password',
        path: '/settings/password',
    },
];

provide('sidebarOpen', sidebarOpen);
</script>

<style lang="scss" scoped>
.exact-active-link {
    background-color: #fef5f7;
    color: #ff6600;
}
</style>
