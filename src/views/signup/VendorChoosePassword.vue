<template>
    <div class="mx-6 max-w-[500px] w-full my-[40px]">
        <div v-if="!isPasswordReset" class="max-w-[360px] xl:mx-auto flex flex-col gap-3 items-center">
            <ChoosePasswordIcon />
            <h3 class="mt-6 text-[30px] font-semibold text-gray-900">Choose a password</h3>

            <div class="max-w-[300px]"><p class="text-gray-600 text-base font-normal text-center">Must be at least 8 characters.</p></div>
            <div class="grid grid-cols-1 gap-2 w-full mt-4">
                <form @submit.prevent="resetPassword">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="col-span-1">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1 relative">
                                <input
                                    :type="show ? 'text' : 'password'"
                                    name="password"
                                    id="password"
                                    autocomplete="off"
                                    v-model="v$.password.$model"
                                    :class="{
                                        'border-red-500': v$.password?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="password-description"
                                />

                                <EyeIcon @click="togglePassword" class="absolute inset-y-0 right-0" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.password.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div class="mt-1 relative">
                                <input
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    autocomplete="off"
                                    v-model="v$.confirmPassword.$model"
                                    :class="{
                                        'border-red-500': v$.confirmPassword?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="confirmPassword-description"
                                />

                                <EyeIcon @click="toggleConfirmPassword" class="absolute inset-y-0 right-0" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        :class="[submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center']"
                        :disabled="submitLoading || v$.$invalid"
                        type="submit"
                        class="w-full brandButton mt-[40px]"
                    >
                        Create Password
                        <div v-if="submitLoading" class="h-4 w-4 ml-4 rounded-md block">
                            <div class="roundLoader opacity-50 mx-auto"></div>
                        </div>
                    </button>
                </form>
            </div>
        </div>
        <ResetPasswordSuccess @done="toggleConfirmation" buttonText="View Account" v-else />
    </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue';
import ChoosePasswordIcon from '/src/assets/svg/ChoosePassword.vue';
import ResetPasswordSuccess from '/src/views/login/confirmation/ResetPasswordSuccess.vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, minLength, sameAs } from '@vuelidate/validators';
import { useRouter, useRoute } from 'vue-router';
import { vendorCreatePassword } from '/src/services/OnboardingServices.js';
import { Log, Util } from '/src/util';
import { encryptData } from '@/services/CryptService.js';


onMounted(() => {
    step.value = 5;
});
const store = useStore();
const step = inject('step');
const router = useRouter();
const submitLoading = ref(false);
const show = ref(false);
const showConfirmPassword = ref(false);
const route = useRoute();
const isPasswordReset = ref(false);
const form = reactive({
    password: '',
    confirmPassword: '',
    email: route.query.email,
});

const togglePassword = () => {
    show.value = !show.value;
    // document.getElementById('password').focus()
};
const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
    // document.getElementById('password').focus()
};

const rules = {
    password: {
        required: helpers.withMessage('Password is required', required),
        containsPasswordRequirement: helpers.withMessage(
            () => `The password requires an uppercase, lowercase, number and special character`,
            (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
        // containsPasswordRequirement: (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
        minLength: minLength(8),
    },
    confirmPassword: {
        required: helpers.withMessage('Confirm password is required', required),
        sameAs: helpers.withMessage('Passwords do not match', sameAs(computed(() => form.password))),
    },
};

const v$ = useVuelidate(rules, form);

async function resetPassword() {
    const validity = await v$.value.$validate();
    if (!validity) return;
    submitLoading.value = true;
    // const signupDetails = store.state.vendorSignupDetails
    // signupDetails.password = form.password
    // signupDetails.confirmPassword = form.confirmPassword

    // store.commit('setVendorSignupDetails', {})

    vendorCreatePassword(
        password: encryptData(form.password),
            confirmPassword: encryptData(form.confirmPassword),
            email: form.email,
        (res) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'success', res.data.message);
            toggleConfirmation();
        },
        (err) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
}

const goBack = () => {
    router.push('/login');
};

const toggleConfirmation = () => {
    isPasswordReset.value = !isPasswordReset.value;
};
</script>

<style lang="scss" scoped></style>
