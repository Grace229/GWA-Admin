<template>
    <div class="vendorDignupContainer max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
        <OTPVerificationSvg />

        <h3 class="mt-3 text-[24px] font-semibold text-gray-900">OTP Verification</h3>

        <div class="max-w-[350px]">
            <p class="text-gray-600 text-base font-[300] text-center leading-[24px]">
                We have sent an OTP to your registered mobile number <span class="font-medium">{{ decryptData(vendorPhoneNumberWithPhoneCode) }}</span>
            </p>
        </div>
        <form class="w-full flex flex-col items-center mt-2" @submit.prevent="otpValidation">
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
                :class="[submitLoading || form.pin.length < 6 ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center']"
                :disabled="submitLoading || form.pin.length < 6"
                type="submit"
                class="w-full max-w-[350px] mx-auto brandButton rounded-[8px]"
            >
                Verify OTP

                <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
            </button>
        </form>

        <p v-if="startTimerFlag" class="flex items-center justify-center my-4 text-[#475467] font-normal text-sm">
            Resend OTP in
            <span class="ml-2"> <Timer /></span>
        </p>

        <button v-else :disabled="resendOTPLoading" @click="sendSMS" class="flex items-center justify-center cursor-pointer my-4 text-[#475467] font-normal text-sm">
            Resend OTP

            <SpinnerLoader v-if="resendOTPLoading" class="ml-2 h-[14px] w-[14px]" />
        </button>

        <VendorSignupGoBack />
    </div>
</template>

<script setup>
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';

import { onMounted, inject, ref, computed, reactive, provide } from 'vue';
import { useRouter } from 'vue-router';
import Timer from '@/views/admin/adminViews/reusable/Timer.vue';
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';

import OTPVerificationSvg from '/src/assets/svg/OTPVerificationSvg.vue';
import VOtpInput from 'vue3-otp-input';
import { useStore } from 'vuex';
import { Log, Util } from '/src/util';
import { validateOtp, sendOtpSMS } from '/src/services/OnboardingServices.js';
import { decryptData } from '@/services/CryptService';

onMounted(() => {
    // console.log(store.state.vendorSignupDetails);
    step.value = 4;

    if (vendorPhoneNumberWithPhoneCode.value === null || vendorPhoneNumberWithPhoneCode.value === undefined || vendorPhoneNumberWithPhoneCode.value.length === 0) {
        // console.log('emailPage');
        router.push('/vendor-signup/provide-phone-number');
        return;
    }
    sendSMS();
});

const store = useStore();
const startTimerFlag = ref(false);
const step = inject('step');
const router = useRouter();
const submitLoading = ref(false);
const resendOTPLoading = ref(false);
const isInvalid = ref(false);
const otpInput = ref(null);
const form = reactive({
    pin: '',
});
const pin = ref('');
const handleOnComplete = (value) => {
    form.pin = value;
};

const vendorPhoneNumberWithPhoneCode = computed(() => store.state.vendorSignupDetails.phoneCode + String(Number(store.state.vendorSignupDetails.phoneNumber)));
// const vendorPhoneNumber = computed(() => store.state.vendorSignupDetails.phoneNumber);

const handleOnChange = (value) => {
    form.pin = value;
};

const handleNext = () => {
    router.push('/vendor-signup/create');
};

const otpValidation = async () => {
    submitLoading.value = true;

    validateOtp(
        {
            code: form.pin,
            destination: decryptData(vendorPhoneNumberWithPhoneCode.value),
        },
        (res) => {
            submitLoading.value = false;
            handleNext();
            Util.handleGlobalAlert(true, 'success', res.data.message);
        },
        (err) => {
            submitLoading.value = false;
            // handleNext();
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const sendSMS = () => {
    resendOTPLoading.value = true;
    sendOtpSMS(
        {
            phoneNumber: vendorPhoneNumberWithPhoneCode.value,
        },
        (res) => {
            resendOTPLoading.value = false;
            startTimerFlag.value = true;
            Util.handleGlobalAlert(true, 'success', res.data.message);
        },
        (err) => {
            resendOTPLoading.value = false;
        }
    );
};
provide('startTimerFlag', startTimerFlag);
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
