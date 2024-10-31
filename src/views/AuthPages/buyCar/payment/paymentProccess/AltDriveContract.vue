<template>
    <div class="w-full">
        <div v-if="(contractLoading && contractResponse === null) || orderLoading" class="w-full flex items-center justify-center py-[100px]"><SpinnerLoader class="h-[80px] w-[80px]" /></div>
        <div v-else-if="!contractLoading && contractResponse === null" class="w-full flex items-center justify-center py-[100px]"><SpinnerLoader class="h-[80px] w-[80px]" /></div>

        <div v-else class="flex flex-col gap-[10px]">
            <AltdriveContractDoc />
            <!-- {{ Constants.contractStatus[orderResponse?.inspectionReportStatus] !== 'Rejected' }} -->
            <div
                v-if="
                    Constants.contractStatus[orderResponse?.contractStatus] !== 'Accepted' &&
                    Constants.contractStatus[orderResponse?.contractStatus] !== 'Rejected' &&
                    Constants.inspectionReportStatusEnum[orderResponse?.inspectionReportStatus] !== 'Rejected'
                "
                class="flex flex-col"
            >
                <div class="flex gap-3 mt-5 items-center">
                    <input id="terms and conditions" name="terms and conditions" class="border-gray-300 rounded-[4px] focus:outline-none focus:ring-0" type="checkbox" v-model="agree" />
                    <label for="terms and conditions" class="cursor-pointer font-normal text-sm text-[#404968]">I agree to the terms and condition of the contract</label>
                </div>

                <div class="mt-[26px] flex gap-6 mb-[14px]">
                    <button @click="rejectContract" class="cancelButton flex items-center justify-center w-[177px] font-semibold text-[14px] h-[40px] rounded">
                        Reject Terms <SpinnerLoader v-if="disapprovalLoading" class="ml-2 h-[14px] w-[14px]" />
                    </button>

                    <button @click="approveContract" :class="!agree ? 'opacity-25' : 'opacity-100'" :disabled="!agree" class="w-[177px] flex items-center justify-center h-[40px] rounded brandButton">
                        Submit<SpinnerLoader v-if="approvalLoading" class="ml-2 h-[14px] w-[14px]" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getOrderDetails } from '@/services/OrderServices.js';
import AltdriveContractDoc from '@/components/reusable/AltdriveContractDoc.vue';
import { ref, inject, onMounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { updateContractStatus, getCheckoutContract } from '@/services/CheckoutServices.js';
import { Log, Util, Constants } from '@/util';
onMounted(() => {
    fetchOrderDetails();
    fetchContract();
});

const agree = ref(false);
const orderResponse = ref(null);
const orderLoading = ref(false);
const contractResponse = ref(null);
const contractLoading = ref(false);
const nextStep = inject('nextStep');
const route = useRoute();
const router = useRouter();
const approvalLoading = ref(false);
const disapprovalLoading = ref(false);
const id = route.params.id;
const goNext = () => {
    nextStep();
};

const fetchContract = () => {
    contractLoading.value = true;

    getCheckoutContract(
        id,
        (res) => {
            contractResponse.value = res.data.data;

            contractLoading.value = false;
        },
        (err) => {
            contractLoading.value = false;
        }
    );
};

const fetchOrderDetails = () => {
    orderLoading.value = true;
    getOrderDetails(
        { orderId: id },
        (res) => {
            orderResponse.value = res.data.data;

            orderLoading.value = false;
        },
        (err) => {
            orderLoading.value = false;
        }
    );
};

const approveContract = () => {
    //enum 1 == approve
    approvalLoading.value = true;
    updateContractStatus(
        {
            id: id,
            contractStatus: 1,
        },
        (res) => {
            approvalLoading.value = false;

            Util.handleGlobalAlert(true, 'success', 'Successfully Approved Contract');

            goNext();
        },
        (err) => {
            approvalLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

const rejectContract = () => {
    //enum 2 == reject
    disapprovalLoading.value = true;
    updateContractStatus(
        {
            id: id,
            contractStatus: 2,
        },
        (res) => {
            disapprovalLoading.value = false;

            Util.handleGlobalAlert(true, 'success', 'Successfully Rejected Contract');

            router.push('/settings/car-financing/purchased-cars');
        },
        (err) => {
            disapprovalLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

provide('contractResponse', contractResponse);
</script>

<style lang="scss" scoped></style>
