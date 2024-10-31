<template>
    <TransitionRoot as="template" :show="open">
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
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[400px] sm:py-6">
                            <div class="border-b pb-3 mb-4 px-4">Add Custom Option</div>

                            <div class="px-4 grid grid-cols-1 gap-4">
                                <div class="col-span-">
                                    <label for="name" class="block text-sm font-medium text-[#344054]">Option Name</label>
                                    <div class="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autocomplete="off"
                                            v-model="form.value"
                                            class="block w-full border-gray-300 focus:border-gray-400 rounded-[4px] shadow-xs focus:outline-none focus:ring-0 sm:text-sm text-gray-900 font-normal"
                                            aria-describedby="name-description"
                                        />
                                    </div>

                                    <!-- <div class="text-red-400 mt-1 text-xs" v-for="error of v$.name.$errors" :key="error.$uid">
                                        <div class="text-red-400">
                                            {{ error.$message }}
                                        </div>
                                    </div> -->
                                </div>
                            </div>

                            <div class="px-4 mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                <button
                                    class="mt-3 flex items-center justify-center w-full rounded-lg bg-white px-3 py-[10px] text-base font-semibold text-[#344054] shadow-sm hover:bg-gray-50 sm:mt-0 border !ring-0 outline-none"
                                    @click="close"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    :disabled="loading || form.value.length === 0"
                                    :class="loading || form.value.length === 0 ? 'opacity-25' : 'opacity-100'"
                                    class="bg-[#12B76A] flex items-center justify-center w-full rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm"
                                    @click="submit"
                                >
                                    Add Option <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { inject, reactive, ref, computed } from 'vue';
import { Log, Util } from '@/util';
// import useVuelidate from '@vuelidate/core';
// import { required, helpers, numeric, maxLength, minLength, minValue } from '@vuelidate/validators';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { createParamValue } from '@/services/ParameterServices.js';

const open = inject('isAddParamValueModalOpen');
const paramValueIdToAdd = inject('paramValueIdToAdd');
const getParameters = inject('getParameters');
const toggleAddParamValueModal = inject('toggleAddParamValueModal');
const loading = ref(false);

const form = reactive({
    value: '',
    parameterId: computed(() => paramValueIdToAdd.value),
});

const submit = async () => {
    loading.value = true;
    createParamValue(
        form,
        (res) => {
            getParameters();
            close();
            loading.value = false;
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);

            close();
        }
    );

    // nextStep();
};

const close = () => {
    form.value = '';
    toggleAddParamValueModal();
};
</script>
