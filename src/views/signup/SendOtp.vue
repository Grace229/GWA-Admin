<template>
    <div class="max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
        <OTPVerificationSvg />

        <h3 class="mt-3 text-[24px] font-semibold text-gray-900">OTP Verification</h3>

        <div class="max-w-[350px]">
            <p class="text-gray-600 text-base font-[300] text-center leading-[24px]">
                We have sent an OTP to your registered mobile number <span class="font-medium">{{ decryptData(vendorPhoneNumber) }}</span>
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
                            isInvalid ? 'outline-error border-error mr-2' : 'border-[#D0D5DD] mr-2',
                            isInvalid ? 'outline-error border-error mr-2' : 'border-[#D0D5DD] mr-2',
                            isInvalid ? 'outline-error border-error mr-2' : 'border-[#D0D5DD] mr-2',
                            isInvalid ? 'outline-error border-error mr-2' : 'border-[#D0D5DD] mr-2',
                            isInvalid ? 'outline-error border-error mr-2' : 'border-[#D0D5DD] mr-2',
                            isInvalid ? 'outline-error border-error ' : 'border-[#D0D5DD] ',
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

                <div v-if="submitLoading" class="h-4 w-4 ml-4 rounded-md block">
                    <div class="roundLoader opacity-50 mx-auto"></div>
                </div>
            </button>
        </form>
        <p class="my-4 text-[#475467] font-normal text-sm">Resend OTP in <span class="font-semibold">1:29</span></p>
        <div @click="$router.push('/vendor-signup/create')" class="cursor-pointer flex items-center gap-2">
            <div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.8337 9.99984H4.16699M4.16699 9.99984L10.0003 15.8332M4.16699 9.99984L10.0003 4.1665"
                        stroke="#475467"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <p class="font-semibold text-sm text-gray-600">Back</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, inject, ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import OTPVerificationSvg from '/src/assets/svg/OTPVerificationSvg.vue';
import VOtpInput from 'vue3-otp-input';
import { useStore } from 'vuex';
import { Log, Util } from '/src/util';
import { validateOtpSMS } from '/src/services/OnboardingServices.js';
import { decryptData } from '@/services/CryptService';

onMounted(() => {
    step.value = 3;
});

const store = useStore();
const step = inject('step');
const router = useRouter();
const submitLoading = ref(false);
const isInvalid = ref(false);
const otpInput = ref(null);
const form = reactive({
    pin: '',
});
const pin = ref('');
const handleOnComplete = (value) => {
    form.pin = value;
};

const vendorPhoneNumber = computed(() => store.state.vendorSignupDetails.phoneCode + store.state.vendorSignupDetails.phoneNumber);

const handleOnChange = (value) => {
    form.pin = value;
};

const handleNext = () => {
    router.push('/vendor-signup/verify-email');
};

const otpValidation = async () => {
    submitLoading.value = true;

    validateOtpSMS(
        {
            code: form.pin,
            destination: decryptData(vendorPhoneNumber.value),
        },
        (res) => {
            submitLoading.value = false;
            handleNext();
            Util.handleGlobalAlert(true, 'success', response.data.message);
        },
        (err) => {
            submitLoading.value = false;
            handleNext();
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};
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
