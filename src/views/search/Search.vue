<template>
    <div class="">
        <div class="shadow-xs border-b border-gray-200 py-[24px]">
            <div class="container">
                <h1 class="font-semibold text-[24px] text-[#344054]">Available Cars</h1>
                <!-- {{ state.searchParams }} -->
                <!-- {{ Constants.financeOptionsEnum.find((option) => option.text1 == routeQuery?.financeOption)?.id ? }} -->
                <!-- {{ routeQuery?.financeOption.toLowerCase() }} -->
            </div>
        </div>

        <div class="flex container gap-8 mt-[51px] mb-[60px]">
            <!-- {{ prepareParams() }} -->
            <!-- {{ sortEnum.Added }} -->
            <!-- {{ state.searchParams.total }} -->
            <div>
                <div class="max-h-max pt-[20px] w-full max-w-[278px] min-w-[278px] shadow-xs bg-gray-50 rounded-lg border border-[#EFF1F5]">
                    <div class="searchFilterPx">
                        <p class="font-semibold text-sm text-[#30374F] mb-[15px]">{{ state.searchParams.total }} vehicles</p>

                        <div v-if="params.length > 0" class="flex flex-wrap gap-[6px]">
                            <div
                                @click="clearParam(param.param)"
                                v-for="param in params"
                                :key="param.name"
                                class="flex gap-[2px] items-center py-[4px] pl-[10px] pr-px border border-gray-300 rounded-[4px] bg-gray-200"
                            >
                                <span class="font-medium text-sm text-[#344054] leading-[20px]">{{ param.name }}</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 6.5L6.5 13.5M6.5 6.5L13.5 13.5" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <!-- v-if="params.length > 0" -->
                        <p @click="clearAll" class="pb-[18px] cursor-pointer font-normal text-[#F23B55] text-[12px] mt-[17px]">Clear all</p>
                    </div>
                    <div class="searchFilterPx pt-[29px] pb-[24px] border-t border-[#EFF1F5] flex flex-col gap-[24px]">
                        <CustomSelect class="h-[40px]" v-model="state.searchParams.location" :options="stateMenu" :modelValue="state.searchParams.location" label="Location" />

                        <IdSelect class="h-[40px]" v-model="state.searchParams.brand" :modelValue="state.searchParams.brand" :options="brands" label="Car Make" />
                        <IdSelect class="h-[40px]" v-model="state.searchParams.model" :modelValue="state.searchParams.model" :options="models" label="Choose Model" />
                    </div>

                    <div class="carParams flex flex-col gap-4">
                        <p class="">Mileage Range</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="col-span-1">
                                <label for="min" class="block text-xs font-normal text-[#475467]">Min </label>
                                <div class="mt-1">
                                    <!-- <input
                                    type="text"
                                    name="min"
                                    id="min"
                                    autocomplete="off"
                                    v-model="state.searchParams.min"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="min-description"
                                /> -->
                                    <CurrencyInput
                                        :id="'MileageMin'"
                                        v-model="state.searchParams.min"
                                        :options="{
                                            currency: 'ngn',
                                            currencyDisplay: 'hidden',
                                            hideCurrencySymbolOnFocus: true,
                                            hideGroupingSeparatorOnFocus: false,
                                            hideNegligibleDecimalDigitsOnFocus: false,
                                        }"
                                    />
                                </div>
                            </div>
                            <div class="col-span-1">
                                <label for="max" class="block text-xs font-normal text-[#475467]">Max </label>
                                <div class="mt-1">
                                    <CurrencyInput
                                        :id="'MileageMax'"
                                        v-model="state.searchParams.max"
                                        :options="{
                                            currency: 'ngn',
                                            currencyDisplay: 'hidden',
                                            hideCurrencySymbolOnFocus: true,
                                            hideGroupingSeparatorOnFocus: false,
                                            hideNegligibleDecimalDigitsOnFocus: false,
                                        }"
                                    />
                                </div>
                            </div>

                            <div class="col-span-2 mt-[20px] mr-[7px] ml-[15px]">
                                <RangeSliderMil @setMinimum="setMileageMinimum" @setMaximum="setMileageMaximum" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-[25px]"></div>

                    <div class="carParams flex flex-col gap-[16px]">
                        <p>Conditions</p>
                        <!-- <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="new" aria-describedby="new-description" name="new" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="new" class="font-normal text-gray-600">New</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id="Locally Used"
                                    aria-describedby="LocallyUsed-description"
                                    name="Locally Used"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="Locally Used" class="font-normal text-gray-600">Locally Used</label>
                            </div>
                        </div>
                        <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                                <input
                                    id="Foreign Used"
                                    aria-describedby="ForeignUsed-description"
                                    name="Foreign Used"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="Foreign Used" class="font-normal text-gray-600">Foreign Used</label>
                            </div>
                        </div> -->
                        <!-- {{ state.searchParams.conditions }} -->
                        <div v-for="condition in conditions" :key="condition.id" class="flex items-center">
                            <input
                                :id="condition.id"
                                v-model="condition.checked"
                                :aria-describedby="condition.name"
                                :name="condition.name"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0"
                            />
                            <label :for="condition.id" class="ml-3 block text-sm ffont-normal text-gray-600">{{ condition.text1 }}</label>
                        </div>
                    </div>
                    <div class="carParams flex flex-col gap-4">
                        <p class="">Price Range</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="col-span-1">
                                <label for="min" class="block text-xs font-normal text-[#475467]">Min </label>
                                <div class="mt-1">
                                    <CurrencyInput
                                        :id="'MinPrice'"
                                        v-model="state.searchParams.priceMin"
                                        :options="{
                                            currency: 'ngn',
                                            currencyDisplay: 'hidden',
                                            hideCurrencySymbolOnFocus: true,
                                            hideGroupingSeparatorOnFocus: false,
                                            hideNegligibleDecimalDigitsOnFocus: false,
                                        }"
                                    />
                                </div>
                            </div>
                            <div class="col-span-1">
                                <label for="max" class="block text-xs font-normal text-[#475467]">Max </label>
                                <div class="mt-1">
                                    <CurrencyInput
                                        :id="'MaxPrice'"
                                        v-model="state.searchParams.priceMax"
                                        :options="{
                                            currency: 'ngn',
                                            currencyDisplay: 'hidden',
                                            hideCurrencySymbolOnFocus: true,
                                            hideGroupingSeparatorOnFocus: false,
                                            hideNegligibleDecimalDigitsOnFocus: false,
                                        }"
                                    />
                                </div>
                            </div>
                            <div class="col-span-2 mt-[20px] mr-[7px] ml-[15px]">
                                <RangeSlider @setMinimum="setMinimum" @setMaximum="setMaximum" />
                            </div>
                        </div>
                    </div>
                    <div style="border-bottom: none" class="carParams flex flex-col gap-[16px]">
                        <p>Categories</p>

                        <!-- {{ state.searchParams.financeOption }}ss -->
                        <div class="flex items-center">
                            <input v-model="state.searchParams.financeOption" type="radio" :value="''" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            <label for="All" class="ml-3 block text-sm ffont-normal text-gray-600">All</label>
                        </div>
                        <div v-for="financingType in Constants.financeOptionsEnum" :key="financingType.id" class="flex items-center">
                            <input v-model="state.searchParams.financeOption" type="radio" :value="financingType.id" class="h-4 w-4 rounded border-gray-300 text-gray-300 focus:ring-0" />
                            <label :for="financingType.id" class="ml-3 block text-sm ffont-normal text-gray-600">{{ financingType.text1 }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="carsLoading && cars.length === 0" class="flex-1">
                <div :class="[noParams ? 'grid-cols-4' : '  grid-cols-3 ', 'grid gap-6 xl:gap-8']">
                    <span v-for="count in 9" :key="count"> <CarCardLoading /></span>
                </div>

                <div class="flex items-center justify-center mt-[60px] mb-[20px]"><Pagination /></div>
            </div>
            <!-- <div v-else-if="cars.length === 0 && !carsLoading" class="py-40 h-40 w-full bg-white flex flex-col items-center justify-center">
               
                <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
            </div> -->

            <div v-else class="flex-1">
                <div v-if="cars.length === 0 && !carsLoading" class="py-40 h-40 w-full bg-white flex flex-col items-center justify-center">
                    <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                </div>
                <div v-else :class="[noParams ? 'grid-cols-4' : '  grid-cols-3 ', 'grid gap-6 xl:gap-8']">
                    <CarouselCard v-for="car in cars" :key="car" :car="car" link="/buy_car" />
                </div>
                <!-- {{ searchParams.pageNumber > 1 }} -->
                <!-- {{ state.searchParams.conditions }} -->
                <div v-if="cars.length >= 9 || state.searchParams.pageNumber > 1" class="mt-[40px]"><PaginationComponent /></div>
                <!-- {{ state.searchParams.total }} -->
                <!-- <div class="flex items-center justify-center mt-[60px] mb-[20px]"><Pagination /></div> -->
            </div>
            <!-- <div v-if="cars.length >= 0" class="mt-[40px]"><PaginationComponent /></div> -->
        </div>
    </div>
</template>

<script setup>
import RangeSliderMil from '@/components/reusable/RangeSliderMil.vue';
import RangeSlider from '@/components/reusable/RangeSlider.vue';
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { searchAllCars } from '@/services/MarketPlace.js';
import CarCardLoading from '@/components/reusable/CarCardLoading.vue';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import CarouselCard from '@/views/search/CarouselCard.vue';
import { getAllBrands, getBrandModels } from '@/services/GeneralServices.js';
import { reactive, ref, onMounted, computed, watch, provide, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Log, Constants } from '@/util';
import { useStore } from 'vuex';
import { stateMenu } from '@/components/reusable/StateList.js';
import Pagination from '/src/components/reusable/Pagination.vue';
onMounted(() => {
    setCheckedParams();
    getBrands();
    getModels();
    getCars();
    // displayParams();
});
const store = useStore();
const noParams = ref(false);
const route = useRoute();
const carsLoading = ref(false);
const routeQuery = computed(() => route.query);
const useQueryCondition = ref(true);
const brands = ref([]);
const models = ref([]);
const cars = ref([]);
const maxPrice = ref(200000000);
const minPrice = ref(10000);
const minMileage = ref(0);
const maxMileage = ref(1000000);
const userId = computed(() => `&UserId=${store.getters['authToken/userId']}`);
const sortEnum = {
    Brand: 1,
    Model: 2,
    Added: 3,
    Year: 4,
    Price: 5,
};
// const paginationParams = reactive({
//     total: 0,
//     pageNumber: 1,
//     pageSize: 9
// })
const state = reactive({
    searchParams: {
        userId: userId.value,
        brand: routeQuery.value.brand ? routeQuery.value.brand : '',
        model: routeQuery.value.model ? routeQuery.value.model : '',
        location: '',
        min: minMileage.value,
        max: routeQuery.value.mileage ? routeQuery.value.mileage : maxMileage.value,
        priceMin: minPrice.value,
        financeOption: '',
        // financeOption: computed(() => setFinanceOptionQuery()),
        priceMax: routeQuery.value.price ? routeQuery.value.price : maxPrice.value,
        conditions: computed(() => conditions.filter((condition) => condition.checked === true).map((condition) => condition.name)),
        pageNumber: 1,
        pageSize: 9,
        total: 0,
    },
});

const setFinanceOptionQuery = () => {
    if (routeQuery.value?.financeOption) {
        const option = Constants.financeOptionsEnum.find((option) => option.text1.toLowerCase() == routeQuery.value?.financeOption.toLowerCase());

        if (option !== null || option !== undefined) {
            return option?.id ? option.id : '0';
        } else {
            return '0';
        }
    }
};

const setCheckedParams = () => {
    conditions.forEach((condition) => {
        if (condition.name === routeQuery.value.condition) {
            condition.checked = true;
        }
    });
};

const setMileageMinimum = (minValue) => {
    state.searchParams.min = minValue;
    var element = document.getElementById('MileageMin');
    element.value = state.searchParams.min;
    element.focus();
};

const setMileageMaximum = (maxValue) => {
    state.searchParams.max = maxValue;
    var element = document.getElementById('MileageMax');
    element.value = state.searchParams.max;
    element.focus();
};

const setMinimum = (minValue) => {
    state.searchParams.priceMin = minValue;
    var element = document.getElementById('MinPrice');
    element.value = state.searchParams.priceMin;
    element.focus();
};

const setMaximum = (maxValue) => {
    state.searchParams.priceMax = maxValue;
    var element = document.getElementById('MaxPrice');
    element.value = state.searchParams.priceMax;
    element.focus();
};

const setConditionsQueryString = () => {
    if (state.searchParams.conditions.length === 1) {
        return `&Conditions=${state.searchParams.conditions[0]}`;
    }
    if (state.searchParams.conditions.length === 2) {
        return `&Conditions=${state.searchParams.conditions[0]}&Conditions=${state.searchParams.conditions[1]}`;
    }
    if (state.searchParams.conditions.length === 3) {
        return `&Conditions=${state.searchParams.conditions[0]}&Conditions=${state.searchParams.conditions[1]}&Conditions=${state.searchParams.conditions[2]}`;
    }
    if (state.searchParams.conditions.length === 0) {
        // if (routeQuery.value.condition && useQueryCondition.value) {
        return '';
        // }
    }
};

const prepareParams = () => {
    const obj = {
        userId: state.searchParams.userId,
        leastAmount: state.searchParams.priceMin,
        highestAmount: state.searchParams.priceMax,
        minMileage: state.searchParams.min,
        maxMileage: state.searchParams.max,
        highestYear: '',
        leastYear: '',
        searchText: '',
        sortBy: sortEnum.Added,
        // sortBy: 4,
        descending: true,
        conditions: setConditionsQueryString(),
        financeOption: state.searchParams.financeOption,
        brandId: state.searchParams.brand,
        modelId: state.searchParams.model,
        location: state.searchParams.location,
        pageNumber: state.searchParams.pageNumber,
        pageSize: state.searchParams.pageSize,
    };

    // if (state.searchParams.financeOption) {
    //     obj.financeOption = state.searchParams.financeOption;
    // }

    return obj;
};

const getBrands = () => {
    getAllBrands(
        (res) => {
            brands.value = res.data.data.map((obj) => {
                obj.text1 = obj.name;
                return obj;
            });
        },
        (err) => {}
    );
};

const getModels = () => {
    getBrandModels(
        state.searchParams.brand,
        (res) => {
            models.value = res.data.data.map((obj) => {
                obj.text1 = obj.name;
                return obj;
            });
        },
        (err) => {}
    );
};

const getCars = () => {
    carsLoading.value = true;
    searchAllCars(
        prepareParams(),
        (res) => {
            // alert('Cars');
            carsLoading.value = false;
            state.searchParams.total = res.data.total;
            cars.value = res.data.data;
        },
        (err) => {
            carsLoading.value = false;
        }
    );
};

// const financingTypes = [
//     {
//         id: 1,
//         text1: 'Lease',
//     },
//     {
//         id: 2,
//         text1: 'Rent',
//     },
//     {
//         id: 3,
//         text1: 'Buy',
//     },
// ];

const conditions = reactive([
    {
        id: 1,
        text1: 'New',
        name: 'Brand New',
        checked: false,
    },
    {
        id: 2,
        text1: 'Locally Used',
        name: 'Locally Used',
        checked: false,
    },
    {
        id: 3,
        text1: 'Foreign Used',
        name: 'Foreign Used',
        checked: false,
    },
]);

const params = computed(() => {
    const brand = brands.value.find((brand) => brand.id === state.searchParams.brand);
    const model = models.value.find((model) => model.id === state.searchParams.model);

    const location = state.searchParams.location;

    const paramsArr = [];
    if (brand) {
        paramsArr.push({ param: 'Brand', name: brand.name });
    }
    if (model) {
        paramsArr.push({ param: 'Model', name: model.name });
    }
    if (location) {
        paramsArr.push({ param: 'Location', name: location });
    }

    return paramsArr;
});

const clearParam = (paramName) => {
    if (paramName === 'Brand') {
        state.searchParams.brand = '';
    }
    if (paramName === 'Model') {
        state.searchParams.model = '';
    }
    if (paramName === 'Location') {
        state.searchParams.location = '';
    }
};

const clearAll = () => {
    conditions.forEach((condition) => (condition.checked = false));
    state.searchParams = {
        userId: userId.value,
        brand: '',
        model: '',
        location: '',
        min: minMileage.value,
        max: maxMileage.value,
        priceMin: minPrice.value,
        financeOption: '',
        priceMax: maxPrice.value,
        conditions: computed(() => conditions.filter((condition) => condition.checked === true).map((condition) => condition.name)),
        pageNumber: 1,
        pageSize: 9,
        total: 0,
    };

    // getCars();
};

watch(
    () => state.searchParams.brand,
    (newValue) => {
        getModels();
    }
);

watchEffect(() => {
    const { total, ...watchedSearchParams } = state.searchParams;

    // Perform your desired action here.
    getCars();
});

provide('searchParams', state.searchParams);
// provide('state', state);
provide('minVal', state.searchParams.min);
</script>

<style lang="scss" scoped>
.carParams {
    border: 1px solid #eff1f5;
    padding: 20px 20px 30px 20px;
}
.carParams > p {
    color: #475467;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
}
.searchFilterPx {
    padding-left: 29px;
    padding-right: 29px;
}
</style>
