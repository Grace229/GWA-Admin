<template>
    <div v-if="!isLoginDetailsGiven" class="mx-6 max-w-[390px] w-full my-[40px] sm:my-[174px]">
        <div class="mb-[72px]">
            <Logo class="logoClass" />
        </div>

        <!-- {{ allRoutes }} -->

        <div class="grid grid-cols-1 gap-2">
            <div class="text-3xl font-semibold text-gray-900">Log In</div>
            <!-- <p @click="$router.push('/signup')" class="cursor-pointer mb-[32px] font-normal text-base text-gray-600">Don't have an account? <span class="font-bold">Sign Up</span></p> -->
            <form @submit.prevent="loginUser">
                <div class="grid grid-cols-1 gap-4 mt-[32px]">
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
                                    errorBorder: v$.password?.$errors[0]?.$message?.length > 0,
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
                </div>

                <p @click="router.push('/forgot-password')" class="cursor-pointer font-normal text-sm text-[#4A5578] mt-[20px]">Forgot Password?</p>

                <button
                    :class="[submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100', 'flex items-center justify-center gap-4']"
                    :disabled="submitLoading || v$.$invalid"
                    type="submit"
                    class="w-full brandButton mt-[40px]"
                >
                    Log In <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
                </button>
            </form>
        </div>
    </div>
    <AdminOTP v-else @goBack="isLoginDetailsGiven = false" :loginData="loginData" :navigateTo="navigateTo" />
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';
import AdminOTP from '@/views/login/AdminOTP.vue';
import { useStore } from 'vuex';
// import { routes } from '@/router/index.js';
import { useRouter, useRoute } from 'vue-router';
import Logo from '/src/components/reusable/SterlingLogo.vue';
import { signin } from '/src/services/OnboardingServices.js';
import { Log, Util } from '@/util';
import { handleSuccessfulLogin, clearStorage } from '/src/services/OnboardingServices.js';



const isLoginDetailsGiven = ref(false);
const loginData = ref({});
const router = useRouter();
const route = useRoute();
const navigateTo = ref('/admin/dashboard');
const store = useStore();

const submitLoading = ref(false);
const show = ref(false);
const form = reactive({
    email: '',
    password: '',
});

const rules = {
    password: {
        required: helpers.withMessage('Password is required', required),
    },

    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email is invalid', email),
    },
};

const setRouteRedirect = () => {
    if (route?.query?.redirected_from) {
        navigateTo.value = route.query.redirected_from;
    }
};
onMounted(() => {
    setRouteRedirect();
    // console.log("store",store.getters['authToken/loggedIn'])
});
const v$ = useVuelidate(rules, form);

const loginUser = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    submitLoading.value = true;
    clearStorage();

    signin(
        {
            email: form.email,
            password: form.password,
        },
        (res) => {
            submitLoading.value = false;
            console.log(res.data.data)
            const roles = res.data.data.roles;
            // if (roles.includes('BusinessAdmin') || roles.includes('InsuranceAdmin') || roles.includes('FleetAdmin') || roles.includes('SuperAdmin')) {
                // loginData.value = res.data.data;
                // isLoginDetailsGiven.value = true;
                handleSuccessfulLogin(res.data.data);
                Util.handleGlobalAlert(true, 'success', 'Welcome');
                router.push(navigateTo.value);
                // loginData.value = res.data.data;
                // isLoginDetailsGiven.value = true;

                return;
            // } else {
            //     Util.handleGlobalAlert(true, 'failed', 'Unauthorised Credentials');
            // }
        },
        (err) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

const togglePassword = () => {
    show.value = !show.value;
    // document.getElementById('password').focus()
};

watch(
    () => form,
    () => {
        submitLoading.value = false;
    },
    { deep: true }
);
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
