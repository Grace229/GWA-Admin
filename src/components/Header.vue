<template>
    <div class="sticky top-0 header z-[9999]">
        <div class="container flex py-[30px] md:py-[30px] items-center gap-10">
            <Logo @click="$router.push('/')" class="h-[20px] w-[84.27px]" />
            <Menu as="div" class="md:hidden ml-auto relative inline-block items-center">
                <MenuButton class="flex items-center">
                    <div class="flex md:hidden ml-auto">
                        <div class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon class="h-6 w-6 text-[#00AA5A]" aria-hidden="true" />
                        </div>
                    </div>
                </MenuButton>

                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems class="z-30 rounded-md origin-top-right absolute right-0 mt-2 w-44 br-8 bg-white shadow-lg focus:outline-none">
                        <div class="py-1">
                        
                            <MenuItem v-for="link in links" :key="link.title" v-slot="{ active }">
                                <a
                                    :href="link.path"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm block px-4 py-2 fs-14 fw-400 grey-7"
                                    :class="[isActive(link.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-700', '']"
                                    >{{ link.title }}</a
                                >
                            </MenuItem>
                            <!-- <MenuItem v-if="!loggedIn" v-slot="{ active }">
                                <span
                                    @click="$router.push(`/login?redirected_from=${$route.fullPath}`)"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Login</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="!loggedIn" v-slot="{ active }">
                                <span
                                    @click="$router.push(`/signup?redirected_from=${$route.fullPath}`)"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Sign up</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkAdminAuth()" v-slot="{ active }">
                                <span
                                    @click="$router.push('/admin')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Admin</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkIndividualAuth() || Util.checkVendorAuth()" v-slot="{ active }">
                                <span
                                    @click="$router.push('/settings/profile')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Profile</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkIndividualAuth() || Util.checkVendorAuth()" v-slot="{ active }">
                                <span
                                    @click="$router.push('/settings/password')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Password</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkIndividualAuth()" v-slot="{ active }">
                                <span
                                    @click="$router.push('/settings/saved-cars')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Saved Cars</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-slot="{ active }">
                                <span
                                    @click="$router.push('/settings/password')"
                                    class="cursor-pointer  font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Saved Cars</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkIndividualAuth()" v-slot="{ active }">
                                <span
                                    @click="$router.push('/settings/car-financing/auto-loan')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >My Cars</span
                                >
                            </MenuItem> -->
                            <!-- <MenuItem v-if="Util.checkVendorAuth() && vendorInfo?.profileStatus !== 4" v-slot="{ active }">
                                <span
                                    @click="$router.push('/listed-cars')"
                                    class="cursor-pointer font-normal text-[#4A5578] text-sm"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 fs-14 fw-400 grey-7']"
                                    >Car Listing
                                </span>
                            </MenuItem> -->

                        </div>
                    </MenuItems>
                </transition>
            </Menu>
            <!--  medium responsiveness-->
            <div class="hidden md:flex flex-1">
                <div class="cursor-pointer flex items-center gap-[32px] text-[#4A5578] font-medium text-sm">
                    <a v-for="link in links" :key="link.title" :href="link.path">{{ link.title }}</a>
                    <!-- <span @click="$router.push(`${link.path}`)" v-for="link in links" :key="link.title">{{ link.title }}</span> -->
                </div>

           

                <!-- <div class="ml-auto flex items-center gap-[30px] font-semibold text-base">
                    <span @click="$router.push(`/login?redirected_from=${$route.fullPath}`)" class="cursor-pointer text-[#475467]">Log In</span>

                    <button @click="$router.push(`/signup?redirected_from=${$route.fullPath}`)" class="shadow-xs rounded-lg cursor-pointer brandButton">Sign Up</button>
                
                </div> -->
            </div>
        </div>
        <AutoLogout />
        <RefreshToken />
    </div>
</template>

<script setup>
import NotificationsButton from '@/components/reusable/NotificationsButton.vue';

import AutoLogout from '@/views/login/AutoLogout.vue';
import RefreshToken from '@/views/login/RefreshToken.vue';
import Logo from '@/components/reusable/SterlingLogo.vue';
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Util, Log } from '@/util';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { handleLogout, refreshToken } from '/src/services/OnboardingServices.js';
import { Bars3Icon } from '@heroicons/vue/24/outline';
onMounted(() => {
    // store.dispatch('authToken/authenticate');
    // console.log('isValid' + Util.tokenValid());
    // store.commit('setRedirectedFrom', route.fullPath);
    // if (loggedIn.value === true) {
    //     refreshToken();
    // }
    // refreshTheToken();
});

onUnmounted(() => {
    clearInterval(refreshToken);

});
const route = useRoute();
const store = useStore();
const loggedIn = computed(() => store.getters['authToken/loggedIn']);
// const ven = computed(() => store.state.vendorInfo);
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const vInfo = computed(() => store.getters['authToken/vInfo']);
const name = computed(() => store.getters['authToken/fullName'].split(' ')[0]);
const isActive = computed((path) => {return route.hash === path });

// const redirectedFrom = computed(() => store.state.redirectedFrom);
const links = ref([
    {
        title: 'Home',
        path: '/landing',
    },
    {
        title: 'Services',
        path: '#services',
    },
    {
        title: 'Download App',
        path: '#download',
    },
    {
        title: 'Subscriptions',
        path: '#subscriptions',
    }
]);

const logout = () => {
    // handleLogout();
    handleLogout('auto', route.fullPath);
};

// watch(
//     () => route.name,
//     () => {
//         store.commit('setRedirectedFrom', route.fullPath);
//     }
// );
</script>

<style lang="scss" scoped>
.header {
    background: #f9f9fb;
    /* Gray cool / 200 */

    border-bottom: 1px solid #dcdfea;
}
</style>
