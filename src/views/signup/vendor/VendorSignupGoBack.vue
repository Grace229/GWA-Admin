<template>
    <div class="max-w-max">
        <GoBack @click="goBack" />
        <!-- {{ step }} -->
    </div>
</template>

<script setup>
import GoBack from '@/components/reusable/GoBack.vue';
import { useRouter, useRoute } from 'vue-router';
import { computed, inject } from 'vue';
const step = inject('step');
const router = useRouter();
const route = useRoute();
const routeParamStep = computed(() => route.params.step);

const goBack = () => {
    // console.log(routeParamStep.value);
    if (routeParamStep.value === 'verify-email' || step.value === 2) {
        router.push('/vendor-signup/provide-contacts');
    }
    if (routeParamStep.value === 'provide-phone-number' || step.value === 3) {
        router.push('/vendor-signup/provide-contacts');
    }
    if (routeParamStep.value === 'send-otp' || step.value === 4) {
        router.push('/vendor-signup/provide-phone-number');
    }
    if (routeParamStep.value === 'create' || step.value === 5) {
        router.push('/vendor-signup/provide-phone-number');
    }
    if (routeParamStep.value === 'terms-and-conditions' || step.value === 6) {
        router.push('/vendor-signup/create');
    }
};

// <ProvideEmail v-if="$route.params.step === 'provide-contacts'" />
//             <VerifyVendorEmail v-if="$route.params.step === 'verify-email'" />
//             <ProvidePhoneNo v-if="$route.params.step === 'provide-phone-number'" />
//             <SendOtp v-if="$route.params.step === 'send-otp'" />
//             <CreateVendorAccount v-if="$route.params.step === 'create'" />
//             <VendorAgreement v-if="$route.params.step === 'terms-and-conditions'" />
</script>

<style lang="scss" scoped></style>
