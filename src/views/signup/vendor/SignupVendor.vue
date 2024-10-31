<template>
    <div class="flex-1 bg-[#ffffff]">
        <div class="md:px-[50px] lg:px-[100px] xl:px-[161px] md:py-[161px] py-[80px] w-full">
            <ProvideEmail v-if="$route.params.step === 'provide-contacts'" />
            <VerifyVendorEmail v-else-if="$route.params.step === 'verify-email'" />
            <ProvidePhoneNo v-else-if="$route.params.step === 'provide-phone-number'" />
            <SendOtp v-else-if="$route.params.step === 'send-otp'" />
            <CreateVendorAccount v-else-if="$route.params.step === 'create'" />
            <VendorAgreement v-else-if="$route.params.step === 'terms-and-conditions'" />
            <NotFoundRouter v-else />
        </div>
    </div>
</template>

<script setup>
import ProvideEmail from '/src/views/signup/vendor/ProvideEmail.vue';
import VendorAgreement from '/src/views/signup/vendor/VendorAgreement.vue';
import ProvidePhoneNo from '@/views/signup/vendor/ProvidePhoneNo.vue';
import NotFoundRouter from '@/components/reusable/NotFoundRouter.vue';
// import VendorChoosePassword from '/src/views/signup/VendorChoosePassword.vue';
import SendOtp from '/src/views/signup/vendor/VendorSendOTP.vue';
import VerifyVendorEmail from '/src/views/signup/vendor/VerifyVendorEmail.vue';
import CreateVendorAccount from '/src/views/signup/vendor/CreateVendorAccount.vue';
// import { inject } from 'vue';
// const signupDetails = ref({})

// provide('signupDetails', signupDetails.value)
</script>

<style lang="scss" scoped></style>
