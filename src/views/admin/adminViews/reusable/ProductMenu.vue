<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton class="inline-flex w-full justify-center cursor-pointer">
                <TableMenuIcon />
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
            <MenuItems class="absolute right-0 z-[9999] mt-[2px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div v-if="car.statusText.toLowerCase() === 'published' || car.statusText.toLowerCase() === 'rejected'" class="py-1">
                    <MenuItem @click="$emit('proceed', { menuItem: menuOptions[0], car: car })" v-slot="{ active }">
                        <span :class="[active ? 'bg-gray-100 text-gray-900' : 'text-[#4A5578]', 'block px-4 py-[14px] font-normal text-sm cursor-pointer']">{{ menuOptions[0] }}</span>
                    </MenuItem>
                    <MenuItem @click="$emit('proceed', { menuItem: menuOptions[3], car: car })" v-slot="{ active }">
                        <span :class="[active ? 'bg-gray-100 text-gray-900' : 'text-[#4A5578]', 'block px-4 py-[14px] font-normal text-sm cursor-pointer']">{{ menuOptions[3] }}</span>
                    </MenuItem>
                </div>

                <div v-else class="py-1">
                    <MenuItem @click="$emit('proceed', { menuItem: menuItem, car: car })" v-for="menuItem in menuOptions" :key="menuItem" v-slot="{ active }">
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
const props = defineProps({
    menuOptions: {
        type: Array,
    },
    // vendor: {
    //     type: Object,
    //     default: {},
    // },

    // order: {
    //     type: Object,
    //     default: {},
    // },
    car: {
        type: Object,
        default: {},
    },
});
// const menuOptions = inject('menuOptions');
const menuOptions = props.menuOptions;
</script>
