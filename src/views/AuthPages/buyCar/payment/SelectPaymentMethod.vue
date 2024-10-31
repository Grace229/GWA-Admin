<template>
    <!-- <MainPlateSkeleton /> -->
    <div>
        <SelectedCarCardSkeleton v-if="loadingCarData" />
        <SelectedCarCard v-else />
        <div class="mt-[30px]"><h3 class="text-[#344054] text-sm font-semibold">Select your payment method</h3></div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-4 mt-[24px]">
            <div @click="pickedMethod = method.name" v-for="method in paymentMethods" :key="method.name" class="">
                <div v-if="method.name !== null" :class="method.name !== null ? 'mb-4' : ''" class="p-4 flex gap-[19px] bg-[#ffffff] border border-[#EAECF0] rounded-lg">
                    <div>
                        <img :src="method.logo" alt="" />
                    </div>
                    <div v-if="method === 'Sterling'">
                        <p class="text-xs font-semibold text-[#404968]">{{ method.text }}</p>
                    </div>
                    <div>
                        <p class="text-[#404968] text-sm font-medium">{{ method.text }}</p>
                        <p class="text-[10px] font-normal text-[#7D89B0]">{{ method.description }}</p>
                    </div>
                    <Checked class="ml-auto" :checked="pickedMethod === method.name" />
                </div>
            </div>
        </div>

        <UpfrontPaymentInputs v-if="pickedMethod === 'Sterling'" />

        <ProceedBankDetails v-if="pickedMethod === 'Bank'" class="mt-[13px]" />
    </div>
</template>

<script setup>
import SelectedCarCardSkeleton from '@/components/reusable/SelectedCarCardSkeleton.vue';
// import MainPlateSkeleton from '@/components/reusable/MainPlateSkeleton.vue';
import Checked from '/src/assets/svg/PaymentMethodChecked.vue';
import { ref, inject } from 'vue';
import UpfrontPaymentInputs from '@/views/AuthPages/buyCar/payment/UpfrontPaymentInputs.vue';
import ProceedBankDetails from '/src/views/AuthPages/buyCar/payment/ProceedBankDetails.vue';
import SelectedCarCard from '/src/components/reusable/SelectedCarCard.vue';
// const flutterKey = import.meta.env.VITE_FLUTTER_KEY
const pickedMethod = inject('pickedMethod');
const state = inject('state');
const loadingCarData = inject('loadingCarData');
const paymentMethods = [
    {
        name: 'Sterling',
        text: 'Sterling Alternative Finance',
        description: '',
        logo: '/sterlingPayment.svg',
    },
    {
        name: null,
        text: null,
        description: null,
        logo: null,
    },
    {
        name: 'Card',
        text: 'Pay with Card',
        description: 'Mastercard, Visa or Verve',
        logo: '/PaymentMethodIcon.png',
    },
    {
        name: 'Bank',
        text: 'Bank Transfer',
        description: 'Pay with bank transfer',
        logo: '/BankPaymentMethod.svg',
    },
];
</script>

<style lang="scss" scoped></style>
