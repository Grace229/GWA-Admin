<template>
    <div class="vendorDignupContainer max-w-[520px] w-full mb-[40px]">
        <div class="grid grid-cols-1 gap-2 mb-[40px] sm:mb-0">
            <div class="text-3xl font-semibold text-gray-900">Create an Account</div>
            <p @click="$router.push('/login')" class="cursor-pointer mb-[32px] font-normal text-base text-gray-600">Already have an account? <span class="font-bold">Log In.</span></p>
            <form @submit.prevent="continueSignup" autocomplete="off">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] gap-y-[20px]">
                    <div class="col-span-1">
                        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autocomplete="off"
                                v-model="v$.firstName.$model"
                                :class="{
                                    errorBorder: v$.firstName?.$errors[0]?.$message?.length > 0,
                                }"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="firstName-description"
                            />
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.firstName.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1">
                        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autocomplete="off"
                                v-model="v$.lastName.$model"
                                :class="{
                                    errorBorder: v$.lastName?.$errors[0]?.$message?.length > 0,
                                }"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="lastName-description"
                            />
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.lastName.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1 lg:col-span-2 xl:col-span-1">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                        <div class="mt-1">
                            <input
                                disabled
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

                    <div class="col-span-1 lg:col-span-2 xl:col-span-1">
                        <label for="phoneNo" class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div class="mt-1 relative">
                            <input
                                disabled
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
                                        <ListboxButton
                                            disabled
                                            class="flex gap-2 w-full cursor-default rounded-[4px] pl-2 py-2 text-right focus:outline-none focus:ring-0 sm:text-sm font-normal text-gray-600"
                                        >
                                            <span class="pointer-events-none flex items-center pr-[0.5px]">
                                                {{ selectedCountry?.flag }}
                                            </span>
                                            <span class="block truncate font-normal text-sm">{{ selectedCountry?.dial_code }}</span>
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
                    <div class="col-span-1 lg:col-span-2 xl:col-span-1">
                        <label for="businessName" class="block text-sm font-medium text-gray-700">Business Name</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="businessName"
                                id="businessName"
                                autocomplete="off"
                                v-model="v$.businessName.$model"
                                :class="{
                                    errorBorder: v$.businessName?.$errors[0]?.$message?.length > 0,
                                }"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="businessName-description"
                            />
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.businessName.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                    <!-- {{ form.SAF }} -->
                    <div class="col-span-1 lg:col-span-2 xl:col-span-1">
                        <label for="The Alternative Bank" class="block text-sm font-medium text-gray-700">The Alternative Bank Current Account No <span class="text-xs">(Optional)</span> </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="SAF"
                                id="SAF"
                                autocomplete="off"
                                v-model="v$.SAF.$model"
                                :class="{
                                    errorBorder: v$.SAF?.$errors[0]?.$message?.length > 0,
                                }"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="SAF-description"
                            />
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.SAF.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1">
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                autocomplete="off"
                                v-model="v$.address.$model"
                                :class="{
                                    errorBorder: v$.address?.$errors[0]?.$message?.length > 0,
                                }"
                                class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="address-description"
                            />
                        </div>

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.address.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>

                    <div class="relative col-span-1 mb-6">
                        <LabelledSelect class="h-[44px]" :options="stateMenu" v-model="v$.state.$model" :modelValue="form.state" label="State" />
                        <div class="text-red-400 mt-7 text-xs" v-for="error of v$.state.$errors" :key="error.$uid">
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
                                    errorBorder: v$.confirmPassword?.$errors[0]?.$message?.length > 0,
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
                <a href="https://safonlineaccount.sterling.ng/index.html" target="_blank">
                    <div class="mt-[20px] cursor-pointer">
                        <p class="text-gray-700 font-normal text-xs">Don’t have a The Alternative Bank Current account? <span class="font-semibold text-[#344054] underline">Click here</span></p>
                    </div>
                </a>

                <button
                    :class="[submitLoading || v$.$invalid ? 'disabledBrandButton' : 'opacity-100', 'flex items-center justify-center gap-4']"
                    :disabled="submitLoading"
                    type="submit"
                    class="w-full brandButton mt-[32px]"
                >
                    Continue
                    <div v-if="submitLoading" class="h-4 w-4 ml-4 rounded-md block">
                        <div class="roundLoader opacity-50 mx-auto"></div>
                    </div>
                </button>
            </form>
        </div>
        <VendorSignupGoBack class="mt-[32px] mx-auto" />
    </div>
</template>

<script setup>
// import { VueTelInput } from 'vue-tel-input'
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';

