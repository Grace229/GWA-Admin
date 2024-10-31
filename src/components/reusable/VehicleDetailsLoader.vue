<template>
    <div>
        <div class="pt-[30px] pb-[40px] max-w-xl xl:max-w-full overflow-x-auto">
            <!-- <div v-if="orderLoading"><SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" /></div> -->
            <div class="flex flex-col xl:flex-row gap-8">
                <!-- {{ pickedOrder }}ss -->
                <!-- {{ $route.params }} -->
                <!-- {{ orderState.accountInfo }} -->
                <!-- {{ orderState.customerDetails }} -->
                <div class="md:min-w-[499px]">
                    <div>
                        <div class="bg-gray-200 animate-pulse w-full h-40 rounded-lg"></div>
                    </div>
                    <div class="mt-[20px]">
                        <div class="detailsnfeatures mb-5 flex flex-col gap-8">
                            <div class="pt-[25px] pb-[38px] sm:px-0">
                                <div class="flex flex-col gap-4">
                                    <div class="w-full h-[14px] bg-gray-100 animate-pulse rounded-lg"></div>

                                    <div class="w-full h-[14px] bg-gray-100 animate-pulse rounded-lg"></div>
                                    <div class="w-full h-[14px] bg-gray-100 animate-pulse rounded-lg"></div>
                                    <div class="w-full h-[14px] bg-gray-100 animate-pulse rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="bg-gray-200 animate-pulse w-full h-40 rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

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
40z
