<template>
    <div>Loading...</div>
</template>

<script setup>
import { vendorConfirmEmail } from '/src/services/OnboardingServices.js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Util, Log } from '/src/util';
onMounted(() => {
    // console.log(route.query);
    confirmEmail();
});
const route = useRoute();
const router = useRouter();
const loading = ref(false);

const email = route.query.email;
const code = route.query.code;

const confirmEmail = async () => {
    loading.value = true;

    vendorConfirmEmail(
        {
            email: email,
            code: code,
        },
        (res) => {
            loading.value = false;
            router.push(`/vendor-signup/choose-password?email=${email}`);
            Util.handleGlobalAlert(true, 'success', response.data.message);
        },
        (err) => {
            loading.value = true;
            // router.push(`/vendor-signup/verify-email?email=${email}`);
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};
</script>

<style lang="scss" scoped></style>
