<template>
    <div class="vendorDignupContainer max-w-[520px] w-full mb-[40px]">
        <div class="grid grid-cols-1 gap-2 mb-[40px] sm:mb-0">
            <div class="text-3xl font-semibold text-gray-900">Verify phone number</div>
            <p class="cursor-pointer mb-[32px] font-normal text-base text-gray-600">Enter your phone number</p>
            <form @submit.prevent="continueSignup">
                <div class="grid grid-cols-1 gap-x-[20px] gap-y-[20px]">
                    <div class="col-span-1">
                        <label for="phoneNo" class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div class="mt-1 relative">
                            <input
                                type="tel"
                                name="text"
                                id="phoneNo"
                                autocomplete="off"
                                v-model="v$.phoneNo.$model"
                                :class="{
                                    errorBorder: v$.phoneNo?.$errors[0]?.$message?.length > 0,
                                }"
                                class="pl-[88px] block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="phoneNo-description"
                            />

                            <!-- --------- -->

                            <div class="w-[80px] absolute inset-y-0 left-0 flex items-center border-r border-gray-300 cursor-pointer">
                                <Listbox as="div" class="w-full" v-model="selectedCountry">
                                    <div class="">
                                        <ListboxButton class="flex gap-2 w-full cursor-default rounded-[4px] pl-2 py-2 text-right focus:outline-none focus:ring-0 sm:text-sm font-normal text-gray-600">
                                            <span class="pointer-events-none flex items-center pr-[0.5px]">
                                                {{ selectedCountry.flag }}
                                            </span>
                                            <span class="block truncate font-normal text-sm">{{ selectedCountry.dial_code }}</span>
                                        </ListboxButton>

                                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute w-[249px] z-10 mt-2 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                            >
                                                <ListboxOption as="template" v-for="country in countryList" :key="country.id" :value="country" v-slot="{ active, selectedCountry }">
                                                    <li :class="[active ? 'text-gray-900 bg-gray-100' : 'text-gray-900', 'relative  cursor-default select-none py-2 pl-3 pr-9']">
                                                        <span
                                                            class="relative flex gap-2 w-full cursor-default rounded-[4px] pl-2 py-2 text-right focus:outline-none focus:ring-0 sm:text-sm font-normal text-gray-600"
                                                        >
                                                            <span class="pointer-events-none flex items-center pr-[0.5px]">
                                                                {{ country.flag }}
                                                            </span>
                                                            <span v-if="selectedCountry" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                            </span>
                                                            <span class="block truncate font-normal text-sm">{{ country.name }}</span>
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>

                            <!-- --------- -->
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.phoneNo.$errors" :key="error.$uid">
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
            <VendorSignupGoBack class="mt-[32px] mx-auto" />
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
import { required, helpers, numeric, maxLength, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Tick from '/src/assets/svg/UserTypeTick.vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
import { countryList } from '/src/components/reusable/Countrylist';
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';

import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';

onMounted(() => {
    step.value = 3;
});
// const yourValue = ref('')
const store = useStore();
const router = useRouter();
const submitLoading = ref(false);
const step = inject('step');
// const show = ref(false);
// const showConfirmPassword = ref(false);

const selectedCountry = ref(countryList[161]);

const form = reactive({
    email: '',
});

const rules = {
    phoneNo: {
        required: helpers.withMessage('Phone number is required', required),
        numeric: helpers.withMessage('Phone number must contain only digits', numeric),
        maxLength: helpers.withMessage('Phone number cannot be more than 11 characters', maxLength(11)),
        minLength: helpers.withMessage('Phone number cannot be less than 10 characters', minLength(10)),
    },
};

const v$ = useVuelidate(rules, form);

const continueSignup = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    submitLoading.value = true;

    // const signupDetails = {
    //     phoneCode: selectedCountry.value.dial_code,
    //     phoneNumber: selectedCountry.value.dial_code + String(Number(form.phoneNo)),

    //     email: form.email,
    // };

    const detailsToStore = {
        phoneCode: selectedCountry.value.dial_code,
        phoneNumber: String(form.phoneNo),
        email: store.state.vendorSignupDetails.email,
    };

    store.commit('setVendorSignupDetails', detailsToStore);
    goNext();
};

const goNext = () => {
    step.value += 1;
    router.push('/vendor-signup/send-otp');
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
