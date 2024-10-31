<template>
    <div>
        <!-- {{ $route?.meta?.action }} -->
        <!-- {{ form.year }} -->
        <!-- {{ form }} -->
        <!-- {{ v$ }} -->
        <!-- {{ v$.$errors }}s -->
        <!-- {{ $route.name }} -->
        <!-- {{ editVehicleDetails }} -->
        <!-- {{ form.vehicleParameterValues }} -->
        <!-- {{ form.condition }} -->
        <!-- {{ vendorInfo }} -->
        <!-- {{ isPending }}ss -->
        <!-- {{ vendorInfo.onboardingStatus }} -->
        <SettingsPlate :header="$route?.meta?.action === 'Edit Car' ? 'Edit Car' : 'Add a New Car'" description="Provide details about your car">
            <template v-slot:body>
                <Reason v-if="$route.name === 'Edit Rejected Car'" header="Reasons for rejection" :reasons="form.comment.length > 0 ? form.comment : 'No reason specified'" />

                <div class="max-w-[728px]">
                    <div class="grid grid-cols-2 gap-x-8 gap-y-5">
                        <!-- {{ form.condition }} -->
                        <div :class="{ 'input--error': v$.condition.$errors }" class="col-span-1">
                            <label for="condition" class="block text-sm font-medium text-[#344054]">Condition</label>
                            <div class="mt-1">
                                <!-- :class="{ 'input--error': $v.name.$error}"  -->
                                <CustomSelect class="h-[44px]" :options="conditions" v-model="v$.condition.$model" :modelValue="form.condition" label="Select Condition" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.condition.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1" :class="{ 'input--error': v$.brand.$errors }">
                            <!-- {{ form.brand }} -->
                            <label for="brand" class="block text-sm font-medium text-[#344054]">Brand</label>
                            <div class="mt-1">
                                <IdComboBox class="h-[44px]" @addItem="openAddBrand" :options="brands" v-model="v$.brand.$model" :modelValue="form.brand" label="Select Brand" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.brand.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <!-- <div class="col-span-1">
                            <label for="brand" class="block text-sm font-medium text-[#344054]">Brand</label>
                            <div class="mt-1">
                                <IdSelect class="h-[44px]" :options="brands" v-model="v$.brand.$model" :modelValue="form.brand" label="Select Brand" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.brand.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div> -->

                        <div class="col-span-1" :class="{ 'input--error': v$.model.$errors }">
                            <!-- {{ form.model }} -->
                            <label for="model" class="block text-sm font-medium text-[#344054]">Model</label>
                            <div class="mt-1">
                                <IdComboBox class="h-[44px]" @addItem="toggleAddModelModal" :options="models" v-model="v$.model.$model" :modelValue="form.model" label="Select Model" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.model.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <!-- <div class="col-span-1">
                            <label for="model" class="block text-sm font-medium text-[#344054]">Model</label>
                            <div class="mt-1">
                                <IdSelect class="h-[44px]" :options="models" v-model="v$.model.$model" :modelValue="form.model" label="Select Model" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.model.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div> -->

                        <div class="col-span-1" :class="{ 'input--error': v$.year.$errors }">
                            <!-- {{ form.year }} -->
                            <label for="year" class="block text-sm font-medium text-[#344054]">Year</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="years" v-model="v$.year.$model" label="Select Year" :modelValue="form.year" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.year.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <!-- <div class="col-span-1">
                            <label for="bodyType" class="block text-sm font-medium text-[#344054]">Body Type</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="bodyTypes" v-model="v$.bodyType.$model" :modelValue="form.bodyType" label="Select Body Type" />
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
                                <CustomSelect class="h-[44px]" :options="fuelTypes" v-model="v$.fuelType.$model" :modelValue="form.fuelType" label="Select Fuel Type" />
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
                                <CustomSelect class="h-[44px]" :options="engineTypes" v-model="v$.engineType.$model" :modelValue="form.engineType" label="Select Engine Type" />
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
                                <CustomSelect class="h-[44px]" :options="interiors" v-model="v$.interior.$model" :modelValue="form.interior" label="Select Interior" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.interior.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1">
                            <label for="color" class="block text-sm font-medium text-[#344054]">Color</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="colors" v-model="v$.color.$model" :modelValue="form.color" label="Select Color" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.color.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div> -->
                        <div v-for="customParameter in customParameters.filter((param) => param.parameterType == 2)" :key="customParameter.id" class="col-span-1">
                            <!-- {{ form.brand }} -->
                            <div v-if="customParameter.parameterType == 2">
                                <label :for="customParameter.name" class="block text-sm font-medium text-[#344054]">{{ customParameter.name }}</label>
                                <div class="mt-1">
                                    <CustomParamsListTest
                                        class="h-[44px]"
                                        :name="customParameter.name"
                                        :id="customParameter.id"
                                        @addItem="openAddParamValueModal(customParameter.id)"
                                        @onGetData="pushParam"
                                        :options="customParameter.values"
                                        :label="'Select' + ' ' + customParameter.name"
                                        :selectedParams="form.vehicleParameterValues"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- <div v-for="customParameter in customParameters.filter((param) => param.parameterType == 2)" :key="customParameter.id" class="col-span-1"> -->
                        <!-- <div v-if="customParameter.parameterType == 2">
                                <label :for="customParameter.name" class="block text-sm font-medium text-[#344054]">{{ customParameter.name }}</label>
                                <div class="mt-1">
                                    <ListParamType
                                        class="h-[44px]"
                                        :name="customParameter.name"
                                        :id="customParameter.id"
                                        @addItem="openAddParamValueModal(customParameter.id)"
                                        @onGetData="pushParam"
                                        :options="customParameter.values"
                                        :label="'Select' + ' ' + customParameter.name"
                                        :selectedParams="form.vehicleParameterValues"
                                    />
                                </div>
                            </div> -->

                        <!-- <div v-if="customParameter.parameterType == 0 || customParameter.parameterType == 1" class="mt-1">
                                <label :for="customParameter.name" class="block text-sm font-medium text-[#344054]">{{ customParameter.name }}</label>
                                <div class="mt-1">
                                    <AlphaNumericParamList
                                        class="h-[44px]"
                                        :name="customParameter.name"
                                        :parameterType="customParameter.parameterType"
                                        :id="customParameter.id"
                                        @addItem="openAddParamValueModal(customParameter.id)"
                                        @onGetData="pushParam"
                                        :option="customParameter.values"
                                        :label="'Select' + ' ' + customParameter.name"
                                        :selectedParams="form.vehicleParameterValues"
                                    />
                                </div>
                            </div> -->
                        <!-- </div> -->

                        <div class="col-span-1 input--error" :class="{ 'input--error': v$.transmissionType.$errors }">
                            <label for="transmissionType" class="block text-sm font-medium text-[#344054]">Transmission Type</label>
                            <div class="mt-1">
                                <IdSelect class="h-[44px]" :options="transmissionTypes" v-model="v$.transmissionType.$model" label="Select Transmission Type" :modelValue="form.transmissionType" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.transmissionType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1" :class="{ 'input--error': v$.mileage.$errors }">
                            <label for="mileage" class="block text-sm font-medium text-[#344054]">Mileage (km)</label>
                            <div class="mt-1">
                                <!-- <input
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
                                /> -->
                                <CurrencyInput
                                    id="carMileage"
                                    v-model="form.mileage"
                                    :options="{
                                        currency: 'ngn',
                                        currencyDisplay: 'hidden',
                                        hideCurrencySymbolOnFocus: true,
                                        hideGroupingSeparatorOnFocus: false,
                                        hideNegligibleDecimalDigitsOnFocus: false,
                                    }"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.mileage.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1" :class="{ 'input--error': v$.price.$errors }">
                            <label for="price" class="block text-sm font-medium text-[#344054]">Price</label>
                            <div class="mt-1">
                                <!-- <input
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
                                /> -->
                                <CurrencyInput
                                    id="carPrice"
                                    v-model="form.price"
                                    :options="{
                                        currency: 'ngn',

                                        hideCurrencySymbolOnFocus: false,
                                        hideGroupingSeparatorOnFocus: false,
                                        hideNegligibleDecimalDigitsOnFocus: false,
                                    }"
                                />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.price.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1" :class="{ 'input--error': v$.financingType.$errors }">
                            <!-- {{ form }} -->
                            <label for="Category" class="block text-sm font-medium text-[#344054]">Category </label>
                            <div class="mt-1">
                                <IdSelect class="h-[44px]" :options="financingTypes" v-model="v$.financingType.$model" :modelValue="form.financingType" label="Select Category" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.financingType.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <div class="col-span-1" :class="{ 'input--error': v$.VIN.$errors }">
                            <label for="VIN" class="block text-sm font-medium text-[#344054]">VIN</label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="VIN"
                                    id="VIN"
                                    autocomplete="off"
                                    v-model="v$.VIN.$model"
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

                        <div class="col-span-1" :class="{ 'input--error': v$.location.$errors }">
                            <label for="location" class="block text-sm font-medium text-[#344054]">Location</label>
                            <div class="mt-1">
                                <CustomSelect class="h-[44px]" :options="locations" v-model="v$.location.$model" :modelValue="form.location" label="Select Location" />
                            </div>

                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.location.$errors" :key="error.$uid">
                                <div class="text-red-400">
                                    {{ error.$message }}
                                </div>
                            </div>
                        </div>

                        <!-- {{ form.location }} -->

                        <div class="mt-[18px] col-span-2">
                            <p class="text-[18px] font-semibold text-[#404968] mb-5">Features</p>
                            <div class="flex flex-wrap gap-x-4 gap-y-[18px]">
                                <div v-for="feature in features.items" :key="feature.id" class="relative flex items-start min-w-[170px]">
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
                    <div class="" :class="{ 'input--error': v$.pictures.$errors }">
                        <FileUploader @filesUpdated="updateFormFiles" class="mt-[26px]" />

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.pictures.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="mt-[30px] flex justify-end gap-4">
                        <button @click="togglePreview" class="cancelButton rounded-[4px] w-[170px] h-10 flex items-center justify-center">Preview</button>
                        <!-- // -->
                        <button v-if="$route?.meta?.action === 'Edit Car'" @click="editCar" class="cancelButton rounded-[4px] w-[170px] h-10 flex items-center justify-center">
                            Save
                            <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                        </button>
                        <button v-else @click="setAsDraft" class="cancelButton rounded-[4px] w-[170px] h-10 flex items-center justify-center">
                            Save
                            <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                        </button>
                        <!-- // -->
                        <button
                            v-if="$route?.meta?.action === 'Edit Car'"
                            @click="submitAVehicle"
                            :disabled="submitLoading"
                            :class="submitLoading ? 'opacity-25' : 'opacity-100'"
                            class="brandButton w-[170px] h-10 flex items-center justify-center"
                        >
                            Submit
                            <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                        </button>
                        <button
                            v-else
                            @click="setAsDraftBeforePublishing"
                            :disabled="submitLoading || v$.$invalid"
                            :class="submitLoading || v$.$invalid ? 'opacity-25' : 'opacity-100'"
                            class="brandButton w-[170px] h-10 flex items-center justify-center"
                        >
                            Submit
                            <SpinnerLoader v-if="submitLoading" class="ml-2 h-[14px] w-[14px]" />
                        </button>
                    </div>
                    <!-- {{ form.mileage }} -->
                    <!-- <CurrencyInput
                        v-model="form.mileage"
                        :options="{
                            currency: 'ngn',
                            currencySymbol: CurrencyDisplay,
                            hideCurrencySymbolOnFocus: false,
                            hideGroupingSeparatorOnFocus: false,
                            hideNegligibleDecimalDigitsOnFocus: false,
                        }"
                    /> -->
                </div>
            </template>
        </SettingsPlate>

        <AddBrand />
        <AddModel />
        <AddParamValue />
    </div>
