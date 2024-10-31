<template>
    <div class="pt-[14px] container grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="mx-auto pt-[82px] pb-[148px] h1-p-text">
            <h1 class="font-semibold text-[#101828] mb-[24px]">Get the AltDrive app</h1>
            <p class="font-normal text-[#475467] max-w-[507px] mb-[48px]">Get the AltDrive appEnjoy 360 degree automotive solutions at your fingertips and get the best out of your car</p>

            <div class="flex gap-[12px]">
                <DownloadAppStore />
                <DownloadGooglePlay />
            </div>
        </div>

        <div class="relative mx-auto">
            <img class="h-full" src="/src/assets/images/Iphone.png" alt="" />
        </div>
    </div>
</template>

<script setup>
import DownloadAppStore from '/src/components/reusable/DownloadAppStore.vue';
import DownloadGooglePlay from '/src/components/reusable/DownloadGooglePlay.vue';
</script>

<style lang="scss" scoped></style>
