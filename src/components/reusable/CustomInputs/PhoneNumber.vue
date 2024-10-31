<template>
    <div class="mb-6">
        <div class="relative">
            <Field
                id="PhoneNumber"
                name="phoneNumber"
                type="number"
                autocomplete="off"
                v-model="phoneNumber"
                required
                class="grey-8 fs-14 fw-400 relative mt-1.5 br-8 appearance-none block w-full pl-24 pr-3 border border-gray-200 focus:outline-none sm:text-sm"
                :class="{ 'is-invalid inputError': errors.phoneNumber }"
            />
            <!-- <span class="floating-areacode ml-3">{{
                selected.phoneCode
              }}</span> -->

            <div class="absolute floating-InputSelect top-0 bottom-0 flex items-center">
                <Listbox as="div" v-model="selected">
                    <div class="relative">
                        <ListboxButton class="bg-transparent my-auto h-full relative w-full rounded-md pl-3 pr-9 py-2 text-left cursor-default focus:outline-none sm:text-sm">
                            <span class="block truncate">{{ selected.phoneCode }}</span>
                            <!-- <component :is="selected.currency"></component> -->
                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <div class="h-5 w-5 text-gray-400 flex items-center justify-center">
                                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5.73 5.2L10.46 1" stroke="#BFBFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute z-10 mt-1 w-56 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                                <ListboxOption as="template" v-for="country in countries" :key="country.id" :value="country" v-slot="{ active, selected }">
                                    <li :class="[active ? 'blacktext bg-gray-100' : 'blacktext', 'cursor-default select-none relative py-2 pl-3 pr-9 flex justify-between gap-x-8']">
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block ']">
                                            <!-- <component :is="country.currency"></component> -->

                                            {{ country.name }}
                                        </span>
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block ']">
                                            <!-- <component :is="country.currency"></component> -->

                                            {{ country.phoneCode }}
                                        </span>

                                        <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"> </span>
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </div>
                </Listbox>
            </div>
        </div>
        <div class="invalid-feedback errorMsg">
            {{ errors.phoneNumber }}
        </div>
    </div>
</template>

<script setup>
import {
    Listbox,
    ListboxButton,
    // ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue'
</script>

<style lang="scss" scoped></style>