</template>

<script setup>
import Reason from '@/components/Reason.vue';
import FileUploader from '/src/components/reusable/CustomInputs/FileUploader.vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric, maxLength, minLength, minValue } from '@vuelidate/validators';
import IdComboBox from '@/components/reusable/CustomInputs/IdComboBox.vue';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import SettingsPlate from '/src/components/reusable/SettingsPlate.vue';
import { ref, inject, computed, watch, provide, onMounted, onBeforeMount } from 'vue';
import { Util, Log } from '@/util';
import { createVehicle, editVehicle, submitVehicle } from '@/services/VendorServices.js';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';
import AddBrand from '@/components/reusable/AddBrand.vue';
import AddModel from '@/components/reusable/AddModel.vue';
import AddParamValue from '@/components/reusable/AddParamValue.vue';
// import VendorCustomParamsList from '@/components/reusable/CustomInputs/VendorCustomParamsList.vue';
import ListParamType from '@/components/reusable/CustomInputs/ListParamType.vue';
import CustomParamsListTest from '@/components/reusable/CustomInputs/CustomParamsListTest.vue';

import AlphaNumericParamList from '@/components/reusable/CustomInputs/AlphaNumericParamList.vue';

onBeforeMount(() => {
    pageEligibilityCheck();
});

onMounted(() => {
    fetchModels();
    setIdForSubmission();
});
const store = useStore();
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const submitLoading = ref(false);
const formatCurrency = inject('formatCurrency');
const conditions = inject('conditions');
const brands = inject('brands');
const models = inject('models');
const years = inject('years');
const vehicle = inject('vehicle');
const editVehicleDetails = inject('editVehicleDetails');
const bodyTypes = inject('bodyTypes');
const savedVehicleId = ref(null);
const fuelTypes = inject('fuelTypes');
const togglePreview = inject('togglePreview');
const engineTypes = inject('engineTypes');
const interiors = inject('interiors');
const transmissionTypes = inject('transmissionTypes');
const colors = inject('colors');
const mileages = inject('mileages');
const financingTypes = inject('financingTypes');
const locations = inject('locations');
const features = inject('features');
const getModels = inject('getModels');
const customParameters = inject('customParameters');
const paramValueIdToAdd = ref('');
const isAddBrandModalOpen = ref(false);
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const isPending = computed(() => vendorInfo.value?.onboardingStatus == 0);

