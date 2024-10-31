<template>
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

                <span v-if="key === 'vehicleID'" class="font-medium text-sm text-[#4A5578]"> Vehicle ID </span>

                <span v-if="key === 'VIN'" class="font-medium text-sm text-[#4A5578]"> Model </span>

                <span class="font-semibold text-sm text-[#30374F]"> {{ details[key] }} </span>
            </div>
        </div>
        <!-- <span v-for="(key, index) in Object.keys(details)" :key="key" class="">{{ key }}-{{ index }}-{{ details[key] }}</span> -->
    </div>
</template>

<script>
export default {
    props: {
        details: Object,
    },
    setup() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
