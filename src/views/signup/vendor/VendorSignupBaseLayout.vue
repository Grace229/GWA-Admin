<template>
    <div class="h-screen overflow-y-auto bg-white">
        <div class="flex flex-row overflow-y-auto min-h-screen">
            <div class="hidden md:flex lg:w-[470px] max-w-[45rem] bg-gray-100 p-[48px]">
                <div class="flex flex-col justify-between w-full">
                    <div class="flex flex-col gap-[82px]">
                        <Logo class="logoClass" />
                        <div class="flex flex-col gap-[26px]">
                            <div v-for="(item, index) in menuItems" :key="item.name" class="flex gap-4">
                                <StepIcon :itemId="index + 1" :step="step" />
                                <div class="flex flex-col">
                                    <p class="leading-[24px] font-semibold text-sm text-gray-700">{{ item.name }}</p>
                                    <p class="leading-[20px] font-normal text-sm text-gray-600">{{ item.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="font-normal text-sm text-gray-600 flex items-center justify-between">
                        <span>© AltDrive 2022</span>
                        <span class="flex items-center gap-[9px]"
                            ><span
                                ><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.3335 2.6665L6.77678 6.4768C7.21756 6.78535 7.43795 6.93962 7.67767 6.99938C7.88943 7.05216 8.1109 7.05216 8.32265 6.99938C8.56238 6.93962 8.78277 6.78535 9.22355 6.4768L14.6668 2.6665M4.5335 11.3332H11.4668C12.5869 11.3332 13.147 11.3332 13.5748 11.1152C13.9511 10.9234 14.2571 10.6175 14.4488 10.2412C14.6668 9.81333 14.6668 9.25328 14.6668 8.13317V3.8665C14.6668 2.7464 14.6668 2.18635 14.4488 1.75852C14.2571 1.3822 13.9511 1.07624 13.5748 0.884491C13.147 0.666504 12.5869 0.666504 11.4668 0.666504H4.5335C3.41339 0.666504 2.85334 0.666504 2.42552 0.884491C2.04919 1.07624 1.74323 1.3822 1.55148 1.75852C1.3335 2.18635 1.3335 2.7464 1.3335 3.8665V8.13317C1.3335 9.25328 1.3335 9.81333 1.55148 10.2412C1.74323 10.6175 2.04919 10.9234 2.42552 11.1152C2.85334 11.3332 3.41339 11.3332 4.5335 11.3332Z"
                                        stroke="#667085"
                                        stroke-width="1.33333"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg> </span
                            >support@altdrive.com</span
                        >
                    </div>
                </div>
            </div>
            <div class="flex-1 mx-6 md:mx-0">
                <router-view></router-view>
            </div>
        </div>

        <FloatingSidemenuModal class="md:hidden">
            <template v-slot:menu-items>
                <div class="flex pt-[48px] pb-[20px] h-full">
                    <div class="flex flex-col justify-between w-full">
                        <div class="flex flex-col gap-[82px]">
                            <Logo class="logoClass" />
                            <div class="flex flex-col gap-[26px]">
                                <div v-for="(item, index) in menuItems" :key="item.name" class="flex gap-4">
                                    <StepIcon :itemId="index + 1" :step="step" />
                                    <div class="flex flex-col">
                                        <p class="leading-[24px] font-semibold text-sm text-gray-700">{{ item.name }}</p>
                                        <p class="leading-[20px] font-normal text-sm text-gray-600">{{ item.text }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-auto text-xs font-normal text-sm text-gray-600 flex items-center justify-between">
                            <span>© AltDrive 2022</span>
                            <span class="flex items-center gap-[9px]"
                                ><span
                                    ><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.3335 2.6665L6.77678 6.4768C7.21756 6.78535 7.43795 6.93962 7.67767 6.99938C7.88943 7.05216 8.1109 7.05216 8.32265 6.99938C8.56238 6.93962 8.78277 6.78535 9.22355 6.4768L14.6668 2.6665M4.5335 11.3332H11.4668C12.5869 11.3332 13.147 11.3332 13.5748 11.1152C13.9511 10.9234 14.2571 10.6175 14.4488 10.2412C14.6668 9.81333 14.6668 9.25328 14.6668 8.13317V3.8665C14.6668 2.7464 14.6668 2.18635 14.4488 1.75852C14.2571 1.3822 13.9511 1.07624 13.5748 0.884491C13.147 0.666504 12.5869 0.666504 11.4668 0.666504H4.5335C3.41339 0.666504 2.85334 0.666504 2.42552 0.884491C2.04919 1.07624 1.74323 1.3822 1.55148 1.75852C1.3335 2.18635 1.3335 2.7464 1.3335 3.8665V8.13317C1.3335 9.25328 1.3335 9.81333 1.55148 10.2412C1.74323 10.6175 2.04919 10.9234 2.42552 11.1152C2.85334 11.3332 3.41339 11.3332 4.5335 11.3332Z"
                                            stroke="#667085"
                                            stroke-width="1.33333"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg> </span
                                >support@altdrive.com</span
                            >
                        </div>
                    </div>
                </div>
            </template>
        </FloatingSidemenuModal>
    </div>
</template>
<script setup>
import FloatingSidemenuModal from '@/components/reusable/FloatingSidemenuModal.vue';

import { ref, provide, reactive } from 'vue';
import StepIcon from '/src/assets/svg/VendorMenuStepIcon.vue';
import Logo from '/src/components/reusable/SterlingLogo.vue';
const step = ref(1);

// const form = reactive({
//     pin: '',
// })
const sidebarOpen = ref(false);
// const toggleSideBar = () => {
//     sidebarOpen.value = !sidebarOpen.value;
//     // alert('Toggled');
// };
const menuItems = [
    {
        name: 'Get Started',
        text: 'Provide email',
    },
    {
        name: 'Email Verification',
        text: 'Verify your email address',
    },
    {
        name: 'Phone Number',
        text: 'Provide phone number',
    },
    {
        name: 'Send OTP',
        text: 'Verify your phone number',
    },
    {
        name: 'Create account',
        text: 'Provide your details',
    },
    {
        name: 'MOU and Vendor Guide',
        text: 'Read and accept terms and conditions',
    },
];

provide('step', step);
provide('sidebarOpen', sidebarOpen);

// provide('form', form)
</script>

<style lang="scss" scoped></style>
