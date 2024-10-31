<template>
    <div>
        <!-- //table -->
        <div class="mb-10">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="cars.length === 0 && carsLoading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="cars.length === 0 && !carsLoading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>
                        <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Price</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Vendor</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Location</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Status</th>

                                        <!-- <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Amount</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Payment Status</th> -->

                                        <th scope="col" class="relative py-3.5 pl-3 pr-6">
                                            <span class="sr-only">Menu</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(car, index) in cars" :key="car.id" :class="[index + 1 === car.length ? 'border-none rounded-b-lg' : 'border-b border-[#EAECF0]']">
                                        <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-[#475467]">
                                            <div class="flex items-center gap-3">
                                                <div class="w-[81px]">
                                                    <img class="rounded-lg h-[50px] !w-[100%] text-center" :src="car.pictures[0].fileUrl" :alt="car.pictures[0].fileName" />
                                                </div>
                                                <span>{{ car.year }} {{ car.brand }} {{ car.model }}</span>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ car.price == 0 ? '0:00' : formatCurrency(car.price) }}</td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ car.vendorName }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ car.location }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">
                                            <div v-if="car.statusText.toLowerCase() === 'approved'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max">
                                                <span>Approved</span>
                                            </div>
                                            <div v-else-if="car.statusText.toLowerCase() === 'published'" class="px-[10px] py-[2px] rounded-[16px] text-[#027A48] bg-[#ECFDF3] max-w-max">
                                                <span>Published</span>
                                            </div>

                                            <div v-else-if="car.statusText.toLowerCase() === 'pending'" class="px-[10px] py-[2px] rounded-[16px] text-[#DC6803] bg-[#FEF0C7] max-w-max">
                                                <span>Pending</span>
                                            </div>

                                            <div v-else-if="car.statusText.toLowerCase() === 'rejected'" class="px-[10px] py-[2px] rounded-[16px] text-[#B42318] bg-[#FEF3F2] max-w-max">
                                                <span>Rejected</span>
                                            </div>
                                            <div v-else-if="car.statusText.toLowerCase() === 'sold'" class="px-[10px] py-[2px] rounded-[16px] text-[#344054] bg-[#F2F4F7] max-w-max">
                                                <span>Sold</span>
                                            </div>
                                            <div v-else>
                                                <span>{{ car.statusText }}</span>
                                            </div>
                                        </td>

                                        <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                            <div>
                                                <ProductMenu v-if="car.statusText.toLowerCase() === 'sold'" @proceed="optionPrompt" :car="car" :menuOptions="soldMenuOptions" />

                                                <ProductMenu v-else @proceed="optionPrompt" :car="car" :menuOptions="menuOptions" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <PaginationComponent v-if="cars.length > 0" class="mt-2" />
            </div>
        </div>
        <PositiveModal />
        <NegativeModal />
    </div>
</template>

<script setup>
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import { Log, Constants, Util } from '@/util';
import { watchDebounced } from '@vueuse/core';
import ProductMenu from '@/views/admin/adminViews/reusable/ProductMenu.vue';
import { ref, provide, reactive, onMounted, watch, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getProducts } from '@/services/AdminServices.js';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';

onMounted(() => {
    getAllProducts();
    setMenuOptionsBasedOnRole();
    // getAllVehicles();
    // getAllProducts();
});
const loading = ref(false);
const store = useStore();
const role = store.getters['authToken/roles'][0];
const userId = computed(() => store.getters['authToken/userId']);
const carsLoading = ref(false);

const cars = ref([]);
const router = useRouter();
const state = reactive({
    searchParams: {
        // brand: '',
        // model: '',
        // location: '',
        // min: 0,
        // max: 2000000,
        // priceMin: 10000,
        // financeOption: '0',
        // priceMax: 200000000,
        // conditions: '',
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});

const setMenuOptionsBasedOnRole = () => {
    if (role === 'SuperAdmin') {
        menuOptions.value = ['View Details'];
    }
};

const getAllProducts = () => {
    carsLoading.value = true;
    getProducts(
        prepareParams(),
        (res) => {
            carsLoading.value = false;
            state.searchParams.total = res.data.total;
            cars.value = res.data.data;
        },
        (err) => {
            carsLoading.value = false;
        }
    );
};

const prepareParams = () => {
    const obj = {
        // leastAmount: state.searchParams.priceMin,
        // highestAmount: state.searchParams.priceMax,
        // minMileage: state.searchParams.min,
        // maxMileage: state.searchParams.max,
        // highestYear: '',
        // leastYear: '',
        // searchText: '',
        // sortBy: Constants.sortEnum.Added,
        descending: true,
        // conditions: setConditionsQueryString(),
        // conditions: '',
        // financeOption: state.searchParams.financeOption,
        // financeOption: state.searchParams.financeOption ? Number(state.searchParams.financeOption) : null,
        // brandId: state.searchParams.brand,
        // modelId: state.searchParams.model,
        // location: state.searchParams.location,
        pageNumber: state.searchParams.pageNumber,
        pageSize: state.searchParams.pageSize,
    };

    // if (state.searchParams.financeOption) {
    //     obj.financeOption = state.searchParams.financeOption;
    // }

    return obj;
};

const formatCurrency = inject('formatCurrency');
const menuOptions = ref(['View Details', 'Approve', 'Deactivate', 'Edit']);
const soldMenuOptions = ['View Details'];

const isPositiveModalOpen = ref(false);
const isNegativeModalOpen = ref(false);

const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};
const negativeModalText = ref({
    title: 'Reject Vehicle',
    description: 'Are you sure you want to reject this vehicle?',
    buttonText: 'Confirm',
    actionName: 'Reject Product',
    userId: userId.value,
});

const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};

const positiveModalText = ref({
    title: 'Approve Vehicle',
    description: 'Are you sure you want to approve this vehicle?',
    buttonText: 'Confirm',
    actionName: 'Approve Product',
    userId: userId.value,
    car: {},
});

const optionPrompt = ({ menuItem, car }) => {
    const option = menuItem;
    if (option === 'View Details') {
        //navigate to view order page
        // orderState.pickedOrder = order;
        router.push(`/admin/product/vehicle-details/${car.id}`);
    }

    if (option === 'Approve') {
        positiveModalText.value.car = car;
        togglePositiveModal();
        return;
    }

    if (option === 'Deactivate') {
        negativeModalText.value.car = car;
        toggleNegativeModal();
        return;
    }

    if (option === 'Edit') {
        // positiveModalText.value = {
        //     title: 'Approve Vehicle',
        //     description: 'Are you sure you want to approve this vehicle?',
        //     buttonText: 'Confirm',
        //     car: car,
        // };
        // togglePositiveModal();
        // return;
        router.push(`/admin/product/edit/${car.id}`);
    }
};

watch(
    () => state.searchParams.pageNumber,
    () => {
        getAllProducts();
    }
);

// watch(
//     () => state.searchParams.orderType,
//     () => {
//         getAllProducts();
//     }
// );

watch(
    () => state.searchParams.pageSize,
    () => {
        getAllProducts();
    }
);

watchDebounced(
    () => state.searchParams.searchText,
    () => {
        getAllProducts();
    },
    { debounce: 1000, maxWait: 1000 }
);
provide('menuOptions', menuOptions);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('searchParams', state.searchParams);
provide('refetch', getAllProducts);
provide('state', state);
</script>

<style lang="scss" scoped>
.overflowVisible {
    overflow: visible;
}
</style>
