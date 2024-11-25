<template>
    <TransitionRoot class="fixed inset-0 z-[10000] overflow-y-auto" as="template" :show="isAddAndEditOpen">
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
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white py-[21px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[600px]">
                            <div>
                                
                                <div class="mb-5 px-[20px] flex items-center justify-between">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold text-[#18273A]">{{ toggleAddAndEditModalText.title }}</DialogTitle>
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
                            <div class="mt-[20px] flex flex-col gap-3 mb-[10px] px-[20px]">
                                <!-- {{ toggleAddAndEditModalText.fee.amount }} -->
                                <!-- form:{{ form }} -->
                                <div class="grid grid-cols-2 gap-6">
                                    <div class="col-span-2 grid grid-cols-2 gap-4">
                                        <div class="col-span-1">
                                            <label for="name" class="block text-sm font-medium text-[#344054]">Name</label>
                                            <div class="mt-1">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autocomplete="off"
                                                    v-model="v$.name.$model"
                                                    :class="{
                                                        errorBorder: v$.name?.$errors[0]?.$message?.length > 0,
                                                    }"
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="name-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.name.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-span-1">
                                            <label for="amount" class="block text-sm font-medium text-[#344054]">Amount</label>
                                            <div class="mt-1">
                                                <CurrencyInput
                                                    id="feeAmount"
                                                    v-model="form.amount"
                                                    :options="{
                                                        currency: 'ngn',

                                                        hideCurrencySymbolOnFocus: false,
                                                        hideGroupingSeparatorOnFocus: false,
                                                        hideNegligibleDecimalDigitsOnFocus: false,
                                                    }"
                                                    :classStyle="['!rounded-[8px]']"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.amount.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-span-1" v-if="toggleAddAndEditModalText.title === 'Edit Subscription' || toggleAddAndEditModalText.title === 'New Subscription'">
                                            <label for="duration" class="block text-sm font-medium text-[#344054]">Duration</label>
                                            <div class="mt-1">
                                                <input
                                                    type="number"
                                                    name="duration"
                                                    id="duration"
                                                    autocomplete="off"
                                                    v-model="v$.duration.$model"
                                                    :class="{
                                                        errorBorder: v$.duration?.$errors[0]?.$message?.length > 0,
                                                    }"
                                                    class="block w-full border-gray-300 focus:border-gray-400 rounded-[8px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                                    aria-describedby="name-description"
                                                />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.name.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="col-span-1" v-if="toggleAddAndEditModalText.title === 'Edit Subscription' || toggleAddAndEditModalText.title === 'New Subscription'">
                                            <label for="amount" class="block text-sm font-medium text-[#344054]">Services</label>
                                            <div class="mt-1">
                                               <CustomSelect v-model="selectedOptions" :options="options" />
                                            </div>

                                            <div class="text-red-400 mt-1 text-xs" v-for="error of v$.amount.$errors" :key="error.$uid">
                                                <div class="text-red-400">
                                                    {{ error.$message }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="" :class="{ 'input--error': v$.pictures.$errors }">
                                            <FileUploader @fileSelected="handleFile" />

                        <div class="text-red-400 mt-1 text-xs" v-for="error of v$.pictures.$errors" :key="error.$uid">
                            <div class="text-red-400">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>

                                        <div class="col-span-2 mt-[14px]">
                                            <button @click="submit" type="button" class="brandButton flex items-center justify-center rounded-lg w-full py-[10px] font-semi-bold text-[14px]">
                                                {{ toggleAddAndEditModalText.buttonText }}

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
import { ref, inject, reactive, watch, defineEmits } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import CurrencyInput from '@/components/reusable/CustomInputs/CurrencyInput.vue';
import FileUploader from '@/components/reusable/CustomInputs/FileUploader.vue';
import CustomSelect from './CustomSelect.vue';
// import { duration } from 'moment';
const props = defineProps({
  fee: {
    type: Object,
    required: false,
  },
});
const emits = defineEmits(['proceed']);

const isAddAndEditOpen = inject('isAddAndEditOpen');
const actionLoading = inject('actionLoading');
const toggleAddAndEditModal = inject('toggleAddAndEditModal');
const toggleAddAndEditModalText = inject('toggleAddAndEditModalText');
const close = () => {
    toggleAddAndEditModal();
};

const form = reactive({
    amount: 0,
    name: '',
    pictures: '',
    duration: 0,
    // selectedOptions: []
    
});
const selectedOptions = ref([]);
const isRecurring = ref(false)
const options = ref([
  { label: 'Gym', value: 'Gym' },
  { label: 'Swimming Pool', value: 'Swimming Pool' },
  { label: 'Tennis', value: 'Tennis' }
]);
const rules = {
    amount: {
        required: helpers.withMessage('Amount is required', required),
    },

    name: {
        required: helpers.withMessage('Name is required', required),
    },
    duration: {
        required: helpers.withMessage('Duration is required', required),
    },
    pictures: {
        required: helpers.withMessage('Picture is required', required),
        // minLength: helpers.withMessage('Picture must be uploaded', minLength(1)),
    },
};
const handleFile = (file) => {
    console.log(file)
    form.pictures = file;
};

const v$ = useVuelidate(rules, form);

const submit = async () => {
    const validity = await v$.value.$validate();
    if (!validity) return;

    if (toggleAddAndEditModalText.value.title === 'Edit Subscription') {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.amount);
        formData.append('isRecurring', isRecurring.value);
        formData.append('durationInMonths', form.duration);
      selectedOptions.value.forEach((service) => {
    formData.append('services[]', service);
});
        formData.append('image', form.pictures);
        emits('proceed', { action: 'Edit Fees', data: formData });
    }

    if (toggleAddAndEditModalText.value.title === 'New Subscription') {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.amount);
        formData.append('isRecurring', isRecurring.value);
        formData.append('durationInMonths', form.duration);
      selectedOptions.value.forEach((service) => {
    formData.append('services[]', service);
});
        formData.append('image', form.pictures);

        emits('proceed', { action: 'New Fees', data: formData });
    }

    if (toggleAddAndEditModalText.value.title === 'New AddOns') {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.amount);
        // formData.append('isRecurring', isRecurring.value);
        // formData.append('durationInMonths', form.duration);
