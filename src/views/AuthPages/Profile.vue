<template>
    <div v-if="Util.checkIndividualAuth()">
        <div v-if="!upgraded" class="xs-shadow bg-[#ffffff] rounded-[4px] flex flex-col sm:flex-row border border-[#EFF1F5]">
            <div class="">
                <div class="sm:w-[239px] h-[155px] sm:h-full xl:h-[155px] relative">
                    <img class="full-image rounded-tl-[4px] sm:rounded-l-[4px] rounded-tr-[4px] sm:rounded-r-[0px]" src="/src/assets/images/LandingPage.png" alt="" />

                    <!-- <div class="w-[239px] h-full reportBgImg rounded-l-[4px]"></div> -->
                </div>
            </div>

            <div class="flex-1 p-6">
                <h2 class="mb-1 font-semibold text-[18px] text-[#30374F]">Upgrade to Premium</h2>

                <p class="mb-5 font-normal text-sm text-[#475467]">Pay a one time subscription fee and upgrade to premium account for just N1,000</p>

                <button @click="toggleModal" class="flex items-center rounded-lg gap-[12px] py-[8px] px-[14px] xs-shadow bg-[#4A5578]">
                    <span class="font-semibold text-sm text-[#ffffff]"> Learn more</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.16699 9.99935H15.8337M15.8337 9.99935L10.0003 4.16602M15.8337 9.99935L10.0003 15.8327"
                            stroke="white"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div class="mt-5">
            <SettingsPlate header="Account Information">
                <template v-slot:body>
                    <form class="md:max-w-[578px]" @submit.prevent="update">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                            <div class="col-span-1 md:col-span-2 flex items-center gap-[14px] mb-3">
                                <!-- {{ form.photo }} -->
                                <AvatarInput class="h-[81px] w-[81px]" v-model="form.photo" :defaultSrc="form.photo" />

                                <!-- <span class="text-[#475467] text-sm font-normal">upload company logo</span> -->
                            </div>
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
                            <div class="col-span-1">
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
                                                                    <span
                                                                        v-if="selectedCountry"
                                                                        :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"
                                                                    >
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
                            <div class="col-span-1">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                                <div class="mt-1">
                                    <input
                                        disabled
                                        type="text"
                                        name="email"
                                        id="email"
                                        v-model="form.email"
                                        autocomplete="off"
                                        :class="{
                                            errorBorder: v$.email?.$errors[0]?.$message?.length > 0,
                                        }"
                                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="email-description"
                                    />
                                </div>

                                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.email.$errors" :key="error.$uid">
                                    <div class="text-red-400">
                                        {{ error.$message }}
                                    </div>
                                </div> -->
                            </div>

                            <div></div>

                            <button
                                :class="submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100'"
                                :disabled="submitLoading || v$.$invalid"
                                type="submit"
                                @click="goNext"
                                class="w-full brandButton mt-[32px] flex items-center justify-center gap-4"
                            >
                                Save Changes

                                <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
                            </button>
                        </div>
                    </form>
                </template>
            </SettingsPlate>
        </div>
        <upgrade-plan />
        <PhoneOTP @sendOtp="upgradePlanRequest" />
        <SuccessfulPaymentModal @done="done" title="Payment Successful" body="Your account has now upgraded and can now view CARFAX report on all vehicles." />
    </div>
    <VendorProfile v-if="Util.checkVendorAuth()" />
</template>

<script setup>
import AvatarInput from '/src/components/reusable/AvatarInput.vue';
import VendorProfile from '/src/views/AuthPages/vendor/VendorProfile.vue';
import { countryList } from '/src/components/reusable/Countrylist';
import { updateProfile } from '/src/services/OnboardingServices.js';
import UpgradePlan from '/src/components/modals/upgradePlan/UpgradePlan.vue';
import PhoneOTP from '/src/components/modals/PhoneOTP.vue';
import { Log, Util } from '/src/util';
import SuccessfulPaymentModal from '/src/components/modals/SuccessfulPaymentModal.vue';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';
import { reactive, ref, provide, computed, onMounted } from 'vue';
import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import { useStore } from 'vuex';
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
import { getProfile } from '@/services/IndividualService.js';
onMounted(() => {
    getIndividualProfile();
    onFlutterResponse();
});

const store = useStore();
const upgraded = computed(() => store.getters['marketPlace/upgraded']);
const autoFillInfo = computed(() => {
    return {
        fullName: store.getters['authToken/fullName'],
        userId: store.getters['authToken/userId'],
        phoneNumber: store.getters['authToken/phoneNumber'],
        email: store.getters['authToken/email'],
        photo: store.getters['authToken/photo'],
    };
});
// const isIndividual = computed(() => store.getters['authToken/roles'].includes('Individual'));

