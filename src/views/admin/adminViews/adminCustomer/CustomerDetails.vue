<template>
    <div>
        <GoBack class="mb-[30px]" @click="$router.push('/admin/customers/customers-list')" text="Back to Customers" />

        <AdminDetailsPlate header="Customer Details">
            <template v-slot:body>
                <!-- Body -->

                <div v-if="!customer.hasOwnProperty('id')">
                    <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                </div>

                <CustomerProfileInputs v-else />
            </template>
        </AdminDetailsPlate>
    </div>
</template>

<script setup>
import GoBack from '@/components/reusable/GoBack.vue';
import CustomerProfileInputs from './CustomerProfileInputs.vue';
import AdminDetailsPlate from '@/components/reusable/AdminDetailsPlate.vue';
import { onMounted, ref, computed, provide } from 'vue';
import { useRoute } from 'vue-router';
// import { useStore } from 'vuex';
import { Log } from '@/util';
import { getCustomer } from '@/services/AdminServices.js';
onMounted(() => {
    getCustomerDetails();
});

const customer = ref({});

// const store = useStore();
const route = useRoute();
const loading = ref(false);
const routeId = computed(() => route.params.id);
// const userId = computed(() => route.params.userId);
const getCustomerDetails = () => {
    loading.value = true;
    getCustomer(
        routeId.value,

        (res) => {
            loading.value = false;
            customer.value = res.data.data;
        },
        (err) => {
            loading.value = false;
        }
    );
};

provide('customer', customer);
</script>

<style lang="scss" scoped></style>
