<template>
    <Popover class="relative">
        <PopoverButton id="ordersdFilterBtn" class="inline-flex items-center gap-x-1 ring-0 border-none outline-none focus:outline-hidden"> <FilterButton text="More Filters" /> </PopoverButton>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <PopoverPanel class="absolute md:right-0 z-10 mt-5 flex w-screen max-w-[300px]">
                <!-- <div class="flex flex-col"> -->
                <div class="w-screen max-w-md min-h-[260px] mb-4 overflow-auto rounded-2xl bg-white text-sm leading-6 shadow-md ring-1 ring-gray-900/5">
                    <div class="p-4">
                        <div class="col-span-1 mb-4">
                            <label for="transmissionType" class="block text-sm font-medium text-[#344054]">Order Type</label>
                            <div class="mt-1">
                                <IdSelect class="h-[44px]" :options="orderTypes" v-model="filterValues.orderType" label="Select Transmission Type" :modelValue="filterValues.orderType" />
                            </div>
                        </div>
                        <div class="col-span-1 mb-4">
                            <label for="transmissionType" class="block text-sm font-medium text-[#344054]">Location</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" v-model="filterValues.location" :options="stateMenu" :modelValue="filterValues.location" label="Location" />
                            </div>
                        </div>
                        <div class="pt-4 flex items-center justify-between">
                            <button @click="clear" class="bg-[ffffff] h-10 flex items-center justify-center text-grey-100 cancelButton border">Clear</button>

                            <button @click="apply" class="ml-auto bg-blue-500 h-10 flex items-center justify-center text-white brandButton border-0">Apply</button>
                        </div>
                    </div>
                </div>

                <!-- </div> -->
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import FilterButton from '@/views/admin/adminViews/reusable/FilterButton.vue';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { stateMenu } from '@/components/reusable/StateList.js';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import { Constants } from '@/util';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { inject, reactive } from 'vue';

const state = inject('state');
const filterValues = reactive({
    orderType: String(state.params.orderType),
    location: String(state.params.location),
});
const orderTypes = Constants.orderTypesMenu;

const clear = () => {
    state.params.orderType = Number(0);
    state.params.location = '';
    document.getElementById('ordersdFilterBtn').click();
};

const apply = () => {
    state.params.orderType = Number(filterValues.orderType);
    state.params.location = filterValues.location;
    document.getElementById('ordersdFilterBtn').click();
};
</script>
