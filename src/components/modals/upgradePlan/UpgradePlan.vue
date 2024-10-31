<template>
    <TransitionRoot class="fixed inset-0 z-[10000] overflow-y-auto" as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel v-if="!upgradePlan" class="relative transform overflow-hidden rounded-lg bg-white px-4 py-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[343px]">
                            <div>
                                <div class="mb-5">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold text-[#101828]">Upgrade your plan</DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-[#475467] font-normal">Upgrade to premium plan for a one time fee and get access to the following benefits</p>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-4">
                                    <div v-for="incentive in incentives" :key="incentive" class="flex items-start gap-[14px]">
                                        <div class="">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                                                    stroke="#039855"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <span class="font-medium text-base text-[#344054]">{{ incentive }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 flex flex-col gap-3 mb-[14px]">
                                <button type="button" @click="makeFlutterPayment" class="brandButton rounded-lg w-full py-[10px] font-semi-bold text-[14px]">Upgrade plan</button>
                                <button class="cancelButton py-[10px] font-semi-bold text-[14px]" @click="toggleModal">Cancel</button>
                            </div>
                        </DialogPanel>

                        <DialogPanel v-else class="relative transform overflow-hidden rounded-lg bg-white py-[21px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[400px]">
                            <div>
                                <div class="mb-5 px-[25px] pb-[21px] border-b border-[#F1F1F1] flex items-center justify-between">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold text-[#18273A]">Payment Method</DialogTitle>
                                    <div>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.78558 8.99935L1.12568 3.33945C0.514096 2.72786 0.514096 1.73629 1.12568 1.1247C1.73727 0.513119 2.72884 0.513119 3.34042 1.1247L9.00033 6.78461L14.6602 1.1247C15.2718 0.513119 16.2634 0.513119 16.875 1.1247C17.4866 1.73629 17.4866 2.72786 16.875 3.33945L11.2151 8.99935L16.875 14.6593C17.4866 15.2708 17.4866 16.2624 16.875 16.874C16.2634 17.4856 15.2718 17.4856 14.6602 16.874L9.00033 11.2141L3.34042 16.874C2.72884 17.4856 1.73727 17.4856 1.12568 16.874C0.514096 16.2624 0.514096 15.2708 1.12568 14.6593L6.78558 8.99935Z"
                                                fill="#1C324F"
                                                fill-opacity="0.38"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-[30px] flex flex-col gap-3 mb-[14px] px-[25px]">
                                <div class="grid grid-cols-2 gap-6">
                                    <div
                                        @click="paymentType = option.name"
                                        v-for="option in paymentOptions"
                                        :key="option.name"
                                        :class="option.name === paymentType ? 'active' : 'inactive'"
                                        class="cursor-pointer col-span-1 flex items-center justify-center py-[9px] px-[20px] rounded-[4px] font-medium text-xs"
                                    >
                                        <img :src="option.icon" class="z-[99] h-full mr-2" />
                                        {{ option.name }}
                                    </div>

                                    <PayWithCard v-if="paymentType === 'Pay with card'" />
                                    <PayWithAccount v-if="paymentType === 'Pay with Account'" />
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import PayWithCard from '/src/components/modals/upgradePlan/PayWithCard.vue';
import PayWithAccount from '/src/components/modals/upgradePlan/PayWithAccount.vue';
import { makePayment } from '@/plugins/flutterwave';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();
const flutterKey = import.meta.env.VITE_FLUTTER_KEY;
const open = inject('open');
const toggleModal = inject('toggleModal');
const userId = computed(() => store.getters['authToken/userId']);
const paymentType = ref('Pay with card');
const email = computed(() => store.getters['authToken/email']);
const name = computed(() => store.getters['authToken/fullName']);

const paymentOptions = [
    {
        name: 'Pay with card',
        icon: '/src/assets/svg/credit-card-02.svg',
    },
    {
        name: 'Pay with Account',
        icon: '/src/assets/svg/building-08.svg',
    },
];
const close = () => {
    toggleModal();
    upgradePlan.value = false;
};
const upgradePlan = ref(false);
const toggleUpgradePlan = () => {
    upgradePlan.value = !upgradePlan.value;
};
const generateReference = () => {
    let date = new Date();
    return 'Web' + date.getTime().toString();
};
function makeFlutterPayment() {
    // const carId =
    makePayment({
        public_key: flutterKey,
        tx_ref: generateReference(),
        amount: 1500,
        currency: 'NGN',
        payment_options: paymentType.value === 'Pay with card' ? 'card' : 'banktransfer',
        // redirect_url: `/buy_car/${state.data.id}/1`,
        meta: {
            consumer_id: userId.value,
            consumer_mac: userId.value,
        },
        customer: {
            email: email.value,
            phone_number: phoneNo.value,
            name: name.value,
        },
        customizations: {
            title: 'AltDrive',
            description: 'Car Payment',
            logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
        },
        callback: (response) => {
            makePaymentCallback(response);
        },
        onclose: closedPaymentModal(),
    });
}

const makePaymentCallback = (response) => {
    store.commit('marketPlace/upgradeResponse', response);
    router.push(`/settings/profile`);
};

const closedPaymentModal = () => {
    router.push(`/settings/profile`);
};

const incentives = ['Access us to 10 Carfax detailed report on any vehicle', 'Dedicated Account Manager', 'Vehicle drop-off at desired location'];
</script>

<style lang="scss" scoped>
.active {
    background: #eaecf0;
    /* Gray/200 */

    border: 1px solid #eaecf0;
    /* Gray cool / 400 */
    color: #344054;
}
.inactive {
    /* Base/White */

    background: #ffffff;
    /* Gray/200 */

    border: 1px solid #eaecf0;
    /* Gray/100 */
    color: #667085;
}
</style>
