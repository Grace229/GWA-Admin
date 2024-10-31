<template>
    <!-- <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Assigned to</ComboboxLabel> -->
    <div class="relative">
        <div>
            <div class="mt-1">
                <input
                    :type="props.parameterType == 1 ? 'text' : 'number'"
                    name="paramValue"
                    id="paramValue"
                    autocomplete="off"
                    v-model="paramValue"
                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                    aria-describedby="paramValue-description"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted, computed } from 'vue';
// import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
onMounted(() => {
    if (props.selectedParams.length === 0) return {};
    setOption();
});

const route = useRoute();
const paramTypeIsString = () => {
    return props.parameterType == 1;
};
const paramValue = ref(paramTypeIsString() ? '' : 0);
const props = defineProps(['label', 'option', 'id', 'modelValue', 'selectedParams', 'name', 'parameterType']);
const emits = defineEmits(['onGetData', 'update:modelValue', 'addItem']);
// const selectedOption = ref(null);
const setOption = () => {
    if (route?.meta?.action === 'Edit Car') {
        const foundItem = props.selectedParams.find((item) => item.parameter === props.name);
        if (paramTypeIsString()) {
            paramValue.value = foundItem?.value ? String(foundItem?.value) : null;
        } else {
            paramValue.value = foundItem?.value ? Number(foundItem?.value) : null;
        }
    }
};

// const setSelected = () => {
//     selectedOption.value = setOption()?.value ? setOption()?.value : null;
// };

const optionData = () => {
    if (route?.meta?.action === 'Edit Car') {
        return {
            parameterId: props.id,
            value: String(paramValue.value),

            // value: paramValue.value,

            // value: props.parameterType == 1 ? String(paramValue.value) : Number(paramValue.value),
            name: props.name,
        };
    }
    return {
        parameterId: props.id,
        value: String(paramValue.value),
        // value: props.parameterType == 1 ? String(paramValue.value) : Number(paramValue.value),
    };
};

watch(paramValue, () => {
    if (paramValue.value !== null || paramValue.value !== undefined || paramValue.value !== '') {
        // alert(paramValue.value)
        emits('onGetData', optionData());
        // return;
    }
});
// watch();
// () => [...props.selectedParams],
// () => {
//     if (props.selectedParams.length === 0) return {};
//     setOption();
// }

watch(
    () => props.option,
    () => {
        if (props.option == null || props.option == undefined) return {};
        setOption();
    }
);
</script>
