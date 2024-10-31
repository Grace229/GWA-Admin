<template>
    <div>
        <div class="mb-[72px] mt-[40px]">
            <Logo class="logoClass" />
        </div>
        <div v-if="!isEmailSent" class="vendorDignupContainer max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
            <OTPVerificationSvg />

            <h3 class="mt-3 text-[24px] font-semibold text-gray-900">OneToken Verification</h3>
            <div class="max-w-[400px]">
                <p class="text-gray-600 text-base font-[300] text-center leading-[24px]">
                    Please enter OneToken to verify your login details 
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
                            input-type="number"
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
                            autocomplete="off"
                        />
                    </div>
                </div>

                <button
                    :class="[submitLoading || form.pin.length < 6 ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center']"
                    :disabled="submitLoading || form.pin.length < 6"
                    type="submit"
                    class="w-full max-w-[350px] mx-auto brandButton rounded-[8px]"
                >
                    Verify OneToken

                    <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
                </button>
            </form>

            <!-- <button :disabled="resendOTPLoading" @click="sendSMS" class="flex items-center justify-center cursor-pointer my-4 text-[#475467] font-normal text-sm">
                Didn’t receive OTP? Click to Resend

                <SpinnerLoader v-if="resendOTPLoading" class="ml-2 h-[14px] w-[14px]" />
            </button>

            <GoBack class="" @click="$emit('goBack')" text="Back" /> -->
        </div>
        <EmailSent @done="reload()" v-else />

    </div>
</template>

<script setup>
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
import Logo from '/src/components/reusable/SterlingLogo.vue';
import GoBack from '@/components/reusable/GoBack.vue';
import { onMounted, defineProps, inject, ref, computed, reactive, provide } from 'vue';
import { useRouter } from 'vue-router';
// import Timer from '@/views/admin/adminViews/reusable/Timer.vue';
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';

import OTPVerificationSvg from '/src/assets/svg/OTPVerificationSvg.vue';
import VOtpInput from 'vue3-otp-input';
import { useStore } from 'vuex';
import { Log, Util } from '/src/util';
import { validateAdminOtp, sendAdminOtpSMS } from '@/services/AdminServices.js';
import { handleSuccessfulLogin, forgotPassword } from '/src/services/OnboardingServices.js';
import { decryptData, encryptData } from '@/services/CryptService.js';
import EmailSent from '/src/views/login/confirmation/EmailSent.vue';

onMounted(() => {
    // console.log(store.state.vendorSignupDetails);
    // sendSMS();
});

const store = useStore();
// const startTimerFlag = ref(false);
const props = defineProps({
    loginData: {
        type: Object,
        default: null,
    },
    navigateTo: {
        type: String,
        default: '/admin/dashboard',
    },
});
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
const reload = () =>{
    window.location.reload()
}
const isEmailSent = ref(false);


const vendorPhoneNumberWithPhoneCode = computed(() => props.loginData.phoneCode + String(Number(store.state.vendorSignupDetails.phoneNumber)));
// const vendorPhoneNumber = computed(() => store.state.vendorSignupDetails.phoneNumber);

const handleOnChange = (value) => {
    form.pin = value;
};

const toggleConfirmation = () => {
    isEmailSent.value = !isEmailSent.value;
};

// const handleNext = () => {
//     router.push('/vendor-signup/create');
// };
const email = store.getters['authToken/email']
const otpValidation = async () => {
    const isDefaultPassword = props.loginData.isDefaultPassword;
    submitLoading.value = true;

    validateAdminOtp(
        {
            token: form.pin,
            username: email,
            userId: props.loginData.userId 
        },

        (res) => {
            if(isDefaultPassword){
                forgotPassword(
        { email: encryptData(email) },
        (res) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Mail Sent');

            toggleConfirmation();
        },
        (err) => {
            submitLoading.value = false;
            if (err.response?.data?.message) {
                Util.handleGlobalAlert(true, 'failed', err.response.data.message);
            }
        }
    );
            }else{
            submitLoading.value = false;
            const data = res.data.data;
            const dataForLogin = {
                ...props.loginData,
                jwToken: data.jwtoken,
                refreshToken: data.refreshToken,
            };
            handleSuccessfulLogin(dataForLogin);
            Util.handleGlobalAlert(true, 'success', 'Welcome');
            // router.push(props.navigateTo);
            router.push('/admin/dashboard');
        }
        },
        (err) => {
            console.log(err)
            submitLoading.value = false;

            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const sendSMS = () => {
    resendOTPLoading.value = true;
    sendAdminOtpSMS(
        {
            phoneNumber: decryptData(props.loginData.phoneNumber),
        },
        (res) => {
            resendOTPLoading.value = false;

            Util.handleGlobalAlert(true, 'success', res.data.message);
        },
        (err) => {
            resendOTPLoading.value = false;
        }
    );
};
// provide('startTimerFlag', startTimerFlag);
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
