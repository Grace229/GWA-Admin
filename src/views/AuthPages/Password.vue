<template>
    <div>
        <div class="mt-5">
            <SettingsPlate header="Account Information">
                <template v-slot:body>
                    <form @submit.prevent="updateProfile">
                        <div class="grid grid-cols-2 gap-[18px] md:max-w-[578px]">
                            <div class="col-span-2">
                                <label for="oldPassword" class="block text-sm font-medium text-gray-700">Old Password</label>
                                <div class="mt-1 relative">
                                    <input
                                        :type="showOldPassword ? 'text' : 'password'"
                                        name="oldPassword"
                                        :disabled="isDeactivated"
                                        id="oldPassword"
                                        autocomplete="off"
                                        v-model="v$.oldPassword.$model"
                                        :class="{
                                            errorBorder: v$.oldPassword?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
                                        }"
                                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="oldPassword-description"
                                    />

                                    <EyeIcon @click="toggleOldPassword" class="absolute inset-y-0 right-0" />
                                </div>

                                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.oldPassword.$errors" :key="error.$uid">
                                    <div class="text-red-400">
                                        {{ error.$message }}
                                    </div>
                                </div>
                            </div>

                            <div class="col-span-2">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1 relative">
                                    <input
                                        :disabled="isDeactivated"
                                        :type="show ? 'text' : 'password'"
                                        name="password"
                                        id="password"
                                        autocomplete="off"
                                        v-model="v$.password.$model"
                                        :class="{
                                            errorBorder: v$.password?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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

                            <div class="col-span-2">
                                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div class="mt-1 relative">
                                    <input
                                        :disabled="isDeactivated"
                                        :type="showConfirmPassword ? 'text' : 'password'"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        autocomplete="off"
                                        v-model="v$.confirmPassword.$model"
                                        :class="{
                                            errorBorder: v$.confirmPassword?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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

                            <!-- {{ vendorInfo.profileStatus == 0 }} -->
                            <!-- <button v-if="vendorInfo.profileStatus == 0" type="submit" @click="pageEligibilityCheck" class="w-full brandButton mt-[32px] flex items-center justify-center">
                                Change Password
                            </button> -->
                            <!-- {{ isDeactivated }} -->

                            <div class="col-span-2 sm:col-span-1">
                                <button
                                    :class="submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100'"
                                    :disabled="submitLoading || isDeactivated"
                                    type="submit"
                                    @click="goNext"
                                    class="!w-full brandButton mt-[32px] flex items-center justify-center"
                                >
                                    Change Password <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
                                </button>
                            </div>
                        </div>
                    </form>
                </template>
            </SettingsPlate>
        </div>
    </div>
</template>

<script setup>
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, minLength, sameAs } from '@vuelidate/validators';
import { reactive, ref, computed } from 'vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import { changePassword } from '@/services/OnboardingServices';
import { Log, Util } from '@/util';
import { useStore } from 'vuex';
import { handleLogout } from '/src/services/OnboardingServices.js';
import { useRoute } from 'vue-router';

const form = reactive({
    password: '',
    oldPassword: '',
    confirmPassword: '',
});
const route = useRoute();
const store = useStore();
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const isDeactivated = computed(() => vendorInfo.value?.profileStatus == 2);
const submitLoading = ref(false);
const show = ref(false);
const showConfirmPassword = ref(false);
const showOldPassword = ref(false);
const rules = {
    password: {
        required: helpers.withMessage('New password is required', required),
        containsPasswordRequirement: helpers.withMessage(
            () => `The password requires an uppercase, lowercase, number and special character`,
            (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
        // containsPasswordRequirement: (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
        minLength: minLength(8),
    },

    oldPassword: {
        required: helpers.withMessage('Old password is required', required),
        // containsPasswordRequirement: helpers.withMessage(
        //     () => `The password requires an uppercase, lowercase, number and special character`,
        //     (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        // ),
        // containsPasswordRequirement: (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
        // minLength: minLength(8),
    },
    confirmPassword: {
        required: helpers.withMessage('Confirm password is required', required),
        sameAs: helpers.withMessage('Passwords do not match', sameAs(computed(() => form.password))),
    },
};

const v$ = useVuelidate(rules, form);

const updateProfile = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    submitLoading.value = true;

    changePassword(
        {
            currentPassword: form.oldPassword,
            newPassword: form.password,
            confirmNewPassword: form.confirmPassword,
        },
        (res) => {
            submitLoading.value = false;

            Util.handleGlobalAlert(true, 'success', 'Password Seccessfully Changed. Log in with new password');
            logout();
        },
        (err) => {
            submitLoading.value = false;

            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const togglePassword = () => {
    show.value = !show.value;
    // document.getElementById('password').focus()
};
const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
    // document.getElementById('password').focus()
};

const toggleOldPassword = () => {
    showOldPassword.value = !showOldPassword.value;
    // document.getElementById('password').focus()
};

const pageEligibilityCheck = () => {
    // profile status of 2 = Deactivated;
    Util.handleGlobalAlert(true, 'Failed', 'You have been deactivated and cannot onboard a vehicle');

    return;
};

const logout = () => {
    // handleLogout();
    handleLogout('auto', route.fullPath);
};
</script>

<style lang="scss" scoped>
.reportBgImg {
    background-image: url('src/assets/images/LandingPage.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