// const savedCar = inject('savedCar');

const pageEligibilityCheck = () => {
    // onboarding status of 0 = pending;

    if (isPending.value) {
        Util.handleGlobalAlert(true, 'Failed', 'You have not yet been approved');
        router.go(-1);
        return;
    }
    // onboarding status of 2 = declined;

    if (vendorInfo.value?.onboardingStatus == 2) {
        Util.handleGlobalAlert(true, 'Failed', 'You have been declined from onboarding a vehicle');
        router.go(-1);
        return;
    }

    // profile status of 2 = Deactivated;

    if (vendorInfo.value?.profileStatus == 2) {
        Util.handleGlobalAlert(true, 'Failed', 'You have been deactivated and cannot onboard a vehicle');
        router.go(-1);
        return;
    }
};

const setIdForSubmission = () => {
    if (route?.meta?.action === 'Edit Car') {
        savedVehicleId.value = route.params.id;
    }
};

const fetchModels = () => {
    if (form.brand.length > 0) {
        getModels();
    }
};

const toggleAddBrandModal = () => {
    isAddBrandModalOpen.value = !isAddBrandModalOpen.value;
};

const isAddParamValueModalOpen = ref(false);

const toggleAddParamValueModal = () => {
    isAddParamValueModalOpen.value = !isAddParamValueModalOpen.value;
};

