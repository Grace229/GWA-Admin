<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-[#F5F9FC] pt-5 pb-4">
                            <TransitionChild
                                as="template"
                                enter="ease-in-out duration-300"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="ease-in-out duration-300"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <div class="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        @click="sidebarOpen = false"
                                    >
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="flex flex-shrink-0 items-center px-4">
                                <Logo class="logoClass" />
                            </div>
                            <div class="mt-5 h-0 flex-1 overflow-y-auto">
                                <nav class="flex-1 space-y-1 px-2 py-4">
                                    <router-link
                                        v-for="item in navigation"
                                        active-class="exact-active-link"
                                        class="flex items-center max-h-max rounded-[6px] text-[#667085] font-semibold text-sm"
                                        :key="item.name"
                                        :to="item.href"
                                    >
                                        <div class="flex items-center py-[11px] px-[15px] w-full" @click="sidebarOpen = false">
                                            <component
                                                :active="parentPath === item.href"
                                                :is="item.icon"
                                                :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 h-6 w-6 flex-shrink-0']"
                                                aria-hidden="true"
                                            />
                                            <span> {{ item.name }}</span>
                                        </div>
                                    </router-link>
                                </nav>
                                <!-- <nav class="space-y-1 px-2">
                                    <a
                                        v-for="item in navigation"
                                        :key="item.name"
                                        :href="item.href"
                                        :class="[
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                                        ]"
                                    >
                                        <component
                                            :is="item.icon"
                                            :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 h-6 w-6 flex-shrink-0']"
                                            aria-hidden="true"
                                        />
                                        {{ item.name }}
                                    </a>
                                </nav> -->
                            </div>

                            <div @click="logout" class="mx-2 bg-white cursor-pointer flex items-center max-h-max rounded-[6px] text-[#667085] font-semibold text-sm py-[11px] px-[15px]">
                                <!-- <img src="/logoutIcon.png" alt="" class="h-3 w-3" /> -->
                                <span>Logout</span>
                            </div>

                            <!-- <div><Logo /></div> -->
                        </DialogPanel>
                    </TransitionChild>
                    <div class="w-14 flex-shrink-0" aria-hidden="true">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[280px] lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->

            <div class="flex min-h-0 flex-1 flex-col bg-[#F5F9FC] border border-r-[#EAECF0] pl-[10px] pr-3 py-[30px]">
                <div class="flex flex-1 flex-col overflow-y-auto">
                    <!-- /// -->
                    <Menu as="div" class="w-full relative inline-block items-center">
                        <MenuButton class="flex items-center w-full">
                            <!-- /// -->
                            <div class="bg-[#ffffff] text-left w-full rounded-lg p-4 gap-4 shadow-[0px_10px_25px_rgba(151,143,175,0.08)] flex">
                                <div class="h-10 w-10 flex items-center justify-center initials rounded-xl text-[#ffffff] capitalize">{{ name[0] }}</div>
                                <div class="">
                                    <p class="font-medium text-sm text-[#030124]">{{ name }}</p>
                                    <p class="text-xs font-normal text-[#5E626A]">{{ role }}</p>
                                </div>
                                <div class="flex items-center justify-center ml-auto">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#686E7A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <!-- /// -->
                        </MenuButton>

                        <transition
                            enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <MenuItems class="z-30 rounded-b-md border-t border-gray-100 origin-top-right absolute right-0 -mt-2 w-full br-8 bg-white shadow-lg focus:outline-none">
                                <div class="py-1">
                                    <MenuItem v-slot="{ active }">
                                        <span
                                            @click="logout"
                                            class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                            >Logout</span
                                        >
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>

                    <nav class="flex-1 space-y-1 px-2 py-4">
                        <router-link
                            v-for="item in navigation"
                            active-class="exact-active-link"
                            :key="item.name"
                            :to="item.href"
                            class="flex items-center max-h-max rounded-[6px] text-[#667085] font-semibold text-sm py-[11px] px-[15px]"
                        >
                            <component
                                :active="parentPath === item.href"
                                :is="item.icon"
                                :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 h-6 w-6 flex-shrink-0']"
                                aria-hidden="true"
                            />
                            <span>{{ item.name }}</span>
                        </router-link>
                    </nav>

                    <div class="pl-2 pt-6"><Logo class="logoClass" /></div>
                </div>
            </div>
        </div>
        <div class="flex flex-col lg:pl-[280px]">
            <div class="sticky top-0 z-[10] flex h-[80px] border-b-[#EAECF0] flex-shrink-0 bg-white shadow">
                <button type="button" class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
                </button>
                <div class="flex items-center justify-between container">
                    <span class="text-[#344054] text-[20px] font-semibold">{{ routeParent }}</span>

                    <NotificationsButton />
                </div>

                <RefreshToken />
            </div>
            <AutoLogout />

            <main class="flex-1">
                <div class="py-6 bg-[ffffff]">
                    <!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    </div> -->
                    <div class="bg-[ffffff] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <!-- Your content -->
                        <!-- {{ role }} -->
                        <!-- {{ role !== 'SuperAdmin' }} -->
                        <router-view></router-view>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import NotificationsButton from '@/components/reusable/NotificationsButton.vue';
