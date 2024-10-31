<template>
    <Listbox v-model="selectedOption" class="h-full bg-[#ffffff]">
        <div class="relative w-full h-full">
            <!-- <ListboxButton class="relative h-[56px] py-2 px-[15px] text-sm border border-[#E4E6EB] rounded-lg w-full cursor-default text-left outline-none">
                <span :class="`!font-medium text-sm text-[#8F8C9A] block ${selectedOption && 'text-xs'}`">{{ label }}</span>
                <span class="block text-sm" v-if="selectedOption">
                    <div class="text-sm text-[#3A3745] flex items-center gap-x-1 capitalize">
                        <span class="capitalize" v-if="selectedOption.text1">{{ selectedOption.text1.toLowerCase() }}</span
                        ><span class="capitalize" v-if="selectedOption.text2">-</span>
                        <span class="truncate max-w-[120px] capitalize" v-if="selectedOption.text2">{{ selectedOption.text2.toLowerCase() }}</span>
                    </div></span
                >

                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon class="h-4 w-4 text-[#3A3745]" aria-hidden="true" />
                </span>
            </ListboxButton> -->
            <ListboxButton class="relative w-full h-full flex items-center justify-between rounded-[4px] border border-[#B9C0D4] px-[14px] py-[10px]">
                <span class="block text-sm" v-if="selectedOption">
                    <div class="text-sm text-[#3A3745] flex items-center gap-x-1 capitalize">
                        <span class="capitalize text-[#5D6B98]" v-if="selectedOption.text1">{{ selectedOption.text1.toLowerCase() }}</span>
                        <!-- <span class="capitalize" v-if="selectedOption.text2">-</span>
                        <span class="truncate max-w-[120px] capitalize" v-if="selectedOption.text2">{{ selectedOption.text2.toLowerCase() }}</span> -->
                    </div></span
                >
                <p v-else class="mr-2 font-normal text-sm text-[#5D6B98]">{{ label }}</p>
                <div>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#5D6B98" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute max-h-60 w-full mt-[.5rem] z-[999] overflow-auto rounded-lg bg-white text-sm shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),_0px_4px_6px_-2px_rgba(16,24,40,0.03)] ring-1 ring-black ring-opacity-5 border-b-2 outline-0 sm:text-sm"
                >
                    <ListboxOption v-slot="{ active, selected }" v-for="option in options" :key="option.name" :value="option" as="template">
                        <li :class="[active || selected ? '' : '', 'relative cursor-pointer select-none py-[11px] px-[13px] text-loft-black hover:bg-gray-100']">
                            <p class="text-sm text-[#101828] capitalize" v-if="option.text1">
                                {{ option.text1 }}
                            </p>

                            <div class="flex items-center gap-x-1">
                                <span class="text-[#667085] truncate max-w-[120px] capitalize" v-if="option.text2">{{ option.text2 }}</span>
                                <span class="text-[#667085] truncate max-w-[120px] capitalize" v-if="option.text3">-</span>
                                <span class="text-[#667085] truncate max-w-[120px] capitalize" v-if="option.text3">{{ option.text3 }}</span>
                            </div>
                        </li>
                    </ListboxOption>
                    <div v-if="!options.length" class="relative cursor-pointer select-none py-[11px] px-[13px] text-loft-black text-sm text-[#667085]">No option</div>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
<script setup>
import {
    Listbox,
    // ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';

const props = defineProps(['label', 'options', 'id', 'modelValue']);
const emits = defineEmits(['onGetData', 'update:modelValue']);
const selectedOption = ref(null);
onMounted(() => {
    if (!props.modelValue) return {};
    selectedOption.value = props.options.find((i) => i.text1 == props.modelValue);
});

watch(selectedOption, () => {
    if (!selectedOption.value?.id) return;
    // emits('onGetData', selectedOption.value, props.id);
    emits('update:modelValue', selectedOption.value.text1);
});
watch(
    () => props.modelValue,
    () => {
        if (!props.modelValue) {
            selectedOption.value = null;
            return {};
        }
        // if (!props.modelValue) return {};
        selectedOption.value = props.options.find((i) => i.text1 == props.modelValue);
    }
);
watch(
    () => [...props.options],
    () => {
        if (!props.modelValue) return {};
        selectedOption.value = props.options.find((i) => i.text1 == props.modelValue);
    }
);
</script>