import LabelledSelect from '/src/components/reusable/CustomInputs/LabelledSelect.vue';
import { ref, reactive, computed, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { Log, Util } from '/src/util';
import useVuelidate from '@vuelidate/core';
import { required, helpers, minLength, sameAs, email, maxLength, numeric } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Tick from '/src/assets/svg/UserTypeTick.vue';
import EyeIcon from '/src/assets/svg/EyeIcon.vue';
// import { vendorSave } from '/src/services/OnboardingServices.js';
import { countryList } from '/src/components/reusable/Countrylist';
import { stateMenu } from '@/components/reusable/StateList.js';
import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';

onMounted(() => {
    step.value = 5;
    populateForm();
    rerouteIfNoContacts();
});
// const yourValue = ref('')
const store = useStore();
const router = useRouter();
const submitLoading = ref(false);
const step = inject('step');
const show = ref(false);
const showConfirmPassword = ref(false);
const storedEmail = computed(() => store.state.vendorSignupDetails.email);
const storedPhoneNo = computed(() => store.state.vendorSignupDetails.phoneNumber);
const storedPhoneCode = computed(() => store.state.vendorSignupDetails.phoneCode);
// const stateMenu = [
//     {
//         id: 1,
//         text1: 'Lagos',
//     },
//     {
//         id: 2,
//         text1: 'Abuja',
//     },
//     {
//         id: 3,
//         text1: 'Enugu',
//     },
// ];
const selectedCountry = ref(countryList.find((country) => country.dial_code === storedPhoneCode.value));

const rerouteIfNoContacts = () => {
    if (!storedEmail.value || !storedPhoneNo.value || !storedPhoneCode.value) {
        router.push('/vendor-signup/provide-contacts');
    }
};

const form = reactive({
    firstName: '',
    lastName: '',
    email: storedEmail.value,
    phoneNo: storedPhoneNo.value,
    businessName: '',
    SAF: '',
    address: '',
    state: '',
    password: '',
    confirmPassword: '',
});

const populateForm = () => {
    const data = store.state.vendorSignupDetails;
    if (Object.keys(data).length !== 0) {
        form.firstName = data.firstName;
        form.lastName = data.lastName;
        form.email = data.email;
        form.phoneNo = String(Number(data.phoneNumber));
        form.businessName = data.businessName;
        form.SAF = data.safCurrentAccountNumber;
        form.address = data.address;
        form.state = data.state;
        form.password = data.password;
        form.confirmPassword = data.confirmPassword;
    }
};

const rules = {
    firstName: {
        required: helpers.withMessage('First name is required', required),
        maxLength: helpers.withMessage('First name cannot be more than 30 characters', maxLength(30)),
    },
    lastName: {
        required: helpers.withMessage('Last name is required', required),
        maxLength: helpers.withMessage('Last name cannot be more than 30 characters', maxLength(30)),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email is invalid', email),
    },

    phoneNo: {
        required: helpers.withMessage('Phone number is required', required),
    },
    businessName: {
        required: helpers.withMessage('Business name is required', required),
    },
    SAF: {
        numeric: helpers.withMessage('The Alternative Bank account number must be numeric', numeric),
        maxLength: helpers.withMessage('The Alternative Bank account number must not be more than 10 digits', maxLength(10)),
        minLength: helpers.withMessage('The Alternative Bank account number must not be less than 10 digits', minLength(10)),
    },

    address: {
        required: helpers.withMessage('Address is required', required),
    },

    state: {
        required: helpers.withMessage('State is required', required),
    },
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: minLength(8),
        containsPasswordRequirement: helpers.withMessage(
            () => `The password requires an uppercase, lowercase, number and special character`,
            (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
        // containsPasswordRequirement: (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
    },
    confirmPassword: {
        required: helpers.withMessage('Confirm password is required', required),
        sameAs: helpers.withMessage('Passwords do not match', sameAs(computed(() => form.password))),
    },
};

const v$ = useVuelidate(rules, form);

const continueSignup = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    submitLoading.value = true;
    const signupDetails = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: String(Number(form.phoneNo)),
        businessName: form.businessName,
        safCurrentAccountNumber: form.SAF,
        address: form.address,
        phoneCode: selectedCountry.value.dial_code,
        state: form.state,
        password: form.password,
        confirmPassword: form.confirmPassword,
        fullName: `${form.firstName} ${form.lastName}`,
    };

    store.commit('setVendorSignupDetails', signupDetails);

    submitLoading.value = false;

    goNext();
};

const togglePassword = () => {
    show.value = !show.value;
    // document.getElementById('password').focus()
};
const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
    // document.getElementById('password').focus()
};

const goNext = () => {
    step.value += 1;
    router.push('/vendor-signup/terms-and-conditions');
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
