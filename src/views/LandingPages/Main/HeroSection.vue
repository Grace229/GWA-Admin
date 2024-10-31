<template>
    <div class="bgImg">
        <div class="h-full w-full overlay">
            <div class="container pt-[129px] pb-[79px] grid grid-cols-1 gap-6">
                <h1 class="font-bold text-[48px] text-[#FFFFFF] leading-[60px] md:w-[544px]">Get a new car in less than 60 days with our flexible payment plans</h1>

                <p class="mb-[25px] font-normal text-[20px] text-[#F2F4F7] md:w-[480px]">Our flexible payment plan allows you to own a car and pay monthly, 0% interest charged</p>

                <div
                    class="max-w-[246px] sm:max-w-[696px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[26px] px-[25px] sm:px-[30px] py-[25px] sm:py-[44px] rounded-[4px] shadow-xs bg-[#FFFFFF]"
                >
                    <IdSelect class="h-[40px]" v-model="queryParams.brand" :modelValue="queryParams.brand" :options="brands" label="Make" />
                    <IdSelect class="h-[40px]" v-model="queryParams.model" :modelValue="queryParams.model" :options="models" label="Choose Model" />
                    <IdSelect class="h-[40px]" v-model="queryParams.mileage" :options="mileageMenu" label="Mileage" />

                    <CustomSelect class="h-[40px]" v-model="queryParams.condition" :options="newOrUsedMenu" label="New/Used" />

                    <CustomSelect class="h-[40px]" v-model="queryParams.price" :options="priceMenu" label="Max Price" />

                    <!-- <HeroBtn v-for="dropdown in dropdowns" :key="dropdown.name" :label="dropdown.name" /> -->
                    <button
                        @click="
                            $router.push(`/search?brand=${queryParams.brand}&model=${queryParams.model}&mileage=${queryParams.mileage}&condition=${queryParams.condition}&price=${queryParams.price}`)
                        "
                        class="brandButton !h-[40px] flex items-center justify-center"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import HeroBtn from '/src/views/LandingPages/Main/HeroDropDownBtn.vue';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { Log } from '@/util';
import { reactive, onMounted, ref, watch } from 'vue';
import { getAllBrands, getBrandModels } from '@/services/GeneralServices.js';
onMounted(() => {
    getBrands();
});

const queryParams = reactive({
    brand: '',
    condition: '',
    model: '',
    mileage: '',
    price: '',
});

const brands = ref([]);

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
        queryParams.brand,
        (res) => {
            models.value = res.data.data.map((obj) => {
                obj.text1 = obj.name;
                return obj;
            });
        },
        (err) => {}
    );
};

const newOrUsedMenu = [
    {
        id: 1,
        text1: 'Brand New',
        name: 'Brand New',
    },
    {
        id: 2,
        text1: 'Locally Used',
        name: 'Locally Used',
    },
    {
        id: 3,
        text1: 'Foreign Used',
        name: 'Foreign Used',
    },
];

const models = ref([]);

const mileageMenu = [
    {
        id: 10000,
        text1: '10,000 mi',
    },
    {
        id: 20000,
        text1: '20,000 mi',
    },
    {
        id: 30000,
        text1: '30,000 mi',
    },
    {
        id: 40000,
        text1: '40,000 mi',
    },
    {
        id: 50000,
        text1: '50,000 mi',
    },
    {
        id: 60000,
        text1: '60,000 mi',
    },
    {
        id: 70000,
        text1: '70,000 mi',
    },
    {
        id: 80000,
        text1: '80,000 mi',
    },
    {
        id: 90000,
        text1: '90,000 mi',
    },
    {
        id: 100000,
        text1: '100,000 mi',
    },
    {
        id: 150000,
        text1: '150,000 mi',
    },
    {
        id: 200000,
        text1: '200,000 mi',
    },
];

const priceMenu = [
    {
        id: 1,
        text1: '5,000,000',
    },
    {
        id: 2,
        text1: '6,000,000',
    },
];

watch(
    () => queryParams.brand,
    (newValue) => {
        getModels();
    }
);
</script>

<style lang="scss" scoped>
.bgImg {
    background-image: url('/src/assets/images/LandingPage.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.overlay {
    // mix-blend-mode: normal;
    // opacity: 0.78;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33)), linear-gradient(270deg, rgba(246, 14, 14, 0.3) 0.12%, rgba(255, 168, 0, 0.3) 99.99%);
}
</style>
