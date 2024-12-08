<template>
    <Combobox as="div" v-model="selectedOption">
        <!-- <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Assigned to</ComboboxLabel> -->
        <div class="relative">
            <ComboboxInput
                class="relative w-full h-full flex items-center justify-between rounded-[4px] border !border-[#B9C0D4] px-[14px] py-[10px] !focus:outline-none !ring-0 capitalize !text-[#5D6B98]"
                @change="query = $event.target.value"
                :display-value="(option) => option?.text1"
                :placeholder="label"
            />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-4 focus:outline-none ring-0">
                <div>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#5D6B98" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </ComboboxButton>

            <ComboboxOptions
                v-if="filteredOptions.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <ComboboxOption v-for="option in filteredOptions" :key="option.name" :value="option" as="template" v-slot="{ active, selected }">
                    <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <div class="flex">
                            <span :class="['truncate', selected && 'font-semibold']">
                                {{ option.text1 }}
                            </span>
                        </div>

                        <!-- <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span> -->
                    </li>
                </ComboboxOption>
            </ComboboxOptions>

            <ComboboxOptions
                v-else
                class="py-4 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                <ComboboxOption>
                    <div class="px-4 border-b mb-3 pb-3">
                        <p class="mr-2 font-normal text-sm text-[#5D6B98]">No options</p>
                    </div>
                    <button @click="addItem" class="mr-4 bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center ml-auto">Add Item</button>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted, computed } from 'vue';

// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
onMounted(() => {
    if (!props.modelValue) return {};
    selectedOption.value = props.options.find((i) => i.id == props.modelValue);
});
const props = defineProps(['label', 'options', 'id', 'modelValue']);
const emits = defineEmits(['onGetData', 'update:modelValue', 'addItem']);
const selectedOption = ref(null);

const query = ref('');

const filteredOptions = computed(() =>
    query.value === ''
        ? props.options
        : props.options.filter((option) => {
              return option.text1.toLowerCase().includes(query.value.toLowerCase());
          })
);

const addItem = () => {
    emits('addItem');
};

watch(selectedOption, () => {
    if (selectedOption.value?.id === 0) {
        emits('update:modelValue', selectedOption.value.id);
        return;
    }
    if (!selectedOption.value?.id) return;

    // emits('onGetData', selectedOption.value, props.id);
    emits('update:modelValue', selectedOption.value.id);
});
watch(
    () => props.modelValue,
    () => {
        if (!props.modelValue) {
            selectedOption.value = null;
            return {};
        }
        // if (!props.modelValue) return {};
        selectedOption.value = props.options.find((i) => i.id == props.modelValue);
    }
);
watch(
    () => [...props.options],
    () => {
        if (!props.modelValue) return {};
        selectedOption.value = props.options.find((i) => i.id == props.modelValue);
    }
);
</script>
