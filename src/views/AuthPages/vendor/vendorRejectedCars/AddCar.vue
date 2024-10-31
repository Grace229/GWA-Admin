<template>
    <div>
        <SettingsPlate header="Add a New Car" description="Provide details about your car">
            <template v-slot:body>
                <div class="max-w-[728px]">
                    <div class="grid grid-cols-2 gap-x-8 gap-y-5">
                        <div class="col-span-1">
                            <label for="condition" class="block text-sm font-medium text-[#344054]">Condition</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="conditions" v-model="v$.condition.$model" label="Select Condition" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.condition.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <label for="brand" class="block text-sm font-medium text-[#344054]">Brand</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="brands" v-model="v$.brand.$model" label="Select Brand" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.brand.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="model" class="block text-sm font-medium text-[#344054]">Model</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="models" v-model="v$.model.$model" label="Select Model" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.model.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="year" class="block text-sm font-medium text-[#344054]">Year</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="years" v-model="v$.year.$model" label="Select Year" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.year.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="bodyType" class="block text-sm font-medium text-[#344054]">Body Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="bodyTypes" v-model="v$.bodyType.$model" label="Select Body Type" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.bodyType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="fuelType" class="block text-sm font-medium text-[#344054]">Fuel Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="fuelTypes" v-model="v$.fuelType.$model" label="Select Fuel Type" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.fuelType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="engineType" class="block text-sm font-medium text-[#344054]">Engine Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="engineTypes" v-model="v$.engineType.$model" label="Select Engine Type" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.engineType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="interior" class="block text-sm font-medium text-[#344054]">Interior</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="interiors" v-model="v$.interior.$model" label="Select Interior" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.interior.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="transmissionType" class="block text-sm font-medium text-[#344054]">Transmission Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="transmissionTypes" v-model="v$.transmissionType.$model" label="Select Transmission Type" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.transmissionType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="color" class="block text-sm font-medium text-[#344054]">Color</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="colors" v-model="v$.color.$model" label="Select Color" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.color.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="mileage" class="block text-sm font-medium text-[#344054]">Mileage</label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="mileage"
                                    id="mileage"
                                    autocomplete="off"
                                    v-model="v$.mileage.$model"
                                    :class="{
                                        errorBorder: v$.mileage?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="mileage-description"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.mileage.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="price" class="block text-sm font-medium text-[#344054]">Price</label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    autocomplete="off"
                                    v-model="v$.price.$model"
                                    :class="{
                                        errorBorder: v$.price?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="price-description"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.price.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="financingType" class="block text-sm font-medium text-[#344054]">Financing Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="financingTypes" v-model="v$.financingType.$model" label="Select Financing Type" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.financingType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="VIN" class="block text-sm font-medium text-[#344054]">VIN</label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="VIN"
                                    id="VIN"
                                    autocomplete="off"
                                    v-model="v$.VIN.$model"
                                    :class="{
                                        errorBorder: v$.VIN?.$errors[0]?.$message?.length > 0,
                                    }"
                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                    aria-describedby="VIN-description"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.VIN.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="location" class="block text-sm font-medium text-[#344054]">Location</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="locations" v-model="v$.location.$model" label="Select Location" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.location.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="mt-[18px] col-span-2">
                            <p class="text-[18px] font-semibold text-[#404968] mb-5">Features</p>
                            <div class="grid grid-cols-4 gap-x-4 gap-y-[18px]">
                                <div v-for="feature in features" :key="feature.id" class="relative flex items-start">
                                    <div class="flex h-5 items-center">
                                        <input
                                            v-model="feature.checked"
                                            v-bind:id="feature.id"
                                            :aria-describedby="feature.name"
                                            :name="feature.name"
                                            type="checkbox"
                                            class="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-0"
                                        />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label v-bind:for="feature.id" class="font-medium text-[#344054]">{{ feature.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-[49px]">
                        <label for="description" class="block text-sm font-medium text-[#344054]">Description</label>
                        <div class="mt-1">
                            <textarea
                                rows="6"
                                name="description"
                                id="description"
                                autocomplete="off"
                                placeholder="Enter a description..."
                                v-model="form.description"
                                class="block h-[154px] w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                aria-describedby="description-description"
                            >
                            </textarea>
                        </div>

                        <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.description.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div> -->
                    </div>

                    <div class="mt-[26px]">
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-[126px] bg-[#FFFFFF] border border-dashed rounded-lg cursor-pointer">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
                                        <path
                                            d="M19.6665 26.3333L22.9998 23M22.9998 23L26.3332 26.3333M22.9998 23V30.5M29.6665 26.9524C30.6844 26.1117 31.3332 24.8399 31.3332 23.4167C31.3332 20.8854 29.2811 18.8333 26.7498 18.8333C26.5677 18.8333 26.3974 18.7383 26.3049 18.5814C25.2182 16.7374 23.2119 15.5 20.9165 15.5C17.4647 15.5 14.6665 18.2982 14.6665 21.75C14.6665 23.4718 15.3627 25.0309 16.489 26.1613"
                                            stroke="#475467"
                                            stroke-width="1.66667"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <rect x="3" y="3" width="40" height="40" rx="20" stroke="#F9FAFB" stroke-width="6" />
                                    </svg>

                                    <p class="mb-2 font-normal text-sm text-[#475467]"><span class="text-[#344054] font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs font-normal text-[#475467]">PNG or JPG (min. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div>
                    </div>

                    <div class="mt-[30px] flex justify-end gap-4">
                        <button @click="submit" class="cancelButton rounded-[4px] w-[170px] h-10 flex items-center justify-center">Preview</button>
                        <button @click="submit" class="cancelButton rounded-[4px] w-[170px] h-10 flex items-center justify-center">Save</button>

                        <button @click="submit" class="brandButton w-[170px] h-10 flex items-center justify-center">Submit</button>
                    </div>
                </div>
            </template>
        </SettingsPlate>
    </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import { reactive, ref, inject, computed } from 'vue';
import { Util, Log } from '/src/util';

const loading = ref(false);
const conditions = inject('conditions');
const brands = inject('brands');
const models = inject('models');
const years = inject('years');
const bodyTypes = inject('bodyTypes');
const fuelTypes = inject('fuelTypes');
const engineTypes = inject('engineTypes');
const interiors = inject('interiors');
const transmissionTypes = inject('transmissionTypes');
const colors = inject('colors');
const mileages = inject('mileages');
const financingTypes = inject('financingTypes');
const locations = inject('locations');
const features = inject('features');
//filter features that are selected, map their names unto an array
const selectedFeatures = computed(() => features.filter((feature) => feature.checked).map((feature) => feature.name));

const form = reactive({
    condition: '',
    brand: '',
    model: '',
    year: '',
    bodyType: '',
    fuelType: '',
    engineType: '',
    interior: '',
    transmissionType: '',
    color: '',
    mileage: '',
    price: '',
    financingType: '',
    VIN: '',
    location: '',
    description: '',
});

const rules = {
    condition: {
        required: helpers.withMessage('Condition is required', required),
    },
    brand: {
        required: helpers.withMessage('Brand is required', required),
    },
    model: {
        required: helpers.withMessage('Model is required', required),
    },
    year: {
        required: helpers.withMessage('Year is required', required),
    },
    bodyType: {
        required: helpers.withMessage('BodyType is required', required),
    },
    fuelType: {
        required: helpers.withMessage('FuelType is required', required),
    },
    engineType: {
        required: helpers.withMessage('EngineType is required', required),
    },
    interior: {
        required: helpers.withMessage('Interior is required', required),
    },
    transmissionType: {
        required: helpers.withMessage('TransmissionType is required', required),
    },
    color: {
        required: helpers.withMessage('Color is required', required),
    },
    mileage: {
        required: helpers.withMessage('Mileage is required', required),
    },
    price: {
        required: helpers.withMessage('Price is required', required),
    },
    financingType: {
        required: helpers.withMessage('FinancingType is required', required),
    },
    VIN: {
        required: helpers.withMessage('VIN is required', required),
    },
    location: {
        required: helpers.withMessage('Location is required', required),
    },
};

const v$ = useVuelidate(rules, form);

const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    loading.value = true;

    Util.handleGlobalAlert(true, 'success', 'Your car has been added');

    // nextStep();
    loading.value = false;
};
</script>

<style lang="scss" scoped></style>
