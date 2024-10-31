<template>
    <div class="mx-6 max-w-[500px] w-full my-[40px]">
        <div class="mb-[72px]">
            <Logo class="logoClass" />
        </div>

        <div v-if="!isEmailSent" class="lg:max-w-[470px] xl:ml-8">
            <GoBack @click="goBack" class="mb-[50px]" text="Back" />

            <div class="grid grid-cols-1 gap-2">
                <div class="text-3xl font-semibold text-gray-900">Forgot Password</div>
                <p class="mb-[32px] font-normal text-base text-gray-600">
                    Don’t worry, resetting your password is easy. Enter your email address and we’ll send you a link to your inbox to reset your password.
                </p>
                <form @submit.prevent="sendEmailAddress">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="col-span-1">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autocomplete="off"
                                    v-model="v$.email.$model"
                                    :class="{
                                        errorBorder: v$.email?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="email-description"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.email.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        :class="[submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center gap-4']"
                        :disabled="submitLoading || v$.$invalid"
                        type="submit"
                        class="w-full brandButton mt-[40px]"
                    >
                        Continue
                        <div v-if="submitLoading" class="h-4 w-4 ml-4 rounded-md block">
                            <div class="roundLoader opacity-50 mx-auto"></div>
                        </div>
                    </button>
                </form>
            </div>
        </div>
        <EmailSent @done="$router.push('login')" v-else />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Log, Util } from '/src/util';

import GoBack from '/src/components/reusable/GoBack.vue';
import EmailSent from '/src/views/login/confirmation/EmailSent.vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Logo from '/src/components/reusable/SterlingLogo.vue';
import { forgotPassword } from '/src/services/OnboardingServices.js';
import { encryptData } from '@/services/CryptService.js';


const router = useRouter();
const submitLoading = ref(false);

const isEmailSent = ref(false);
const form = reactive({
    email: '',
});

const rules = {
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email is invalid', email),
    },
};

const v$ = useVuelidate(rules, form);

async function sendEmailAddress() {
    const validity = await v$.value.$validate();
    if (!validity) return;

    submitLoading.value = true;

    forgotPassword(
        { email: encryptData(form.email) },
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
}

const goBack = () => {
    router.push('/login');
};

const toggleConfirmation = () => {
    isEmailSent.value = !isEmailSent.value;
};
</script>

<style lang="scss" scoped>
.active {
    background: #f5f9ff;
    /* Gray cool / 300 */

    border: 1px solid #b9c0d4;
    box-shadow: 0px 4px 14px 1px rgba(0, 0, 0, 0.04);
}
.inactive {
    background: #ffffff;
    /* Gray/100 */

    border: 1px solid #f2f4f7;
    box-shadow: 0px 2px 14px 1px rgba(0, 0, 0, 0.06);
}
</style>
