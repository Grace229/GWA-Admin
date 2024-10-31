<template>
    <div class="max-w-[470px] xl:ml-8 flex flex-col gap-3 items-center">
        <EmailSentSvg />

        <h3 class="mt-6 text-[24px] font-semibold text-gray-900">Verify Email</h3>

        <div class="max-w-[350px]">
            <p class="text-gray-600 text-base font-[300] text-center">
                A verification email has been sent to your registered email address <span class="font-medium">{{ email }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, inject, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Util } from '/src/util';
import EmailSentSvg from '/src/assets/svg/EmailSentSvg.vue';
import { resendEmailVerificationLink } from '/src/services/OnboardingServices.js';

onMounted(() => {
    step.value = 4;
    otpValidation();
});
const store = useStore();
const route = useRoute();

const step = inject('step');
const email = computed(() => store.state.vendorSignupDetails.email);
const loading = ref(false);
const otpValidation = async () => {
    loading.value = true;
    const vendorEmail = '';
    //check if there is an email in the url from confirm email redirect
    if (route.query?.email?.length) {
        vendorEmail = route.query.email;
    }

    resendEmailVerificationLink(
        {
            email: vendorEmail,
        },
        (res) => {
            loading.value = false;

            Util.handleGlobalAlert(true, 'success', response.data.message);
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};
</script>

<style lang="scss" scoped></style>