const openAddParamValueModal = (paramValueId) => {
    paramValueIdToAdd.value = paramValueId;
    toggleAddParamValueModal();
};

const isAddModelModalOpen = ref(false);

const toggleAddModelModal = () => {
    isAddModelModalOpen.value = !isAddModelModalOpen.value;
};
const CurrencyDisplay = {
    symbol: 'symbol',
    narrowSymbol: 'narrowSymbol',
    code: 'NGN',
    name: 'name',
    hidden: 'hidden',
};

const pushParam = (parameter) => {
    JSON.stringify(parameter);
    if (parameter.value === null || parameter.value === undefined) {
        return;
    }
    if (route?.meta?.action === 'Edit Car') {
        const isInList = form.vehicleParameterValues.some((param) => param.parameter === parameter.name);
        // alert('not in lists' + parameter.value);
        if (!isInList) {
            form.vehicleParameterValues.push(parameter);
        } else {
            const indexToUpdate = form.vehicleParameterValues.findIndex((param) => param.parameter === parameter.name);

            form.vehicleParameterValues[indexToUpdate].value = parameter.value;
        }

        return;
    }

    const isInList = form.vehicleParameterValues.some((param) => param.parameterId === parameter.parameterId);

    if (!isInList) {
        form.vehicleParameterValues.push(parameter);
    } else {
        const indexToUpdate = form.vehicleParameterValues.findIndex((param) => param.parameterId === parameter.parameterId);

        form.vehicleParameterValues[indexToUpdate].value = parameter.value;
    }
};
//filter features that are selected, map their names unto an array
const selectedFeatures = computed(() => features.filter((feature) => feature.checked).map((feature) => feature.name));

