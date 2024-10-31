<template>
    <div>
        <!-- {{ productState.fetchedProductDetails.comment }} -->
        <div v-if="productState?.fetchedProductDetails?.comment?.length" class="pt-[30px]">
            <Reason header="Reasons for rejection" :reasons="productState.fetchedProductDetails.comment" />
        </div>
        <div class="pt-[30px] pb-[40px]">
            <div v-if="loading"><SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" /></div>
            <div v-else class="flex gap-8">
                <!-- {{ pickedOrder }} -->
                <!-- {{ $route.params }} -->
                <!-- {{ vendorDetails.vendorDetails }} -->
                <div class="min-w-[499px]">
                    <div>
                        <Gallery v-if="productState.fetchedProductDetails.pictures" class="mb-[29px]" :car="productState.fetchedProductDetails" />
                    </div>
                    <!-- {{ productState }} -->
                    <div v-if="Object.keys(productState.vendorDetails).length > 0" class="mt-[20px]">
                        <div class="detailsnfeatures mb-5 grid grid-cols-2 gap-8">
                            <div class="col-span-2 pt-[25px] pb-[38px]">
                                <h2 class="mb-[28px] font-semibold test-[18px] text-[#30374F]">Vendor Details</h2>

                                <!-- <CarSpecs :specs="details" v-if="details?.brand" /> -->
                                <div class="">
                                    <div :class="[, 'pb-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Name </span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ productState.vendorDetails.firstName }} {{ productState.vendorDetails.lastName }}</span>
                                    </div>

                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Email </span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ productState.vendorDetails.email }}</span>
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Phone Number</span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ productState.vendorDetails.phoneCode }}{{ productState.vendorDetails.phoneNumber }} </span>
                                    </div>
                                    <div :class="['border-t border-[#DCDFEA]', 'py-[15px] ']" class="flex items-center justify-between">
                                        <span class="font-medium text-sm text-[#4A5578]"> Address</span>

                                        <span class="font-semibold text-sm text-[#30374F]"> {{ productState.vendorDetails.address }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <VehicleInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Reason from '@/components/Reason.vue';
import VehicleInfo from './VehicleInfo.vue';
import Gallery from '@/views/admin/adminViews/reusable/AdminGallery.vue';
import { inject, computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Log } from '@/util';
onMounted(() => {});
const route = useRoute();
const productState = inject('productState');
const loading = inject('productLoading');
const detailsLoading = inject('detailsLoading');
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
</style>
