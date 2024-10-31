<template>
    <div class="relative w-full">
      <div
        @click="toggleDropdown"
        class="w-full h-full flex items-center justify-between rounded-[4px] border border-[#B9C0D4] px-[14px] py-[10px]"
      >
        <span class="text-gray-700" v-if="!selectedOptions.length">Select options</span>
        <span class="text-gray-700" v-else>{{ selectedOptions.map((opt) => opt.label).join(", ") }}</span>
        <span class="text-gray-400">&#9662;</span>
      </div>
  
      <div
        v-if="isOpen"
        class="absolute mt-1 w-full border border-gray-300 bg-white rounded shadow-lg z-10 max-h-48 overflow-y-auto"
      >
        <div
          v-for="option in options"
          :key="option.value"
          @click="toggleOption(option)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
          :class="{ 'bg-gray-200': selectedValues.includes(option.value) }"
        >
          <input
            type="checkbox"
            :checked="selectedValues.includes(option.value)"
            @change="toggleOption(option)"
            class="mr-2"
          />
          <span class="text-gray-700">{{ option.label }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      required: true
    }
  });
  

  const emit = defineEmits(['update:modelValue']);
  

  const isOpen = ref(false);
  const selectedValues = ref([...props.modelValue]);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  

  const toggleOption = (option) => {
    const index = selectedValues.value.indexOf(option.value);
    if (index > -1) {
      selectedValues.value.splice(index, 1);
    } else {
      selectedValues.value.push(option.value);
    }
    emit('update:modelValue', selectedValues.value);
  };
  
  watch(() => props.modelValue, (newValue) => {
    selectedValues.value = [...newValue];
  });
  
  const selectedOptions = computed(() => {
    return props.options.filter(option => selectedValues.value.includes(option.value));
  });
  </script>
  