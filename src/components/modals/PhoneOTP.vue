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
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 py-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[450px]">
                            <div>
                                <div class="mb-5">
                                    <!-- <DialogTitle as="h3" class="text-[18px] font-semibold text-[#101828]">Upgrade your plan</DialogTitle> -->
                                    <div class="w-full flex flex-col gap-3 items-center">
                                        <OTPVerificationSvg />

                                        <h3 class="mt-3 text-[24px] font-semibold text-gray-900">OTP Verification</h3>

                                        <div class="max-w-[350px]">
                                            <p class="text-gray-600 text-base font-[300] text-center leading-[24px]">
                                                We have sent an OTP to your registered mobile number <span class="font-medium">+2349045074451</span>
                                            </p>
                                        </div>
                                        <form class="w-full flex flex-col items-center mt-2" @submit.prevent="$emit('sendOtp', form.pin)">
                                            <div class="mb-[30px]">
                                                <div class="flex justify-center gap-x-2 items-center otp_container">
                                                    <v-otp-input
                                                        ref="otpInput"
                                                        input-classes="w-10 md:w-[45px] h-10 md:h-[45px] otpInput lg:w-[64px]  text-base md:text-xl text-center !px-1 md:px-3 py-2 text-[#3A3745] border  rounded-lg leading-tight focus:outline-none focus:bg-white placeholder:text-[#D0D5DD] focus:ring-0 focus:border-gray-400"
                                                        separator=""
                                                        :num-inputs="6"
                                                        :should-auto-focus="true"
                                                        :is-input-num="true"
                                                        input-type="password"
                                                        :conditionalClass="[
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                            isInvalid ? 'outline-error border-error' : 'border-[#D0D5DD]',
                                                        ]"
                                                        :placeholder="['0', '0', '0', '0', '0', '0']"
                                                        @on-change="handleOnChange"
                                                        @on-complete="handleOnComplete"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                :class="[paymentLoading || form.pin.length < 6 ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center']"
                                                :disabled="paymentLoading || form.pin.length < 6"
                                                type="submit"
                                                class="w-full max-w-[350px] mx-auto brandButton rounded-[8px]"
                                            >
                                                Verify OTP

                                                <div v-if="paymentLoading" class="h-4 w-4 ml-4 rounded-md block">
                                                    <div class="roundLoader opacity-50 mx-auto"></div>
                                                </div>
                                            </button>
                                        </form>
                                        <p class="my-4 text-[#475467] font-normal text-sm">Resend OTP in <span class="font-semibold">1:29</span></p>
                                    </div>
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
import { ref, inject, reactive } from 'vue';
import OTPVerificationSvg from '/src/assets/svg/OTPVerificationSvg.vue';
import VOtpInput from 'vue3-otp-input';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
// import { Log, Util } from '/src/util';
// import { validateOtpSMS } from '/src/services/OnboardingServices.js';

const open = inject('openOtp');
const toggleOTPModal = inject('toggleOTPModal');
const paymentLoading = inject('paymentLoading');
const isInvalid = ref(false);
const otpInput = ref(null);
const form = reactive({
    pin: '',
});

const handleOnComplete = (value) => {
    form.pin = value;
};

const handleOnChange = (value) => {
    form.pin = value;
};

const close = () => {
    toggleOTPModal();
};

//
</script>

<style lang="scss" scoped>
.otp_container div {
    -moz-column-gap: 0.25rem;
    column-gap: 0.25rem;
}

input [type='password'] {
    height: 64px;
    color: #101828;
    font-weight: 400;
    font-size: 14px;
}
</style>