//       selectedOptions.value.forEach((service) => {
//     formData.append('services[]', service);
// });
        formData.append('image', form.pictures);
        emits('proceed', { action: 'New Commission', data: formData });
    }
    if (toggleAddAndEditModalText.value.title === 'Edit AddOns') {
        const id = toggleAddAndEditModalText.value.commission.id
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.amount);
        formData.append('image', form.pictures);
      
        emits('proceed', { action: 'Edit Commission', id, data: formData });
    }

    // close();
};

watch(isAddAndEditOpen, (newValue) => {
    if (newValue === true && toggleAddAndEditModalText.value.title === 'Edit Subscription') {
        //populate form inputs edit data

        form.amount = toggleAddAndEditModalText.value.fee.price;
        form.name = toggleAddAndEditModalText.value.fee.name;
        form.duration = toggleAddAndEditModalText.value.fee.durationInMonths; // Assuming duration is part of fee
        selectedOptions.value = toggleAddAndEditModalText.value.fee.services || [];
    }

    if (newValue === true && toggleAddAndEditModalText.value.title === 'Edit AddOns') {
        //populate form inputs edit data

        form.amount = toggleAddAndEditModalText.value.commission.price;
        form.name = toggleAddAndEditModalText.value.commission.name;
    }
    // else {
    //set initial add fee form state to default values
    // form.amount = 0;
    // form.name = '';
    // }

    if (newValue === false) {
        form.amount = 0;
        form.name = '';
    }
});
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
