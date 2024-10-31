<template>
    <div class="container pt-[51px] pb-[88px]">
        <!-- adfsdf -->
        <!-- <Gallery class="mb-[29px] flex" /> -->

        <GoBack class="mb-10" text="Back to results" @click="$router.push('/search')" />
        <SpinnerLoader v-if="loading" class="mx-auto my-[100px] h-[100px] w-[100px]" />

        <div v-if="!loading" class="flex flex-col lmd:flex-row gap-8">
            <!-- order-first lmd:order-last -->
            <div class="flex flex-1 flex-col">
                <!-- {{ details.pictures }} -->
                <div class="mb-[15px] w-full flex items-center justify-between">
                    <h1 class="font-bold text-[20px] sm:text-[24px] md:text-[30px] text-[#30374F]">{{ details.year }} {{ details.brand }} {{ details.model }}</h1>
                    <!-- {{ details.id }} -->

                    <Heart :carDetails="details" />
                </div>
                <CarGallery v-if="details.pictures" class="mb-[29px]" :car="details" />

                <h3 class="text-[#30374F] text-[18px] font-semibold mb-[10px]">Description</h3>
                <p class="text-[#4A5578] text-sm font-normal mb-[25px]">
                    {{ details.description }}
                </p>

                <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                    <div class="col-span-2 pt-[25px] pb-[38px]">
                        <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Car Details</h2>

                        <!-- <CarSpecs :specs="details" v-if="details?.brand" /> -->
                        <div class="carPreviewDetailsList grid-rows-10">
                            <!-- <div v-for="(detail, index) in details" :key="detail.id"> -->
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
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
                                <span class="font-medium text-sm text-[#4A5578]"> Transmission </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.transmissionTypeText }} </span>
                            </div>
                            <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                <span class="font-medium text-sm text-[#4A5578]"> VIN </span>

                                <span class="font-semibold text-sm text-[#30374F]"> {{ details.vin }} </span>
                            </div>

                            <div v-for="(param, index) in details?.vehicleDetails?.vehicleParameters" :key="param.id">
                                <div v-if="index < 5" :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                    <span class="font-medium text-sm text-[#4A5578]"> {{ param.parameter }} </span>

                                    <span class="font-semibold text-sm text-[#30374F]"> {{ param.value }} </span>
                                </div>
                            </div>

                            <!-- </div> -->
                        </div>
                    </div>
                </div>

                <div class="mb-5 detailsnfeatures pt-5 pb-[31px]">
                    <h2 class="mb-[24px] font-semibold test-[18px] text-[#30374F]">Car Features</h2>

                    <div v-if="details?.vehicleDetails?.features" class="flex flex-wrap gap-[15px]">
                        <div v-for="feature in details.vehicleDetails.features" :key="feature.id" class="flex items-center justify-between">
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

                <!-- <div class="xs-shadow bg-[#ffffff] rounded-[4px] flex border border-[#EFF1F5]">
                    <div class="w-[239px] h-full reportBgImg rounded-l-[4px]"></div>

                    <div class="flex-1 p-6">
                        <h2 class="mb-1 font-semibold text-[18px] text-[#30374F]">Vehicle Report</h2>

                        <p class="mb-5 font-normal text-sm text-[#475467]">Get a detailed CARFAX report on this vehicle</p>

                        <button @click="createAndClickLink" class="flex items-center rounded-lg gap-[12px] py-[8px] px-[14px] xs-shadow bg-[#4A5578]">
                            <span class="font-semibold text-sm text-[#ffffff]"> Learn more</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.16699 9.99935H15.8337M15.8337 9.99935L10.0003 4.16602M15.8337 9.99935L10.0003 15.8327"
                                    stroke="white"
                                    stroke-width="1.66667"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div> -->

                <div class="xs-shadow bg-[#ffffff] rounded-[4px] flex flex-col sm:flex-row border border-[#EFF1F5]">
                    <div class="">
                        <div class="sm:w-[239px] h-[155px] sm:h-full xl:h-[155px] relative">
                            <img class="full-image rounded-tl-[4px] sm:rounded-l-[4px] rounded-tr-[4px] sm:rounded-r-[0px]" src="/src/assets/images/LandingPage.png" alt="" />

                            <!-- <div class="w-[239px] h-full reportBgImg rounded-l-[4px]"></div> -->
                        </div>
                    </div>

                    <div class="flex-1 p-6">
                        <h2 class="mb-1 font-semibold text-[18px] text-[#30374F]">Vehicle Report</h2>

                        <p class="mb-5 font-normal text-sm text-[#475467]">Get a detailed CARFAX report on this vehicle</p>
                        <button @click="createAndClickLink" class="flex items-center rounded-lg gap-[12px] py-[8px] px-[14px] xs-shadow bg-[#4A5578]">
                            <span class="font-semibold text-sm text-[#ffffff]"> Learn more</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.16699 9.99935H15.8337M15.8337 9.99935L10.0003 4.16602M15.8337 9.99935L10.0003 15.8327"
                                    stroke="white"
                                    stroke-width="1.66667"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-span-1 sm:max-w-[280px] flex">
                <SideSection :details="details" />
                <!-- <div class="">{{ details }}</div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getVehicleByUserId } from '@/services/MarketPlace.js';
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
// import Gallery from '/src/components/reusable/Gallery.vue';
import SideSection from '@/views/AuthPages/buyCar/SideSection.vue';
// import CarSpecs from '@/views/search/Specs.vue';
import Heart from '@/components/reusable/Heart.vue';
import CarGallery from '@/components/reusable/CarGallery.vue';
import GoBack from '@/components/reusable/GoBack.vue';
import { ref, onMounted, computed } from 'vue';
import { Log } from '@/util';
import { useStore } from 'vuex';
onMounted(() => {
    getVehicle();
});
const router = useRouter();
const loading = ref(false);
const route = useRoute();
const carId = computed(() => route.params.id);
const details = ref({});
const store = useStore();
const userId = computed(() => store.getters['authToken/userId']);
const getVehicle = () => {
    loading.value = true;
    getVehicleByUserId(
        {
            id: carId.value,
            userId: userId.value,
        },
        // carId.value,
        (res) => {
            loading.value = false;
            details.value = res.data.data;
            // details.value.customParams =
        },
        (err) => {
            if (err.response.status === 400 || err.response.status === 404) {
                router.push('/404');
            }
            loading.value = false;
        }
    );
};

// const vehicleParamsMapper = () => {
//     details.value.vehicleParameters.map((param) => {
//         const obj = {
//             color: param.parameter === 'Colors' ? param.parameter : null
//             color: param.parameter === 'Colors' ? param.parameter : null
//             color: param.parameter === 'Colors' ? param.parameter : null
//         }
//     })
// }

const createAndClickLink = () => {
    // Create the link element
    const link = document.createElement('a');

    // Set the link's href and target attributes
    link.href = 'https://www.carfax.com/'; // Replace with the desired URL
    link.target = '_blank'; // Replace with the desired target attribute value

    // Optionally set other attributes or content for the link

    // Append the link to the document body
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the document body (optional)
    document.body.removeChild(link);
};
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
    background-image: url('@/assets/images/LandingPage.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
