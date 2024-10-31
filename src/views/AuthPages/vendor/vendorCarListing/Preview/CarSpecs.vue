<template>
    <div>
        <!-- <div class=""> -->
        <!-- <div>{{ details.paramValues }}</div>
            <div>{{ customParameters }}</div> -->
        <!-- <div>{{ previewParams }}</div> -->
        <!-- </div> -->

        <div class="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-4">
            <div v-for="(key, index) in Object.keys(details)" :key="key">
                <div :class="[index === 0 || index === 5 ? '' : 'border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                    <span v-if="key === 'brand'" class="font-medium text-sm text-[#4A5578]"> Car Brand </span>
                    <span v-if="key === 'model'" class="font-medium text-sm text-[#4A5578]"> Model </span>
                    <span v-if="key === 'color'" class="font-medium text-sm text-[#4A5578]"> Body Color </span>

                    <span v-if="key === 'fuelType'" class="font-medium text-sm text-[#4A5578]"> Fuel Type </span>

                    <span v-if="key === 'engine'" class="font-medium text-sm text-[#4A5578]"> Engine </span>

                    <span v-if="key === 'year'" class="font-medium text-sm text-[#4A5578]"> Year </span>

                    <span v-if="key === 'interior'" class="font-medium text-sm text-[#4A5578]"> Interior </span>

                    <span v-if="key === 'transmission'" class="font-medium text-sm text-[#4A5578]"> Transmission </span>

                    <span v-if="key === 'mileage'" class="font-medium text-sm text-[#4A5578]"> Mileage </span>

                    <span v-if="key === 'VIN'" class="font-medium text-sm text-[#4A5578]"> VIN </span>

                    <span class="font-semibold text-sm text-[#30374F]"> {{ details[key] }} </span>
                </div>
            </div>
            <!-- <div v-if="previewParams.length > 0"> -->
            <div v-for="(param, index) in previewParams" :key="index">
                <!-- {{ param }} -->
                <div v-if="param !== null" :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="ont-medium text-sm text-[#4A5578] flex items-center justify-between">
                    <span class="font-medium text-sm text-[#4A5578]"> {{ param?.paramName }} </span>

                    <span class="font-semibold text-sm text-[#30374F]"> {{ param?.value }} </span>
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script setup>
import { inject, defineProps, onMounted, computed } from 'vue';
onMounted(() => {
    // previewParams();
});
const props = defineProps({
    details: Object,
    customParams: Array,
});
const customParameters = inject('customParameters');
const previewParams = computed(() => filterPreviewParams());
const filterPreviewParams = () => {
    const newArray = customParameters.value.map((obj1) => {
        const obj2 = props.customParams.find((obj) => obj.parameterId === obj1.id);

        if (obj2) {
            return { paramName: obj1.name, id: obj1.id, value: obj2.value };
        }
    });

    // de;

    return newArray;
};

const checkValidValue = (value) => {
    if (value === null || value === undefined || value?.length == 0) {
        return false;
    } else {
        return true;
    }
};

// watch(
//     () => props.customParams,
//     () => {},
//     { deep: true }
// );
</script>

<style lang="scss" scoped></style>
