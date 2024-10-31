<template>
    <div>
        <div class="mt-5">
            <SettingsPlate header="Profile Information">
                <template v-slot:body>
                    <!-- {{ hasNoSAF }} -->
                    <IncompleteProfileWarning v-if="hasNoSAF" />
                    <form class="md:max-w-[578px]" @submit.prevent="updateProfile">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                            <div class="col-span-1 md:col-span-2 flex items-center gap-[14px] mb-3">
                                <!-- {{ form.photo.slice(0, 2) }} -->
                                <!-- {{ isDeactivated }} -->
                                <AvatarInput :clickDisabled="isDeactivated" class="h-[81px] w-[81px]" v-model="form.photo" :defaultSrc="form.photo" />

                                <span class="text-[#475467] text-sm font-normal">upload company logo</span>
                            </div>
                            <div class="col-span-1">
                                <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                                <div class="mt-1">
                                    <input
                                        :disabled="isDeactivated"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autocomplete="off"
                                        v-model="v$.firstName.$model"
                                        :class="{
                                            errorBorder: v$.firstName?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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
                                        :disabled="isDeactivated"
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autocomplete="off"
                                        v-model="v$.lastName.$model"
                                        :class="{
                                            errorBorder: v$.lastName?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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
                                            cursorCancel: isDeactivated,
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
                                            cursorCancel: isDeactivated,
                                        }"
                                        class="pl-[88px] block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                        aria-describedby="phoneNo-description"
                                    />

                                    <!-- --------- -->

                                    <div class="w-[80px] absolute inset-y-0 left-0 flex items-center border-r border-gray-300 cursor-pointer">
                                        <Listbox as="div" class="w-full" v-model="selectedCountry">
                                            <div class="">
                                                <ListboxButton
                                                    :class="{
                                                        cursorCancel: isDeactivated,
                                                    }"
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
                                <label for="businessName" class="block text-sm font-medium text-gray-700">Business Name</label>
                                <div class="mt-1">
                                    <input
                                        :disabled="isDeactivated"
                                        type="text"
                                        name="businessName"
                                        id="businessName"
                                        autocomplete="off"
                                        v-model="v$.businessName.$model"
                                        :class="{
                                            errorBorder: v$.businessName?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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

                            <div class="col-span-1">
                                <label for="The Alternative Bank" class="block text-sm font-medium text-gray-700">The Alternative Bank</label>
                                <div class="mt-1">
                                    <input
                                        :disabled="isDeactivated"
                                        type="text"
                                        name="SAF"
                                        id="SAF"
                                        autocomplete="off"
                                        v-model="v$.SAF.$model"
                                        :class="{
                                            errorBorder: v$.SAF?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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
                                        :disabled="isDeactivated"
                                        type="text"
                                        name="address"
                                        id="address"
                                        autocomplete="off"
                                        v-model="v$.address.$model"
                                        :class="{
                                            errorBorder: v$.address?.$errors[0]?.$message?.length > 0,
                                            cursorCancel: isDeactivated,
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

                            <div>
                                <LabelledSelect :disabled="isDeactivated" class="h-[44px]" :options="stateMenu" v-model="form.state" label="State" :modelValue="form.state" />
                                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.state.$errors" :key="error.$uid">
                                    <div class="text-red-400">
                                        {{ error.$message }}
                                    </div>
                                </div> -->
                            </div>
                            <!-- {{ form.state }} -->
                            <!-- {{ isDeactivated }} -->
                            <button
                                :class="submitLoading || v$.$invalid || isDeactivated ? 'opacity-25 cursorCancel' : 'opacity-100'"
                                :disabled="submitLoading || v$.$invalid || isDeactivated"
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

        <!-- <GlobalAlert class="ml-4" /> -->
    </div>
</template>

