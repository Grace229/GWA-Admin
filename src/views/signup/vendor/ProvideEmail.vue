<template>
    <div class="vendorDignupContainer max-w-[520px] w-full mb-[40px]">
        <div class="grid grid-cols-1 gap-2 mb-[40px] sm:mb-0">
            <div class="text-3xl font-semibold text-gray-900">Lets get started</div>
            <p class="cursor-pointer mb-[32px] font-normal text-base text-gray-600">Enter your email address to get started</p>
            <form @submit.prevent="continueSignup">
                <div class="grid grid-cols-1 gap-x-[20px] gap-y-[20px]">
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

                <!-- <div class="mt-[20px] cursor-pointer">
                    <p class="text-gray-700 font-normal text-xs">Don’t have a The Alternative Bank Current account? <span class="font-medium text-red-400 underline">Click here</span></p>
                </div> -->

                <button
                    :class="[submitLoading || v$.$invalid ? 'disabledBrandButton' : 'opacity-100', 'flex items-center justify-center gap-4']"
                    :disabled="submitLoading || v$.$invalid"
                    type="submit"
                    class="w-full brandButton mt-[32px]"
                >
                    Continue
                    <div v-if="submitLoading" class="h-4 w-4 ml-4 rounded-md block">
                        <div class="roundLoader opacity-50 mx-auto"></div>
                    </div>
                </button>
            </form>
            <!-- <Princess />
            <Princess /> -->
            <div class="flex items-center justify-center mt-[44px]">
                <p @click="$router.push('/login')" class="cursor-pointer mb-[32px] font-normal text-base text-gray-600">Already have an account? <span class="font-bold">Log In.</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { VueTelInput } from 'vue-tel-input'
// import Princess from '@/views/signup/vendor/Princess.vue';
import { ref, reactive, computed, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { Log, Util } from '/src/util';
import useVuelidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Tick from '/src/assets/svg/UserTypeTick.vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import { countryList } from '/src/components/reusable/Countrylist';

import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';

onMounted(() => {
    step.value = 1;
});
// const yourValue = ref('')
const store = useStore();
const router = useRouter();
const submitLoading = ref(false);
const step = inject('step');
// const show = ref(false);
// const showConfirmPassword = ref(false);

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

const continueSignup = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    submitLoading.value = true;

    const detailsToStore = {
        phoneCode: '',
        phoneNumber: '',
        email: form.email,
    };

    store.commit('setVendorSignupDetails', detailsToStore);
    goNext();
};

const goNext = () => {
    step.value += 1;
    router.push('/vendor-signup/verify-email');
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