const form = inject('form');
const saveCar = inject('saveCar');

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

    transmissionType: {
        required: helpers.withMessage('TransmissionType is required', required),
    },

    mileage: {
        required: helpers.withMessage('Mileage is required', required),
        // minValue: helpers.withMessage('Minimum value is 100', minValue(100)),
    },
    price: {
        required: helpers.withMessage('Price is required', required),
        numeric: helpers.withMessage('Price must be a number', numeric),
        minValue: helpers.withMessage('Minimum value is 100', minValue(100)),
    },
    financingType: {
        required: helpers.withMessage('FinancingType is required', required),
    },
    VIN: {
        required: helpers.withMessage('VIN is required', required),
        maxLength: helpers.withMessage('VIN must not be more than 17 digits', maxLength(17)),
        minLength: helpers.withMessage('VIN must not be less than 17 digits', minLength(17)),
    },
    location: {
        required: helpers.withMessage('Location is required', required),
    },
    pictures: {
        required: helpers.withMessage('Picture is required', required),
        // minLength: helpers.withMessage('Picture must be uploaded', minLength(1)),
    },
};

const errScroll = () => {
    let domRect = document.querySelector('.input--error').getBoundingClientRect();
    window.scrollTo(domRect.left + document.documentElement.scrollLeft, domRect.top + document.documentElement.scrollTop);
};

const v$ = useVuelidate(rules, form);

const setAsDraft = async () => {
    const validity = await v$.value.$validate();
    if (!validity) {
        // window.scrollTo(0, 0);
        errScroll();
        return;
    }

    loading.value = true;
    createVehicle(
        vehicle,
        (res) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Vehicle Created');
            store.commit('vendor/savedCar', null);
            // router.push('/listed-cars');
            savedVehicleId.value = res.data.data.id;
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );

    // nextStep();
};

const editCar = async () => {
    loading.value = true;
    editVehicle(
        editVehicleDetails,
        (res) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Vehicle Updated');

            router.push('/listed-cars');
        },
        (err) => {
            loading.value = false;
        }
    );

    // nextStep();
};

const setAsDraftBeforePublishing = async () => {
    const validity = await v$.value.$validate();
    if (!validity) {
        // window.scrollTo(0, 0);
        errScroll();
        return;
    }

    submitLoading.value = true;
    if (savedVehicleId.value !== null) {
        submitAVehicle();
    } else {
        createVehicle(
            vehicle,
            (res) => {
                // Util.handleGlobalAlert(true, 'success', 'Vehicle Created');

                savedVehicleId.value = res.data.data.id;
                submitAVehicle();
            },
            (err) => {
                // loading.value = false;
                submitLoading.value = false;
                Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
            }
        );
    }

    // nextStep();
};

const submitAVehicle = async () => {
    submitVehicle(
        {
            vehicleId: savedVehicleId.value,
        },
        (res) => {
            submitLoading.value = false;
            // loading.value = false;
            Util.handleGlobalAlert(true, 'success', 'Success');

            router.push('/listed-cars');
        },
        (err) => {
            submitLoading.value = false;
            // loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err?.response?.data?.message);
        }
    );
};

const openAddBrand = () => {
    toggleAddBrandModal();
};

const updateFormFiles = (pictures) => {
    form.pictures = pictures;
};

watch(
    () => form.brand,
    (newValue) => {
        getModels();
    }
);

watch(
    () => form.mileage,
    () => {}
);

provide('isAddBrandModalOpen', isAddBrandModalOpen);
provide('toggleAddBrandModal', toggleAddBrandModal);
provide('isAddModelModalOpen', isAddModelModalOpen);
provide('toggleAddModelModal', toggleAddModelModal);
provide('isAddParamValueModalOpen', isAddParamValueModalOpen);
provide('toggleAddParamValueModal', toggleAddParamValueModal);
provide('paramValueIdToAdd', paramValueIdToAdd);
</script>

<style lang="scss" scoped></style>