<script setup>
import LabelledSelect from '/src/components/reusable/CustomInputs/LabelledSelect.vue';
import AvatarInput from '/src/components/reusable/AvatarInput.vue';
import IncompleteProfileWarning from '/src/components/reusable/IncompleteProfileWarning.vue';
import { countryList } from '/src/components/reusable/Countrylist';
import { updateVendorProfile, getVendorProfile } from '/src/services/VendorServices.js';
import { Log, Util } from '/src/util';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric, minLength, maxLength } from '@vuelidate/validators';
import { reactive, ref, computed, onMounted, watch } from 'vue';
import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import { useStore } from 'vuex';
// import GlobalAlert from '@/views/alert/GlobalAlert.vue';
import { stateMenu } from '@/components/reusable/StateList.js';

onMounted(() => {
    getProfile();
});
const store = useStore();
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const isDeactivated = computed(() => vendorInfo.value?.profileStatus == 2);
const autoFillInfo = computed(() => {
    return {
        fullName: store.getters['authToken/fullName'],
        userId: store.getters['authToken/userId'],
        phoneNumber: store.getters['authToken/phoneNumber'],
        email: store.getters['authToken/email'],
        photo: store.getters['authToken/photo'],
    };
});

const hasNoSAF = ref(false);

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

const selectedCountry = ref(countryList[161]);
const form = reactive({
    vendorId: autoFillInfo.value.userId,
    email: autoFillInfo.value.email,

    firstName: autoFillInfo.value.fullName.split(' ')[0],
    lastName: autoFillInfo.value.fullName.split(' ')[1],
    phoneNo: autoFillInfo.value.phoneNumber,
    businessName: '',
    address: '',
    SAF: '',
    state: '',
    phoneCode: computed(() => selectedCountry.value.dial_code),
    // password: '',
    // confirmPassword: '',
    photo: autoFillInfo.value.photo,
});
const submitLoading = ref(false);

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
    businessName: {
        required: helpers.withMessage('Business name is required', required),
    },
    address: {
        required: helpers.withMessage('Address is required', required),
    },

    SAF: {
        numeric: helpers.withMessage('SAF must be numeric', numeric),
        maxLength: helpers.withMessage('SAF must not be more than 10 digits', maxLength(10)),
        minLength: helpers.withMessage('SAF must not be less than 10 digits', minLength(10)),
    },
    // state: {
    //     required: helpers.withMessage('State is required', required),
    // },

    // email: {
    //     required: helpers.withMessage('Email is required', required),
    //     email: helpers.withMessage('Email is invalid', email),
    // },
};

const v$ = useVuelidate(rules, form);

const prepareDetails = (form) => {
    const details = {
        vendorId: form.vendorId,
        businessName: form.businessName,
        firstName: form.firstName,
        lastName: form.lastName,
        // fullName: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phoneCode: form.phoneCode,
        phoneNumber: form.phoneNo,
        address: form.address,
        safCurrentAccountNumber: form.SAF,
        photo: form.photo,
        state: form.state,
    };
    return details;
};

const updateProfile = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    const details = prepareDetails(form);

    submitLoading.value = true;
    updateVendorProfile(
        details,
        (res) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Successfully Updated Profile');

            updateProfileStore();
            getProfile();
        },
        (err) => {
            submitLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', 'Cound not save profile');

            // Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const getProfile = () => {
    getVendorProfile(
        (res) => {
            const data = res.data.data;

            setProfileInfo(data);
        },
        (err) => {}
    );
};

const updateProfileStore = () => {
    store.commit('authToken/phoneNumber', form.phoneNo);
    store.commit('authToken/fullName', `${form.firstName} ${form.lastName}`);
    store.commit('authToken/phoneCode', selectedCountry.value.dial_code);

    if (form.photo) {
        // console.log('Commit: ' + data.photo);
        store.commit('authToken/photo', form.photo);
        // form.photo = data.photo;
    }
};

const setProfileInfo = (data) => {
    if (data.photo) {
        store.commit('authToken/photo', data.photo);
    }
    if (data.safCurrentAccountNumber.length > 0) {
        hasNoSAF.value = false;
    }
    form.state = data.state ? data.state : '';
    form.businessName = data.businessName ? data.businessName : '';
    form.address = data.address ? data.address : '';
    form.SAF = data.safCurrentAccountNumber ? data.safCurrentAccountNumber : '';
};
</script>

<style lang="scss" scoped></style>

{}
