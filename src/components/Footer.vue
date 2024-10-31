<template>
    <div class="bg-[#F5F7FB] border border-t-[#EAECF0]">
        <div class="container flex flex-col md:flex-row justify-between pt-[85px] pb-[79px]">
            <div>
                <Logo class="h-[32px] w-[135.83px] mb-[26px]" />
                <p class="hidden md:block font-normal text-sm leading-[24px] text-[#63749B]">Sterling 2022 • All rights reserved</p>
            </div>
            <div class="flex-1 grid grid-cols-2 sm:grid-cols-4 md:max-w-[60%]">
                <div class="mb-6 sm:mb-0 text-[#485885] flex flex-col">
                    <h3 class="font-bold text-[17px] mb-[24px]">{{ sterling.title }}</h3>
                    <router-link class="font-normal text-base mb-[8px]" v-for="link in sterling.links" :key="link.name" :to="link.path">{{ link.name }}</router-link>
                </div>
                <div class="mb-6 sm:mb-0 text-[#485885] flex flex-col">
                    <h3 class="font-bold text-[17px] mb-[24px]">{{ services.title }}</h3>
                    <router-link class="font-normal text-base mb-[8px]" v-for="link in services.links" :key="link.name" :to="link.path">{{ link.name }}</router-link>
                </div>
                <div class="mb-6 sm:mb-0 text-[#485885] flex flex-col">
                    <h3 class="font-bold text-[17px] mb-[24px]">{{ company.title }}</h3>
                    <router-link class="font-normal text-base mb-[8px]" v-for="link in company.links" :key="link.name" :to="link.path">{{ link.name }}</router-link>
                </div>

                <div class="mb-6 sm:mb-0 flex flex-col items-start justify-start">
                    <h3 class="mb-6 md:mb-4 font-semibold text-base text-[#404968]">Get the App</h3>
                    <DownloadAppStore class="mb-[22px]" />
                    <DownloadGooglePlay />
                </div>
            </div>
            <p class="block md:hidden mt-4 font-normal text-sm leading-[24px] text-[#63749B]">Sterling 2022 • All rights reserved</p>
        </div>
    </div>
</template>

<script setup>
import Logo from '/src/components/reusable/SterlingLogo.vue';

import DownloadAppStore from '/src/components/reusable/DownloadAppStore.vue';
import DownloadGooglePlay from '/src/components/reusable/DownloadGooglePlay.vue';

const company = {
    title: 'Company',
    links: [
        {
            name: 'About us',
            path: '/',
        },
        {
            name: 'Contact',
            path: '/',
        },
        {
            name: 'Terms of Use',
            path: '/',
        },
    ],
};

const sterling = {
    title: 'Sterling',
    links: [
        {
            name: 'Buy',
            path: 'buy',
        },
        {
            name: 'How it works',
            path: '/',
        },
        {
            name: 'Review',
            path: '/',
        },
        {
            name: 'Site map',
            path: '/',
        },
    ],
};

const services = {
    title: 'Services',
    links: [
        {
            name: 'CarAudit™',
            path: '/',
        },
        {
            name: 'Delivery',
            path: '/',
        },
        {
            name: 'Financing',
            path: '/',
        },
        {
            name: 'Warranty',
            path: '/',
        },
    ],
};
</script>

<style lang="scss" scoped></style>
