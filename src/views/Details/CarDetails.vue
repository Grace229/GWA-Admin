<template>
    <div class="container pt-[51px] pb-[88px]">
        <!-- <Gallery class="mb-[29px] flex" /> -->
        <CarGallery class="mb-[29px] hidden" />

        <GoBack class="mb-10" text="Back to results" @click="$router.go(-1)" />
        <div class="flex gap-8">
            <div class="flex flex-1 flex-col">
                <div class="mb-[15px] w-full flex items-center justify-between">
                    <h1 class="font-bold text-[30px] text-[#30374F]">2002 Chevrolet Silverado</h1>

                    <Heart />
                </div>
                <CarGallery class="mb-[29px]" />
                <!-- <Gallery class="mb-[29px] hidden" /> -->
                <h3 class="text-[#30374F] text-[18px] font-semibold mb-[10px]">Description</h3>
                <p class="text-[#4A5578] text-sm font-normal mb-[25px]">
                    The Hyundai i10 brings sharper-than-ever looks to the city car party along with a healthy amount of standard safety kit and a practical boot. Shame about the sluggish entry-level
                    model though.
                </p>

                <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                    <div class="col-span-2 pt-[25px] pb-[38px]">
                        <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Car Details</h2>

                        <CarSpecs :details="details" />
                    </div>
                </div>

                <div class="mb-5 detailsnfeatures pt-5 pb-[31px]">
                    <h2 class="mb-[24px] font-semibold test-[18px] text-[#30374F]">Car Features</h2>

                    <div class="flex flex-wrap gap-[15px]">
                        <div v-for="feature in features" :key="feature" class="flex items-center justify-between">
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
                            <span class="ml-[5px] font-medium text-xs text-[#4A5578]">{{ feature }}</span>
                        </div>
                    </div>
                </div>

                <div class="xs-shadow bg-[#ffffff] rounded-[4px] flex border border-[#EFF1F5]">
                    <div class="w-[239px] h-full reportBgImg rounded-l-[4px]"></div>

                    <div class="flex-1 p-6">
                        <h2 class="mb-1 font-semibold text-[18px] text-[#30374F]">Vehicle Report</h2>

                        <p class="mb-5 font-normal text-sm text-[#475467]">Get a detailed CARFAX report on this vehicle</p>

                        <button class="flex items-center rounded-lg gap-[12px] py-[8px] px-[14px] xs-shadow bg-[#4A5578]">
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

            <div class="col-span-1 max-w-[280px] flex">
                <SideSection />
            </div>
        </div>
    </div>
</template>

<script setup>
import Gallery from '/src/components/reusable/Gallery.vue';
import SideSection from '/src/views/Details/SideSection.vue';
import CarSpecs from '/src/views/Details/CarSpecs.vue';
import Heart from '/src/components/reusable/Heart.vue';
import CarGallery from '/src/components/reusable/CarGallery.vue';
import GoBack from '/src/components/reusable/GoBack.vue';
import { ref } from 'vue';
const details = ref({
    brand: 'Lexus',
    model: 'ES350',
    color: 'Metallic Grey',
    fuelType: 'Petrol',
    engine: '3.5L V6 Engine',
    year: '2018',
    interior: 'Black',
    transmission: 'Automatic',
    vehicleID: '4ZxFyxO0w',
    VIN: '4ZxFyxO0w',
});

const features = ref(['ABS Airbags', 'AM/FM Stereo with Antenna.', 'Traction Control', 'Keyless Entry', 'Bluetooth', 'Heated front seats', 'Alloy Wheels', 'Air Condition']);
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
