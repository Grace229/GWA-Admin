<template>
    <!-- {{ id }} -->
    <!-- {{ min }} -->
    <input
        :id="id"
        :class="classStyle"
        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
        ref="inputRef"
        type="text"
    />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input';
import { watchDebounced } from '@vueuse/core';
// import { onMounted } from 'vue';

export default {
    name: 'CurrencyInput',
    props: {
        modelValue: [Number, String], // Vue 2: value
        options: Object,
        id: {
            type: String,
            default: 'CurrencyInput',
        },
        // min: {
        //     type: Number,
        //     default: 0,
        // },
        classStyle: {
            type: Array,
            default: [],
        },
    },
    setup(props, { emit }) {
        // onMounted(() => {
        //     setValue();
        // });
        // onMounted(() => {
        //     if(numberValue){

        //     }
        // })
        // const setValue = () => {
        //     const input = document.getElementById('equityControId');
        //     input.addEventListener('blur', (event) => {
        //         alert(input.value);
        //         input.value = props.min;

        //     });
        // };
        const { inputRef, numberValue } = useCurrencyInput(props.options, false);
        watchDebounced(
            numberValue,
            (value) => {
                // if (value > props.min) {
                emit('update:modelValue', value);
                // } else {
                //     emit('update:modelValue', props.min);
                //     document.getElementById('equityControId').value = props.min;
                // }
            },
            {
                debounce: 100,
            }
        );
        return { inputRef };
    },
};

// "@vitejs/plugin-legacy": "^2.3.1",
</script>