const isOpen = ref(false);
const openOtp = ref(false);
const openSuccessModal = ref(false);
const selectedCountry = ref(countryList[161]);
const form = reactive({
    email: autoFillInfo.value.email,

    firstName: autoFillInfo.value.fullName.split(' ')[0],
    lastName: autoFillInfo.value.fullName.split(' ')[1],
    phoneNo: autoFillInfo.value.phoneNumber,
    photo: autoFillInfo.value.photo,
    // password: '',
    // confirmPassword: '',
});
const submitLoading = ref(false);
const paymentLoading = ref(false);
const paymentResponse = computed(
    () => store.getters['marketPlace/upgradeResponse']
    // store.getters['authToken/userId']
);

const onFlutterResponse = () => {
    if (paymentResponse.value?.status?.toLowerCase() === 'successful') {
        toggleOpenSuccessModal();
        store.commit('marketPlace/upgraded', true);
    }
    // else if (paymentResponse.value?.status?.toLowerCase() !== 'successful') {
    //     Util.handleGlobalAlert(true, 'failed', paymentResponse.value?.status);

    //     emptyOutPaymentRes();
    // }
};
const rules = {
    firstName: {
        required: helpers.withMessage('First name is required', required),
    },
    lastName: {
        required: helpers.withMessage('Last name is required', required),
    },
    phoneNo: {
        required: helpers.withMessage('Phone number is required', required),
        numeric: helpers.withMessage('Phone number must be numeric', numeric),
    },

    // email: {
    //     required: helpers.withMessage('Email is required', required),
    //     email: helpers.withMessage('Email is invalid', email),
    // },
};

const v$ = useVuelidate(rules, form);

const update = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    submitLoading.value = true;
    updateProfile(
        {
            firstName: form.firstName,
            lastName: form.lastName,
            fullName: `${form.firstName} ${form.lastName}`,
            phoneCode: selectedCountry.value.dial_code,
            phoneNumber: form.phoneNo,
            userId: autoFillInfo.value.userId,
            photo: form.photo,
        },
        (res) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Successfully Updated');

            updateStore();
        },
        (err) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const toggleModal = () => {
    isOpen.value = !isOpen.value;
};

const toggleOTPModal = () => {
    console.log('show phone OTP');
    if (isOpen.value === true) {
        isOpen.value = false;
    }
    openOtp.value = !openOtp.value;
};

const toggleOpenSuccessModal = () => {
    openSuccessModal.value = !openSuccessModal.value;
};

const upgradePlanRequest = (otp) => {
    paymentLoading.value = true;
    //if successful
    toggleOTPModal();
    toggleOpenSuccessModal();

    paymentLoading.value = false;
};

const updateStore = () => {
    store.commit('authToken/phoneNumber', form.phoneNo);
    store.commit('authToken/fullName', `${form.firstName} ${form.lastName}`);
    store.commit('authToken/phoneCode', selectedCountry.value.dial_code);
    if (form.photo) {
        // console.log('Commit: ' + data.photo);
        store.commit('authToken/photo', form.photo);
        // form.photo = data.photo;
    }
};

const getIndividualProfile = () => {
    getProfile(
        (res) => {
            const data = res.data.data;

            setProfileInfo(data);
        },
        (err) => {}
    );
};

const setProfileInfo = (data) => {
    // const obj = {
    //     address: '12 Ajifoluke off silverbird road',
    //     businessName: 'Treadie',
    //     email: 'bismarckkaine+18@gmail.com',
    //     fullName: null,
    //     id: 'c9614832-b99a-4ece-b95d-67b68088bd24',
    //     phoneCode: '+234',
    //     phoneNumber: '9049074491',
    //     photo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8',
    //     safCurrentAccountNumber: '1111111111',
    //     termsAcceptedAt: '2023-02-27T06:12:49.921926Z',
    //     userId: '52a21a70-e1fc-47fe-882b-ff8bc266063a',
    // };

    if (data.photo) {
        // console.log('Commit: ' + data.photo);
        store.commit('authToken/photo', data.photo);
        form.photo = data.photo;
    }
    form.firstName = data.firstName;
    form.lastName = data.lastName;
    // store.commit('authToken/firstName', data.firstName);
    // store.commit('authToken/lastName', data.lastName);
    store.commit('authToken/fullName', `${data.firstName} ${data.lastName}`);

    // form.businessName = data.businessName ? data.businessName : '';
    // form.address = data.address ? data.address : '';
    // form.SAF = data.safCurrentAccountNumber ? data.safCurrentAccountNumber : '';
};

const done = () => {
    toggleOpenSuccessModal();
    store.commit('marketPlace/upgradeResponse', {});
};

provide('open', isOpen);
provide('toggleModal', toggleModal);
provide('openOtp', openOtp);
provide('toggleOTPModal', toggleOTPModal);
provide('paymentLoading', paymentLoading);
provide('openSuccessModal', openSuccessModal);
provide('toggleOpenSuccessModal', toggleOpenSuccessModal);
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
