<template>
    <div class="vendorDignupContainer max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
        <EmailSentSvg />

        <h3 class="mt-6 text-[24px] font-semibold text-gray-900">Verify Email</h3>

        <div class="max-w-[350px]">
            <p class="text-gray-600 text-base font-[300] text-center">
                A verification email has been sent to your registered email address <span class="font-medium">{{ email }}</span>
            </p>
        </div>

        <form class="w-full flex flex-col items-center mt-2" @submit.prevent="otpValidation">
            <div class="mb-[30px]">
                <div class="flex justify-center gap-x-2 items-center otp_container">
                    <v-otp-input
                        ref="otpInput"
                        input-classes="w-10  md:w-[45px] h-10 md:h-[45px] otpInput lg:w-[64px]  text-base md:text-xl text-center !px-1 md:px-3 py-2 text-[#3A3745] border  rounded-lg leading-tight focus:outline-none focus:bg-white placeholder:text-[#D0D5DD] focus:ring-0 focus:border-gray-400"
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
                Verify Email
                <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
            </button>
        </form>
        <p v-if="startTimerFlag" class="flex items-center justify-center my-4 text-[#475467] font-normal text-sm">
            Resend OTP in
            <span class="ml-2"> <Timer /></span>
        </p>

        <button v-else :disabled="loading" @click="sendEmailOtp" class="flex items-center justify-center cursor-pointer my-4 text-[#475467] font-normal text-sm">
            Resend OTP

            <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
        </button>

        <VendorSignupGoBack />

        <!-- <p @click="sendEmailOtp" class="cursor-pointer my-4 text-[#475467] font-normal text-sm">Resend OTP in <span class="font-semibold">1:29</span></p> -->
    </div>
</template>

<script setup>
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';

import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
import Timer from '@/views/admin/adminViews/reusable/Timer.vue';

import { onMounted, inject, computed, reactive, ref, provide } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { Log, Util } from '/src/util';
import EmailSentSvg from '/src/assets/svg/EmailSentSvg.vue';
import { sendOtpEmail, validateOtp } from '/src/services/OnboardingServices.js';
import VOtpInput from 'vue3-otp-input';
onMounted(() => {
    step.value = 2;
    //check if there is an email and redirect if there is none

    // console.log('emailValue:' + email.value);
    if (email.value === null || email.value === undefined || email.value.length < 5) {
        console.log('emailPage');
        router.push('/vendor-signup/provide-contacts');
        return;
    }

    sendEmailOtp();
});
const store = useStore();
const startTimerFlag = ref(false);
const route = useRoute();
const router = useRouter();
const step = inject('step');
const email = computed(() => store.state.vendorSignupDetails.email);
const submitLoading = ref(false);
// const sendLoading = ref(false);
const isInvalid = ref(false);
const otpInput = ref(null);
const form = reactive({
    pin: '',
});
const loading = ref(false);

const handleOnChange = (value) => {
    form.pin = value;
};

const handleOnComplete = (value) => {
    form.pin = value;
};

const handleNext = () => {
    step.value += 1;
    router.push('/vendor-signup/provide-phone-number');
};

const sendEmailOtp = async () => {
    loading.value = true;

    sendOtpEmail(
        {
            email: email.value,
        },
        (res) => {
            loading.value = false;
            startTimerFlag.value = true;

            Util.handleGlobalAlert(true, 'success', 'OTP Sent');
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const otpValidation = async () => {
    submitLoading.value = true;

    validateOtp(
        {
            code: form.pin,
            destination: email.value,
        },
        (res) => {
            submitLoading.value = false;
            handleNext();
            Util.handleGlobalAlert(true, 'success', res.data.message);
        },
        (err) => {
            submitLoading.value = false;

            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

provide('startTimerFlag', startTimerFlag);
</script>

<style lang="scss" scoped></style>
