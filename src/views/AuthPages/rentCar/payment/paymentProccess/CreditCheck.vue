<template>
    <div>
        <SelectedCarCard />
        <div class="h-px bg-[#EAECF0] my-[25px]"></div>
        <div class="col-span-2 grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="BVN" class="block text-sm font-medium text-[#344054]">BVN</label>
                <div class="mt-1">
                    <input
                        type="text"
                        name="BVN"
                        id="BVN"
                        autocomplete="off"
                        v-model="v$.BVN.$model"
                        :class="{
                            errorBorder: v$.BVN?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="BVN-description"
                    />
                </div>

                <div class="text-red-400 mt-1 text-xs" v-for="error of v$.BVN.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div v-if="state.bvnIsVerified" const="" class="col-span-1">
                <label for="Tenor" class="block text-sm font-medium text-[#344054]">Tenor</label>
                <div class="mt-1">
                    <CustomSelect class="h-[44px]" :options="tenorMenu" v-model="form.Tenor" label="Select Tenor" />

                    <!-- <input
                        type="text"
                        name="Tenor"
                        id="Tenor"
                        autocomplete="off"
                        v-model="v$.Tenor.$model"
                        :class="{
                            errorBorder: v$.Tenor?.$errors[0]?.$message?.length > 0,
                        }"
                        class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                        aria-describedby="Tenor-description"
                    /> -->
                </div>

                <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.Tenor.$errors" :key="error.$uid">
                    <div class="text-red-400">
                        {{ error.$message }}
                    </div>
                </div> -->
            </div>
        </div>
        <!-- {{ bvnVerificationLoading }} -->
        <div class="mt-[26px]">
            <button
                v-if="!state.bvnIsVerified"
                @click="submit"
                :class="v$.$invalid ? 'opacity-25' : 'opacity-100'"
                :disabled="v$.$invalid"
                type="button"
                class="brandButton flex items-center justify-center rounded w-[177px] py-[10px] font-semi-bold text-[14px]"
            >
                Validate BVN

                <SpinnerLoader v-if="bvnVerificationLoading" class="ml-2 h-[14px] w-[14px]" />
            </button>

            <button
                v-if="state.bvnIsVerified"
                @click="submit"
                :class="v$.$invalid ? 'opacity-25' : 'opacity-100'"
                :disabled="v$.$invalid"
                type="button"
                class="brandButton flex items-center justify-center rounded w-[177px] py-[10px] font-semi-bold text-[14px]"
            >
                Next

                <SpinnerLoader v-if="bvnVerificationLoading" class="ml-2 h-[14px] w-[14px]" />
            </button>
        </div>
    </div>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';
import SelectedCarCard from '/src/components/reusable/SelectedCarCard.vue';
import { reactive, inject, ref, watch } from 'vue';
import { Log, Util } from '@/util';
import { verifyBvn } from '@/services/CheckoutServices.js';
import CustomSelect from '/src/components/reusable/CustomInputs/CustomSelect.vue';
import { tenorMenu } from '@/components/reusable/TenorMenu.js';
// const nextStep = inject('nextStep');
const loading = ref(false);
const bvnVerificationLoading = ref(false);
const state = inject('state');
const form = reactive({
    Tenor: '',
    BVN: '',
});

const rules = {
    // Tenor: {
    //     required: helpers.withMessage('Tenor is required', required),
    // },

    BVN: {
        required: helpers.withMessage('BVN is required', required),
        numeric: helpers.withMessage('BVN must be a number', numeric),
    },
};
const v$ = useVuelidate(rules, form);
const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;
    // console.log(form);
    bvnVerification();
    // loading.value = true;

    // // router.push(`/purchase-car/${carId.value}/account_details`);
    // nextStep();
    // loading.value = false;
};

const bvnVerification = () => {
    bvnVerificationLoading.value = true;
    verifyBvn(
        {
            bvnNumber: form.BVN,
        },
        (res) => {
            bvnVerificationLoading.value = false;
            if (res.data.data === true) {
                // checkoutCarPurchase();
                state.bvnIsVerified = true;
            } else {
                Util.handleGlobalAlert(true, 'failed', 'Invalid BVN');
            }
        },
        (err) => {
            bvnVerificationLoading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

watch(
    () => form.BVN,
    () => {
        state.bvnIsVerified = false;
    }
);
</script>

<style lang="scss" scoped></style>
