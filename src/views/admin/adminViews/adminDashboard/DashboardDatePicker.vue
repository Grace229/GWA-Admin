<template>
    <Popover class="relative">
        <PopoverButton id="dateFilterBtn" class="inline-flex items-center gap-x-1 ring-0 border-none outline-none focus:outline-hidden"> <SelectDate /> </PopoverButton>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <PopoverPanel class="absolute md:!right-0 z-10 mt-5 flex w-screen max-w-[300px]">
                <!-- <div class="flex flex-col"> -->
                <div class="w-screen max-w-md min-h-[260px] mb-4 overflow-auto rounded-2xl bg-white text-sm leading-6 shadow-md ring-1 ring-gray-900/5">
                    <div class="p-4">
                        <div class="col-span-1 mb-4">
                            <label for="from" class="block text-sm font-medium text-[#344054]">From</label>
                            <div class="mt-1">
                                <v-date-picker mode="date" v-model="fromDate" :model-config="modelConfig">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <div class="flex items-center">
                                            <input
                                                id="from"
                                                name="from"
                                                autocomplete="off"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                class="grey-8 fs-14 fw-400 relative br-8 appearance-none block w-full px-3 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                                            />

                                            <i class="fa fa-calendar text-sm absolute right-3 text-[#666]" aria-hidden="true"></i>
                                        </div>
                                    </template>
                                </v-date-picker>
                            </div>
                        </div>
                        <div class="col-span-1 mb-4">
                            <label for="to" class="block text-sm font-medium text-[#344054]">To</label>
                            <div class="mt-1">
                                <v-date-picker mode="date" v-model="toDate" :model-config="modelConfig">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <div class="flex items-center">
                                            <input
                                                id="to"
                                                name="to"
                                                autocomplete="off"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                class="grey-8 fs-14 fw-400 relative br-8 appearance-none block w-full px-3 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                                            />

                                            <i class="fa fa-calendar text-sm absolute right-3 text-[#666]" aria-hidden="true"></i>
                                        </div>
                                    </template>
                                </v-date-picker>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button @click="reset" class="bg-green-600 h-10 flex items-center justify-center text-white brandButton border-0">Clear</button>

                            <button @click="apply" class="bg-blue-500 h-10 flex items-center justify-center text-white brandButton border-0">Apply</button>
                        </div>
                    </div>
                </div>

                <!-- </div> -->
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import SelectDate from '/src/components/reusable/SelectDate.vue';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { Constants, Util } from '@/util';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { inject, ref } from 'vue';
// import { ref } from 'vue';

const modelConfig = {
    type: 'string',
    mask: 'YYYY-MM-DD',
};
const fromDate = ref(null);
const toDate = ref(null);
const dashboardState = inject('dashboardState');
// const state = inject('state');
//
const orderTypes = Constants.orderTypesMenu;

const apply = () => {
    dashboardState.searchParams.from = Util.formatDatePicked(fromDate.value);
    dashboardState.searchParams.to = Util.formatDatePicked(toDate.value);
    document.getElementById('dateFilterBtn').click();
};

const reset = () => {
    fromDate.value = null;
    toDate.value = null;
    dashboardState.searchParams.from = '';
    dashboardState.searchParams.to = '';
    document.getElementById('dateFilterBtn').click();
};
</script>