import { ref, computed, onMounted } from 'vue';

import { handleLogout, signout } from '/src/services/OnboardingServices.js';
import RefreshToken from '@/views/login/RefreshToken.vue';
import AutoLogout from '@/views/login/AutoLogout.vue';
import AdminUsersIcon from '@/views/admin/svg/AdminUsersIcon.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import Logo from '/src/components/reusable/SterlingLogo.vue';
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue';
import HomeIcon from './svg/HomeIcon.vue';
import AuditLogsIcon from '@/views/admin/svg/AuditLogsIcon.vue';
import VendorIcon from '@/views/admin/svg/VendorIcon.vue';
import OrdersIcon from '@/views/admin/svg/OrdersIcon.vue';
import ProductsIcon from '@/views/admin/svg/ProductsIcon.vue';
import PaymentsIcon from '@/views/admin/svg/PaymentsIcon.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import FeesAndCommissionIcon from '@/views/admin/svg/FeesAndCommissionIcon.vue';
const store = useStore();

onMounted(() => {
    // setNavOptionsBasedOnRole();
    // reload()
    // console.log("store",store.getters['authToken/loggedIn'])

});
// onUnmounted(() => {
//     clearInterval(refreshToken);
// });
const route = useRoute();
const router = useRouter();

const parentRoute = () => {
    // Get the parent route of the current route
    const parentRoute = route.matched[route.matched.length - 2];

    // Return the path of the parent route if it exists
    if (parentRoute) {
        return parentRoute;
    } else {
        return '';
    }
};


const name = computed(() => store.getters['authToken/fullName'].split(' ')[0]);
const role = computed(() => store.getters['authToken/roles']);
const parentPath = computed(() => parentRoute().path);
const routeParent = computed(() => parentRoute().name);
const loggedIn = computed(() => store.getters['authToken/loggedIn']);
const navigation = ref([
    { name: 'Home', href: '/admin/dashboard', icon: HomeIcon, current: true },
    { name: 'Users', href: '/admin/users', icon: AdminUsersIcon, current: false },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: FeesAndCommissionIcon, current: false },
    { name: 'Admin Users', href: '/admin/admin_users', icon: AdminUsersIcon, current: false },
    { name: 'Transactions', href: '/admin/orders', icon: PaymentsIcon, current: false },
    { name: 'Promotions', href: '/admin/products', icon: ProductsIcon, current: false },
    { name: 'Audit Logs', href: '/admin/audit_logs', icon: AuditLogsIcon, current: false }

    // { name: 'Customers', href: '/admin/customers', icon: IconAdminUsers, current: false },

    // { name: 'Payments', href: '/admin/payments', icon: PaymentsIcon, current: false },

    // { name: 'Fees & Commission', href: '/admin/fees_and_commission', icon: FeesAndCommissionIcon, current: false },
    // { name: 'Admin Users', href: '/admin/admin_users', icon: AdminUsersIcon, current: false },

]);

const logout = () => {
    signout(
        {},
        (res) => {
            const signOutMessage = res?.data?.data;
            if (signOutMessage.toLowerCase() == 'signed out') {
                // handleLogout('auto', route.fullPath);
                router.push('/login')
                store.dispatch('authToken/logout');
                window.localStorage.removeItem('vuex');
            }
        },
        (err) => {
            // console.log(err);
            handleLogout('auto', route.fullPath);
            store.dispatch('authToken/logout');
            window.localStorage.removeItem('vuex')
        }
    );
};

const setNavOptionsBasedOnRole = () => {
    // alert(role.value);
    if (role.value !== 'SuperAdmin') {
        navigation.value = [
            { name: 'Home', href: '/admin/dashboard', icon: HomeIcon, current: true },
            { name: 'Vendors', href: '/admin/vendors', icon: VendorIcon, current: false },
            { name: 'Customers', href: '/admin/customers', icon: AdminUsersIcon, current: false },

            { name: 'Orders', href: '/admin/orders', icon: OrdersIcon, current: false },
            { name: 'Payments', href: '/admin/payments', icon: PaymentsIcon, current: false },

            { name: 'Fees & Commission', href: '/admin/fees_and_commission', icon: FeesAndCommissionIcon, current: false },
            { name: 'Products', href: '/admin/products', icon: ProductsIcon, current: false },
        ];
    }
};

const sidebarOpen = ref(false);
// watch(routeParent, () => {
//     if (sidebarOpen.value === true) {
//         sidebarOpen.value = false;
//     }
// });
</script>

<style lang="scss" scoped>
.exact-active-link {
    background-color: #00AA5A;
    color: white;
}
.initials {
    background: linear-gradient(63.44deg, #1d2939 16.72%, #475467 83.39%);
}

.container {
    padding-left: 30px;
    padding-right: 30px;
}
</style>
