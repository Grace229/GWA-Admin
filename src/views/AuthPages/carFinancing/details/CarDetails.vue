<template>
    <div class="container pb-[88px]">
        <GoBack class="mb-10" text="Back" @click="$router.go(-1)" />
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

                <div class="flex flex-col gap-[10px]">
                    <div class="flex bg-[#F9F9FB] border border-[#EFF1F5] rounded-[5px] py-[22px] px-[15px]">
                        <span class="text-sm font-medium text-[#30374F]">Car Details</span>
                    </div>
                    <div @click="proceed" class="cursor-pointer flex items-center justify-between bg-[#F9F9FB] border border-[#EFF1F5] rounded-[5px] py-[22px] px-[15px]">
                        <span class="text-sm font-medium text-[#30374F]">The Alternative Bank Account Details</span>
                        <span class="text-xs font-medium text-[#DC6803]">Pending Action</span>
                    </div>
                    <div class="flex justify-between items-center bg-[#F9F9FB] border border-[#EFF1F5] rounded-[5px] py-[22px] px-[15px]">
                        <div class="flex items-center gap-[14px]">
                            <div>
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M13 12H5M13 16H5M7 8H5M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z"
                                        stroke="#344054"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <span class="text-sm font-medium text-[#30374F]">Carfax Report.pdf</span>
                        </div>
                        <div class="flex gap-[13px] text-[#4A5578] text-xs font-medium">
                            <span class="cursor-pointer">View Report</span>
                            <span class="cursor-pointer">Download</span>
                        </div>
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
import SideSection from '/src/views/AuthPages/carFinancing/details/SideSection.vue';
// import CarSpecs from '/src/views/Details/CarSpecs.vue';
import Heart from '/src/components/reusable/Heart.vue';
import CarGallery from '/src/components/reusable/CarGallery.vue';
import GoBack from '/src/components/reusable/GoBack.vue';
import { ref, computed, onMounted } from 'vue';
import { carsList } from '/src/components/reusable/dummyData/CarsList';

import { useRoute, useRouter } from 'vue-router';
onMounted(() => {});
const route = useRoute();
const router = useRouter();
const car = computed(() => carsList.find((car) => car.id == carId.value));
const cars = carsList;
const carId = computed(() => route.params.id);
// const details = ref({
//     brand: 'Lexus',
//     model: 'ES350',
//     color: 'Metallic Grey',
//     fuelType: 'Petrol',
//     engine: '3.5L V6 Engine',
//     year: '2018',
//     interior: 'Black',
//     transmission: 'Automatic',
//     vehicleID: '4ZxFyxO0w',
//     VIN: '4ZxFyxO0w',
// });

const proceed = () => {
    if (car.value.status === 'Eligibility Approved') {
        router.push(`/buy_car/${carId.value}/3`);
    }

    if (car.value.status === 'Paid') {
        // console.log('clicked' + carId.value);
        router.push(`/buy_car/${carId.value}/4`);
    }
};

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
