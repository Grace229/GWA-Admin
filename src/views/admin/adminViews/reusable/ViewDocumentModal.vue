<template>
    <TransitionRoot class="fixed inset-0 z-[10000] overflow-y-auto" as="template" :show="isViewerOpen">
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
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white py-[21px] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[800px] min-h-[600px]">
                            <div>
                                <div class="mb-5 px-[20px] flex items-center justify-between">
                                    <DialogTitle as="h3" class="text-[18px] font-semibold text-[#18273A]">Viewer</DialogTitle>
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
                            <div class="mt-[20px] flex flex-col gap-3 mb-[10px] px-[20px] overflow-auto">
                                <!-- {{ toggleViewerText.fee.amount }} -->
                                <!-- form:{{ form }} -->
                                <!-- viewer {{ selectedDocForViewing }} -->
                                <iframe class="h-[500px]" :src="selectedDocForViewing.fileUrl" frameborder="0"></iframe>
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

const isViewerOpen = inject('isViewerOpen');
const selectedDocForViewing = inject('selectedDocForViewing');
const toggleViewer = inject('toggleViewer');
const close = () => {
    toggleViewer();
};

// function resizeIframe(iframe) {
//     const height = iframe.contentWindow.document.body.scrollHeight;
//     iframe.style.height = `${height}px`;
// }
// watch(isViewerOpen, (newValue) => {

// });
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
