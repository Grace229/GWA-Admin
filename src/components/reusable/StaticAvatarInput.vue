<template>
    <div class="">
        <!-- <div class="full flex">{{ src }}</div> -->
        <input type="file" accept="image/*" ref="file" multiple="1" class="hidden" @change="change" />
        <div class="relative inline-block h-full w-full">
            <AvatarEmpty v-if="!src" />
            <img v-else :src="src" alt="Avatar" class="h-full w-full rounded-full object-cover" />
            <div class="absolute top-0 h-full w-full bg-black opacity-50 flex items-center justify-center rounded-full">
                <!-- <svg class="text-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { Log } from '/src/util';
import { uploadVehicle } from '@/services/VendorServices.js';

import AvatarEmpty from '/src/components/reusable/Avatar.vue';
import { ref, defineEmits, defineProps } from 'vue';
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
    defaultSrc: [String],
});

const file = ref(null);

const src = ref(props.defaultSrc);
const browse = () => {
    file.value.click();
};

const change = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        let res = e.target.result;
        // emits('update:modelValue', res.split(',')[1]);
        emits('update:modelValue', res);
        src.value = res;
    };
};
</script>

<style lang="scss" scoped></style>
