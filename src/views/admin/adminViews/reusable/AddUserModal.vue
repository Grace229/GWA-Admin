<template>
    <TransitionRoot class="fixed inset-0 z-[10000] overflow-y-auto" as="template" :show="openAddUser">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white py-[21px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[500px]">
                            <div>
                                <div class="mb-5 px-[20px] flex items-center justify-between">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold text-[#18273A]">
                                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_5508_27352)">
                                                <rect x="2" y="1" width="48" height="48" rx="10" fill="white" />
                                                <path
                                                    d="M33 23V17M30 20H36M30 34V32.8C30 31.1198 30 30.2798 29.673 29.638C29.3854 29.0735 28.9265 28.6146 28.362 28.327C27.7202 28 26.8802 28 25.2 28H20.8C19.1198 28 18.2798 28 17.638 28.327C17.0735 28.6146 16.6146 29.0735 16.327 29.638C16 30.2798 16 31.1198 16 32.8V34M26.5 20.5C26.5 22.433 24.933 24 23 24C21.067 24 19.5 22.433 19.5 20.5C19.5 18.567 21.067 17 23 17C24.933 17 26.5 18.567 26.5 20.5Z"
                                                    stroke="#344054"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <rect x="2.5" y="1.5" width="47" height="47" rx="9.5" stroke="#EAECF0" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_d_5508_27352" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="1" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5508_27352" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5508_27352" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </DialogTitle>
                                    <div @click="close" class="cursor-pointer">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.78558 8.99935L1.12568 3.33945C0.514096 2.72786 0.514096 1.73629 1.12568 1.1247C1.73727 0.513119 2.72884 0.513119 3.34042 1.1247L9.00033 6.78461L14.6602 1.1247C15.2718 0.513119 16.2634 0.513119 16.875 1.1247C17.4866 1.73629 17.4866 2.72786 16.875 3.33945L11.2151 8.99935L16.875 14.6593C17.4866 15.2708 17.4866 16.2624 16.875 16.874C16.2634 17.4856 15.2718 17.4856 14.6602 16.874L9.00033 11.2141L3.34042 16.874C2.72884 17.4856 1.73727 17.4856 1.12568 16.874C0.514096 16.2624 0.514096 15.2708 1.12568 14.6593L6.78558 8.99935Z"
                                                fill="#1C324F"
                                                fill-opacity="0.38"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="overflow-y-auto mt-[20px] flex flex-col gap-3 mb-[10px] px-[20px]">
                                <div class="col-span-2 mb-2">
                                    <h2 class="font-semibold text-[18px] text-[#101828]">New Admin</h2>
                                    <span class="text-sm font-normal text-[#475467]">Enter the details for a new admin user</span>
                                </div>
                                <div class="grid grid-cols-2 gap-6">
                                    <!-- <div class="col-span-2 input--error" :class="{ 'input--error': v$.role.$errors }">
                                        <label for="role" class="block text-sm font-medium text-[#344054]">Role</label>
                                        <div class="mt-1">
                                            <IdSelect class="h-[44px]" :options="Constants.rolesMenu" v-model="v$.role.$model" label="Select Role" :modelValue="form.role" />
                                        </div>

                                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.role.$errors" :key="error.$uid">
                                            <div class="text-red-400">
                                                {{ error.$message }}
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="col-span-2 grid grid-cols-2 gap-4">
                                        <div class="col-span-1">
                                            <label for="First Name" class="block text-sm font-medium text-[#344054]">First Name</label>
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
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
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
                                            <label for="Last Name" class="block text-sm font-medium text-[#344054]">Last Name</label>
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
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="lastName-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.lastName.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-span-2">
                                            <label for="Email Address" class="block text-sm font-medium text-[#344054]">Email Address</label>
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
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="email-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.email.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!inspectionAdminSelected" class="col-span-2">
                                            <label for="Username" class="block text-sm font-medium text-[#344054]">Username</label>
                                            <div class="mt-1">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autocomplete="off"
                                                    v-model="v$.userName.$model"
                                                    :class="{
                                                        errorBorder: v$.userName?.$errors[0]?.$message?.length > 0,
                                                    }"
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="userName-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.userName.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>

                                            <div v-if="userNameErr" class="text-red-400 mt-1 text-xs">
                                                <div class="text-red-400">
                                                    {{ userNameErr }}
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!inspectionAdminSelected" class="col-span-2">
                                            <label for="Staff ID" class="block text-sm font-medium text-[#344054]">Staff ID</label>
                                            <div class="mt-1">
                                                <input
                                                    type="text"
                                                    name="staffId"
                                                    id="staffId"
                                                    autocomplete="off"
                                                    v-model="v$.staffId.$model"
                                                    :class="{
                                                        errorBorder: v$.staffId?.$errors[0]?.$message?.length > 0,
                                                    }"
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="staffId-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.staffId.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>

                                            <div v-if="staffIdErr" class="text-red-400 mt-1 text-xs">
                                                <div class="text-red-400">
                                                    {{ staffIdErr }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-span-2">
                                            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <div class="mt-1 relative">
                                                <input
                                                    type="tel"
                                                    name="text"
                                                    id="phoneNumber"
                                                    autocomplete="off"
                                                    v-model="v$.phoneNumber.$model"
                                                    :class="{
                                                        errorBorder: v$.phoneNumber?.$errors[0]?.$message?.length > 0,
                                                    }"
                                                    class="pl-[88px] block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="phoneNumber-description"
                                                />

                                                <!-- --------- -->

                                                <div class="w-[80px] absolute inset-y-0 left-0 flex items-center border-r border-gray-300 cursor-pointer">
                                                    <Listbox as="div" class="w-full" v-model="selectedCountry">
                                                        <div class="">
                                                            <ListboxButton
                                                                class="flex gap-2 w-full cursor-default rounded-[4px] pl-2 py-2 text-right focus:outline-none focus:ring-0 sm:text-sm font-normal text-gray-600"
                                                            >
                                                                <span class="pointer-events-none flex items-center pr-[0.5px]">
                                                                    {{ selectedCountry.flag }}
                                                                </span>
                                                                <span class="block truncate font-normal text-sm">{{ selectedCountry.dial_code }}</span>
                                                            </ListboxButton>

                                                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                                <ListboxOptions
                                                                    class="absolute w-[249px] z-10 mt-2 max-h-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>
                                        <!-- if form.role is Inspoection officer -->
                                        <div v-if="inspectionAdminSelected" class="col-span-2">
                                            <label for="state" class="block text-sm font-medium text-[#344054]">State</label>
                                            <div class="mt-1">
                                                <CustomSelect class="h-[44px]" :options="stateMenu" v-model="form.state" :modelValue="form.state" label="Select state" />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs">
                                                 <div class="text-red-400">
                                                    {{ stateErrMsg }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-span-2 mt-[14px]">
                                            <!-- requiredIfRef
                                            || v$.$invalid -->
                                            <button
                                                @click="submit"
                                                :disabled="actionLoading"
                                                :class="actionLoading || v$.$invalid ? 'opacity-25' : 'opacity-100'"
                                                type="button"
                                                class="brandButton flex items-center justify-center rounded-lg w-full py-[10px] font-semi-bold text-[14px]"
                                            >
                                                Create Admin

                                                <SpinnerLoader v-if="actionLoading" class="ml-2 h-[14px] w-[14px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { stateMenu } from '@/components/reusable/StateList.js';
import CustomSelect from '@/components/reusable/CustomInputs/CustomSelect.vue';
import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue';
import { countryList } from '/src/components/reusable/Countrylist';
import { ref, inject, reactive, watch, defineEmits, computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { Log, Constants, Util } from '@/util';
import { createAdmin } from '@/services/AdminServices.js';
// import { encryptData } from '@/services/CryptService';
// const emits = defineEmits(['proceed']);

const openAddUser = inject('openAddUser');
const actionLoading = ref(false);
const refetch = inject('refetch');
const stateErrMsg = ref(null);
const toggleOpenAddUser = inject('toggleOpenAddUser');
const selectedCountry = ref(countryList[161]);
// const toggleOpenAddUserText = inject('toggleOpenAddUserText');
const close = () => {
    toggleOpenAddUser();
};
const staffIdErr = ref(null);
const userNameErr = ref(null);
const form = reactive({
    photo: '',
    staffId: '',
    userName: '',
    firstName: '',
    lastName: '',
    fullName: '',
    phoneCode: '',
    phoneNumber: '',
    role: '1',
    email: '',
    emailConfirmed: true,
    phoneConfirmed: true,
    state: null,
});

const inspectionAdminSelected = computed(() => true);

const resetForm = () => {
    const newForm = {
        photo: '',
        staffId: '',
        userName: '',
        firstName: '',
        lastName: '',
        fullName: '',
        phoneCode: '',
        phoneNumber: '',
        role: '1',
        email: '',
        emailConfirmed: true,
        phoneConfirmed: true,
        state: null,
    };
    Object.assign(form, newForm);
};

const rules = {
    firstName: {
        required: helpers.withMessage('First name is required', required),
    },

    lastName: {
        required: helpers.withMessage('Last name is required', required),
    },
    email: {
        required: helpers.withMessage('Email is required', required),
    },
    userName: {
        // required: helpers.withMessage('User name is required', required),
    },
    staffId: {
        // required: helpers.withMessage('StaffID is required', required),
        // requiredIfRef: requiredIf(form.role == 3),
        //    required: helpers.withParams({ type: 'requiredIf' }, value => form.role == 3 ? required(value) : true)
    },
    role: {
        required: helpers.withMessage('Role is required', required),
    },
    phoneNumber: {
        required: helpers.withMessage('Phone number is required', required),
        numeric: helpers.withMessage('Phone number must be numeric', numeric),
    },
};

const prepareDetails = () => {
    const obj = {
        photo: form.photo,
        staffId: inspectionAdminSelected.value ? '0' : form.staffId,
        userName: inspectionAdminSelected.value ? form.firstName : form.userName,
        firstName: form.firstName,
        lastName: form.lastName,
        fullName: `${form.firstName} ${form.lastName}`,
        phoneCode: selectedCountry.value.dial_code,
        phoneNumber: form.phoneNumber,
        role: Number(form.role),
        email: form.email,
        emailConfirmed: form.emailConfirmed,
        phoneConfirmed: form.phoneConfirmed,
        state: form.state,
    };
    return obj;
};

const v$ = useVuelidate(rules, form);

const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    if (!inspectionAdminSelected.value && form.staffId.length == 0) {
        staffIdErr.value = 'Staff Id is required';
        if (!inspectionAdminSelected.value && form.userName.length == 0) {
            userNameErr.value = 'User name is required';
            return;
        }
        return;
    }

    if (!form.state && form.role == 3) {
        stateErrMsg.value = 'State field is compulsory for Inspection Admin';
        return;
    }

    actionLoading.value = true;
    createAdmin(
        prepareDetails(),
        (res) => {
            Util.handleGlobalAlert(true, 'success', 'Successfully Added User');
            actionLoading.value = false;

            toggleOpenAddUser();
            resetForm();
            refetch();
        },
        (err) => {
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
            actionLoading.value = false;
            toggleOpenAddUser();
            resetForm();
        }
    );
};

watch(openAddUser, (newValue) => {
    if (newValue === true) {
    }
});
watch(
    () => form.state,
    (newValue) => {
        if (newValue !== null) {
            if (stateErrMsg.value !== null) {
                stateErrMsg.value = null;
            }
        }
    }
);
// watch(
//     () => form.email,
//     (newValue) => {
//         console.log('🚀 ~ file: AddUserModal.vue:464 ~ watch ~  Number(form.role):', Number(form.role));
// if(newValue == 3){

// }
//     }
// );
watch(
    () => form.staffId,
    () => {
        staffIdErr.value = null;
    }
);
watch(
    () => form.userName,
    () => {
        userNameErr.value = null;
    }
);
</script>

<style lang="scss" scoped>
.active {
    background: #eaecf0;
    /* Gray/200 */

    border: 1px solid #eaecf0;
    /* Gray cool / 400 */
    color: #344054;
}
.inactive {
    /* Base/White */

    background: #ffffff;
    /* Gray/200 */

    border: 1px solid #eaecf0;
    /* Gray/100 */
    color: #667085;
}
</style>
