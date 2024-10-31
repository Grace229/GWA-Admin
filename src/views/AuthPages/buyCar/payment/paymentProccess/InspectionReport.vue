<template>
    <div class="w-full">
        <div class="mx-auto w-full" v-if="(reportDocument === null && documentLoading) || orderLoading">
            <SpinnerLoader class="mx-auto my-[120px] h-[60px] w-[60px]" />
        </div>
        <!-- <div v-else-if="reportDocument === null && !documentLoading" class="py-[120px] mx-auto w-full bg-white flex flex-col items-center justify-center">
            
            <span style="color: #999999" class="mt-6 fs-16 fw-400 text-center">Nothing to see yet. Try again later</span>
        </div> -->
        <div v-else class="flex flex-col gap-[10px]">
            <div class="border pt-6 border-[#F2F4F7] rounded-[8px] bg-[#D0D5DD] w-full h-[592px]">
                <div class="mx-auto h-full w-full ovrflow-auto">
                    <!-- <img src="/src/assets/images/DummyReport.png" alt="" /> -->

                    <iframe class="h-full w-full" :src="reportDocument" frameborder="0"></iframe>
                </div>
            </div>
            <!-- {{ Constants.inspectionReportStatusEnum[orderResponse?.inspectionReportStatus] }} -->
            <div v-if="Constants.inspectionReportStatusEnum[orderResponse?.inspectionReportStatus] == 'Pending'" class="flex flex-col">
                <div class="flex gap-3 mt-5 items-center">
                    <input class="border-gray-300 rounded-[4px] focus:outline-none focus:ring-0" type="checkbox" v-model="agree" />
                    <p class="font-normal text-sm text-[#404968]">I have read the vehicle inspection report</p>
                </div>

                <div class="mt-[26px] flex gap-6 mb-[14px]">
                    <button @click="rejectReport" class="cancelButton flex items-center justify-center max-w-max font-semibold text-[14px] h-[40px] rounded px-8">
                        Reject Terms <SpinnerLoader v-if="disapprovalLoading" class="ml-2 h-[14px] w-[14px]" />
                    </button>

                    <button @click="approveReport" :class="!agree ? 'opacity-25' : 'opacity-100'" :disabled="!agree" class="max-w-max flex items-center justify-center h-[40px] rounded brandButton">
                        Approve Report <SpinnerLoader v-if="approvalLoading" class="ml-2 h-[14px] w-[14px]" />
                    </button>
                </div>
            </div>
        </div>

        <!-- {{ reportDocument }} -->
    </div>
</template>

<script setup>
// import Vue3Html2pdf from 'vue3-html2pdf';
import { updateInspectionreport } from '@/services/CheckoutServices.js';
import { ref, inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Log, Util, Constants } from '@/util';
import { getOrderDocument } from '@/services/OrderServices.js';
import { getOrderDetails } from '@/services/OrderServices.js';

onMounted(() => {
    fetchOrderDetails();
    getDocument();
});

const agree = ref(false);
const orderResponse = ref(null);
const orderLoading = ref(false);
const fileName = ref('fileName.png');
const nextStep = inject('nextStep');
const route = useRoute();
const router = useRouter();
const approvalLoading = ref(false);
const disapprovalLoading = ref(false);
const documentLoading = ref(false);
const id = route.params.id;
const reportDocument = ref(null);
const goNext = () => {
    nextStep();
};

const getDocument = () => {
    documentLoading.value = true;
    getOrderDocument(
        {
            orderId: id,
            documentType: 3,
        },
        (res) => {
            documentLoading.value = false;
            const data = res.data.data;
            // reportDocument.value = res.data.data;

            const objectWithDocumentType3 = data.find((item) => item.documentType === 3);

            if (objectWithDocumentType3) {
                const url = objectWithDocumentType3.url;
                reportDocument.value = url;
            }
        },
        (err) => {
            documentLoading.value = false;
        }
    );
};

const fetchOrderDetails = () => {
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

const approveReport = () => {
    //enum 1 == approve
    approvalLoading.value = true;
    updateInspectionreport(
        {
            id: id,
            inspectionReportStatus: 1,
        },
        (res) => {
            approvalLoading.value = false;

            Util.handleGlobalAlert(true, 'success', 'Successfully Approved Report');

            goNext();
        },
        (err) => {
            approvalLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

const rejectReport = () => {
    //enum 2 == reject
    disapprovalLoading.value = true;
    updateInspectionreport(
        {
            id: id,
            inspectionReportStatus: 2,
        },
        (res) => {
            disapprovalLoading.value = false;

            Util.handleGlobalAlert(true, 'success', 'Successfully Rejected Report');

            router.push('/settings/car-financing/auto-loan');
        },
        (err) => {
            disapprovalLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

// function onProgress(event) {
//     console.log(`Processed: ${event} / 100`);
// }
// function hasGenerated() {
//     alert('PDF generated successfully!');
// }
// function generatePDF() {
//     html2Pdf.value.generatePdf();
// }
</script>

<style lang="scss" scoped></style>
