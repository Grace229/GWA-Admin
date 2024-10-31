<template>
    <div class="pt-[51px] pb-[88px]">
        <GoBack
            class="mb-10"
            :text="$route.name === 'Preview Rejected Car' ? 'Back to Rejected Cars' : 'Back to Car listing'"
            @click="$route.name === 'Preview Rejected Car' ? $router.push('/rejected-cars') : $router.push('/listed-cars')"
        />
        <SpinnerLoader v-if="loading" class="mx-auto my-[100px] h-[100px] w-[100px]" />

        <div v-else class="flex flex-col lg:flex-row gap-8 max-w-[700px] lg:max-w-[100%]">
            <div class="flex flex-1 flex-col">
                <div class="mb-[15px] w-full flex items-center justify-between">
                    <h1 class="font-bold text-[30px] text-[#30374F]">{{ car.year }} {{ car.brand }} {{ car.model }}</h1>

                    <!-- <Heart /> -->
                </div>

                <CarGallery v-if="car.pictures" class="mb-[29px]" :car="car" />
                <h3 class="text-[#30374F] text-[18px] font-semibold mb-[10px]">Description</h3>
                <p class="text-[#4A5578] text-sm font-normal mb-[25px]">
                    {{ car.description }}
                </p>

                <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                    <div class="col-span-2 pt-[25px] pb-[38px]">
                        <h2 class="mb-[13px] font-semibold test-[18px] text-[#30374F]">Car Details</h2>

                        <!-- <CarSpecs :specs="details" v-if="details?.brand" /> -->
                        <div class="grid grid-flow-row grid-cols-1 grid-rows-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5 gap-x-4 capitalize">
                            <!-- <div v-for="(detail, index) in details" :key="detail.id"> -->
                            <div :class="[' border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Car Brand </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ car.brand }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Model </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ car.model }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Year </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ car.year }} </span>
                            </div>

                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Engine Type </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ engineType }} </span>
                            </div>

                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Body Color </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ color }} </span>
                            </div>
                            <div :class="['border-t sm:border-none border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> Tyre </span>

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

                                <span class="font-semibold text-sm text-[#30374F]"> {{ car.transmissionTypeText }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> VIN </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ car.vin }} </span>
                            </div>

                            <!-- </div> -->
                        </div>
                    </div>
                </div>

                <div class="mb-5 detailsnfeatures pt-5 pb-[31px]">
                    <h2 class="mb-[24px] font-semibold test-[18px] text-[#30374F]">Car Features</h2>

                    <div v-if="car?.vehicleDetails?.features" class="flex flex-wrap gap-[15px]">
                        <div v-for="feature in car.vehicleDetails.features" :key="feature.id" class="flex items-center justify-between">
                            <div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_785_68512)">
                                        <path d="M8 0C3.58862 0 0 3.58862 0 8C0 12.4114 3.58862 16 8 16C12.4114 16 16 12.4114 16 8C16 3.58862 12.4114 0 8 0Z" fill="#4A5578" />
                                        <path
                                            d="M12.0542 6.3042L7.72083 10.6375C7.59082 10.7675 7.42017 10.8329 7.24951 10.8329C7.07886 10.8329 6.9082 10.7675 6.7782 10.6375L4.61157 8.47083C4.35083 8.21021 4.35083 7.78882 4.61157 7.5282C4.87219 7.26746 5.29346 7.26746 5.5542 7.5282L7.24951 9.22351L11.1116 5.36157C11.3722 5.10083 11.7935 5.10083 12.0542 5.36157C12.3148 5.62219 12.3148 6.04346 12.0542 6.3042Z"
                                            fill="#FAFAFA"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_785_68512">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <span class="ml-[5px] font-medium text-xs text-[#4A5578]">{{ feature.name }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="order-first lg:order-last col-span-1 max-w-[280px] flex">
                <SideSection />
            </div>
        </div>
    </div>
</template>

<script setup>
import SideSection from './SideSection.vue';
import { useRoute } from 'vue-router';
import CarSpecs from './CarSpecs.vue';
import Heart from '/src/components/reusable/Heart.vue';
import CarGallery from '/src/components/reusable/CarGallery.vue';
import GoBack from '/src/components/reusable/GoBack.vue';
import { ref, onMounted, provide, computed } from 'vue';
import { getVehicleById } from '@/services/MarketPlace';
import { Util } from '@/util';
onMounted(() => {
    getVehicle();
});
const route = useRoute();
const car = ref({});
const loading = ref(false);
const bodyType = computed(() => Util.getParamByName('Body Type', car.value.vehicleDetails?.vehicleParameters));
const color = computed(() => Util.getParamByName('Colors', car.value.vehicleDetails?.vehicleParameters));
const tyre = computed(() => Util.getParamByName('Tyre', car.value.vehicleDetails?.vehicleParameters));
const rims = computed(() => Util.getParamByName('Rims', car.value.vehicleDetails?.vehicleParameters));

const engineType = computed(() => Util.getParamByName('Engine Type', car.value.vehicleDetails?.vehicleParameters));
const getVehicle = () => {
    loading.value = true;
    getVehicleById(
        route.params.id,
        (res) => {
            loading.value = false;

            car.value = res.data.data;
        },
        (err) => {
            // loading.value = false;
        }
    );
};

provide('car', car);
</script>

<style lang="scss" scoped>
.detailsnfeatures {
    background: #f9f9fb;
    /* Gray cool / 100 */

    border: 1px solid #eff1f5;
    border-radius: 5px;
    padding-left: 25px;
    padding-right: 25px;
}

.reportBgImg {
    background-image: url('src/assets/images/LandingPage.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
