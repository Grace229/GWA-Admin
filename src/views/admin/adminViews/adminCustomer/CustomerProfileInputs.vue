<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[18px] max-w-[632px]">
            <div class="col-span1 sm:col-span-2 flex items-center gap-[14px] mb-3">
                <!-- {{ form.photo.slice(0, 2) }} -->
                <StaticAvatarInput class="h-[81px] w-[81px]" v-model="form.photo" :defaultSrc="form.photo" />

                <!-- <span class="text-[#475467] text-sm font-normal">upload company logo</span> -->
            </div>
            <div class="col-span-1">
                <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                <div class="mt-1">
                    <input
                        disabled
                        type="text"
                        name="firstName"
                        id="firstName"
                        autocomplete="off"
                        v-model="form.firstName"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="firstName-description"
                    />
                </div>
            </div>
            <div class="col-span-1">
                <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                <div class="mt-1">
                    <input
                        disabled
                        type="text"
                        name="lastName"
                        id="lastName"
                        autocomplete="off"
                        v-model="form.lastName"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="lastName-description"
                    />
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
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="email-description"
                    />
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
                        v-model="form.phoneNo"
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
                                                    <span v-if="selectedCountry" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"> </span>
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
            </div>
        </div>

        <!-- <GlobalAlert class="ml-4" /> -->
    </div>
</template>

<script setup>
import LabelledSelect from '/src/components/reusable/CustomInputs/LabelledSelect.vue';
import StaticAvatarInput from '@/components/reusable/StaticAvatarInput.vue';
import { countryList } from '/src/components/reusable/Countrylist';

import { reactive, ref, computed, inject } from 'vue';
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

const customer = inject('customer');
const formatCurrency = inject('formatCurrency');
const selectedCountry = ref(countryList[161]);

const form = reactive({
    email: computed(() => customer.value.email),
    firstName: computed(() => customer.value.firstName),
    lastName: computed(() => customer.value.lastName),
    // firstName: autoFillInfo.value.fullName.split(' ')[0],
    // lastName: autoFillInfo.value.fullName.split(' ')[1],
    phoneNo: computed(() => customer.value.phoneNumber),
    businessName: computed(() => customer.value.businessName),
    address: computed(() => customer.value.address),
    SAF: computed(() => customer.value.safCurrentAccountNumber),
    state: customer.value.state,
    phoneCode: computed(() => selectedCountry.value.dial_code),
    // password: '',
    // confirmPassword: '',
    photo: computed(() => customer.value.photo),
});
</script>

<style lang="scss" scoped>
.card {
    /* Base/White */

    background: #ffffff;
    /* Gray/50 */

    border: 1px solid #f9fafb;
    /* Shadow/sm */

    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 12px;
}
</style>
