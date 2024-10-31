<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton class="inline-flex w-full justify-center cursor-pointer">
                <TableMenuIcon />
                <!-- {{ props.carId }} -->
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <MenuItems class="absolute right-0 z-[9999] mt-[2px] w-[101px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <MenuItem @click="navigateTo(menuItem)" v-for="menuItem in menuOptions" :key="menuItem" v-slot="{ active }">
                        <span :class="[active ? 'bg-gray-100 text-gray-900' : 'text-[#4A5578]', 'block px-4 py-[14px] font-normal text-sm cursor-pointer']">{{ menuItem }}</span>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { inject, defineProps } from 'vue';
import TableMenuIcon from '@/views/admin/svg/TableMenuIcon.vue';
import { useRouter, useRoute } from 'vue-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
const props = defineProps({
    carId: String,
});
const router = useRouter();
const route = useRoute();
const menuOptions = inject('menuOptions');

const navigateTo = (menuOption) => {
    if (route.name === 'Car Rejects') {
        if (menuOption === 'Edit') {
            router.push(`/edit_rejected_car/${props.carId}`);
        }
        if (menuOption === 'Preview') {
            router.push(`/preview_rejected_car/${props.carId}`);
        }
    } else {
        if (menuOption === 'Edit') {
            router.push(`/edit_car/${props.carId}`);
        }
        if (menuOption === 'Preview') {
            router.push(`/preview_car/${props.carId}`);
        }
    }
};
</script>
