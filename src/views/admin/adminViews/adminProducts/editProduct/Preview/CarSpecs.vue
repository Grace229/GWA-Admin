<template>
    <div>
        <!-- <div class=""> -->
        <!-- <div>{{ details.paramValues }}</div>
            <div>{{ customParameters }}</div> -->
        <!-- <div>{{ previewParams }}</div> -->
        <!-- </div> -->
        <!-- <div class="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-4">
                            <div :class="[' border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Car Brand </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.brand }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Model </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.model }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Year </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.year }} </span>
                            </div>

                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Engine Type </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ engineType }} </span>
                            </div>

                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Body Color </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ color }} </span>
                            </div>
                            <div :class="[' border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> TransmissionType </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ tyre }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Body Type </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ bodyType }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Rims </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ rims }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Transmission </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.transmissionTypeText }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> VIN </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.vin }} </span>
                            </div>

                            
                        </div> -->
        <!-- {{ details }} {{ previewParams.length }} -->
        <div class="grid grid-cols-2 grid-flow-row gap-x-4">
            <div :class="[' border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> Car Brand </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.brand }} </span>
            </div>
            <div :class="['border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> Model </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.model }} </span>
            </div>
            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> Year </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.year }} </span>
            </div>

            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> Mileage </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.mileage }} </span>
            </div>

            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> Transmission </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.transmission }} </span>
            </div>
            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                <span class="font-medium text-sm text-[#4A5578]"> VIN </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details.VIN }} </span>
            </div>

            <div v-for="(param, index) in previewParams" :key="index">
                <div v-if="param !== null" :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="ont-medium text-sm text-[#4A5578] flex items-center justify-between">
                    <span class="font-medium text-sm text-[#4A5578]"> {{ param?.paramName }} </span>

                    <span class="font-semibold text-sm text-[#30374F]"> {{ param?.value }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Util } from '@/util';
import { inject, defineProps, onMounted, computed } from 'vue';
onMounted(() => {
    // previewParams();
});
const props = defineProps({
    details: Object,
    customParams: Array,
});
const gridCol = 2;
// const bodyType = computed(() => Util.getParamByName('Body Type', props.details.vehicleDetails?.vehicleParameters));
// const color = computed(() => Util.getParamByName('Colors', props.details.vehicleDetails?.vehicleParameters));
// const tyre = computed(() => Util.getParamByName('Tyre', props.details.vehicleDetails?.vehicleParameters));
// const rims = computed(() => Util.getParamByName('Rims', props.details.vehicleDetails?.vehicleParameters));

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
