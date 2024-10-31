<template>
    <div class="">
        <div class="mb-4 flex flex-col xl:flex-row items-start justify-start gap-4 w-full">
            <div
                id="dropZone"
                @click="chooseFiles"
                @drop.prevent="dropHandler($event)"
                @dragover.prevent="setIsDragOver(true)"
                @dragleave.prevent="setIsDragOver(false)"
                :class="{ '!bg-gray-100': isDragOver }"
                class="flex scopedMaxWidth flex-col items-center justify-center w-full h-[126px] bg-[#FFFFFF] border border-dashed rounded-lg cursor-pointer"
            >
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
                <input @change="onFileSelected" id="dropzone-file" multiple type="file" class="hidden" accept=".pdf, .jpg, .png" />
            </div>

            <div class="w-[250px] order-first xl:order-last">
                <label for="Document Type" class="block text-sm font-medium text-[#344054]">Document Type</label>
                <div class="mt-1">
                    <IdSelect class="h-[44px]" :options="Constants.docTypes" v-model="docType" label="Select Document Type" :modelValue="docType" />
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-3 scopedMaxWidth">
            <div v-for="file in allFiles" :key="file.name" class="border border-[#B9C0D4] bg-[#ffffff] rounded-xl">
                <div class="flex gap-4 p-4 pb-5 relative">
                    <div>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="32" height="32" rx="16" fill="#EFF1F5" />
                            <path
                                d="M19.3334 11.5129V14.2666C19.3334 14.64 19.3334 14.8266 19.4061 14.9692C19.47 15.0947 19.572 15.1967 19.6974 15.2606C19.84 15.3333 20.0267 15.3333 20.4001 15.3333H23.1538M23.3334 16.6587V21.4666C23.3334 22.5867 23.3334 23.1467 23.1154 23.5746C22.9237 23.9509 22.6177 24.2569 22.2414 24.4486C21.8136 24.6666 21.2535 24.6666 20.1334 24.6666H15.8667C14.7466 24.6666 14.1866 24.6666 13.7588 24.4486C13.3824 24.2569 13.0765 23.9509 12.8847 23.5746C12.6667 23.1467 12.6667 22.5867 12.6667 21.4666V14.5333C12.6667 13.4131 12.6667 12.8531 12.8847 12.4253C13.0765 12.0489 13.3824 11.743 13.7588 11.5512C14.1866 11.3333 14.7466 11.3333 15.8667 11.3333H18.0079C18.4971 11.3333 18.7417 11.3333 18.9719 11.3885C19.176 11.4375 19.371 11.5183 19.55 11.628C19.7518 11.7517 19.9248 11.9246 20.2707 12.2705L22.3962 14.396C22.7421 14.7419 22.915 14.9148 23.0387 15.1167C23.1484 15.2956 23.2292 15.4907 23.2782 15.6948C23.3334 15.925 23.3334 16.1696 23.3334 16.6587Z"
                                stroke="#4A5578"
                                stroke-width="1.33333"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <rect x="2" y="2" width="32" height="32" rx="16" stroke="#F9F9FB" stroke-width="4" />
                        </svg>
                    </div>
                    <div class="flex flex-col flex-1">
                        <span class="truncate font-medium text-sm text-[#344054] max-w-[400px]">{{ file.name }}</span>
                        <!-- <span class="font-normal text-sm text-[#475467]">{{ humanFileSize(file.size) }}</span> -->
                        <div class="mt-[6px] flex gap-4 items-center">
                            <ProgressBar :progressValue="file.uploadProgress" :fileId="file.fileId" />
                            <span class="text-[#344054] font-medium text-sm">{{ file.uploadProgress }}%</span>
                        </div>
                    </div>
                    <div @click="deleteImageBeforeUpload(file)" class="absolute right-2 top-2 max-h-[36px] cursor-pointer ml-auto">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.3333 12.9993V12.3327C21.3333 11.3993 21.3333 10.9326 21.1517 10.576C20.9919 10.2624 20.7369 10.0075 20.4233 9.84767C20.0668 9.66602 19.6001 9.66602 18.6667 9.66602H17.3333C16.3999 9.66602 15.9332 9.66602 15.5767 9.84767C15.2631 10.0075 15.0081 10.2624 14.8483 10.576C14.6667 10.9326 14.6667 11.3993 14.6667 12.3327V12.9993M16.3333 17.5827V21.7493M19.6667 17.5827V21.7493M10.5 12.9993H25.5M23.8333 12.9993V22.3327C23.8333 23.7328 23.8333 24.4329 23.5608 24.9677C23.3212 25.4381 22.9387 25.8205 22.4683 26.0602C21.9335 26.3327 21.2335 26.3327 19.8333 26.3327H16.1667C14.7665 26.3327 14.0665 26.3327 13.5317 26.0602C13.0613 25.8205 12.6788 25.4381 12.4392 24.9677C12.1667 24.4329 12.1667 23.7328 12.1667 22.3327V12.9993"
                                stroke="#667085"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="scopedMaxWidth" v-if="uploadedFiles.length === 0 && docsLoading">
                <SpinnerLoader class="mx-auto my-20 h-[50px] w-[50px]" />
            </div>
            <div v-else-if="uploadedFiles.length === 0 && !docsLoading" class="scopedMaxWidth py-20 w-full bg-white flex flex-col items-center justify-center">
                <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
            </div>
            <div class="flex flex-col gap-3 scopedMaxWidth">
                <div v-for="file in uploadedFiles" :key="file.photoname" class="border border-[#F2F4F7] bg-[#ffffff] rounded-xl">
                    <!-- <span>{{ extractUrlPath(file.fileUrl) }}</span> -->
                    <!-- <span>{{ file }}</span> -->
                    <!-- {{ extractUrlPath(file.fileUrl) }} -->
                    <div class="flex gap-4 p-5">
                        <div>
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M13 12H5M13 16H5M7 8H5M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z"
                                    stroke="#344054"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div class="flex flex-1">
                            <span class="truncate font-medium text-sm text-[#344054] max-w-[400px]">{{ file.photoname }}</span>
                            <!-- <span class="font-normal text-xs text-[#98A2B3]">{{ file.size ? humanFileSize(file.size) : '' }}</span> -->
                            <div class="ml-[auto] flex gap-4 items-center">
                                <!-- {{ file.photoname }} -->
                                <span @click="viewReport(file)" class="cursor-pointer font-medium text-xs text-[#4A5578]">View Report</span>
                                <span class="cursor-pointer font-medium text-xs text-[#4A5578]"><a :href="file.fileUrl" id="download-link" download>Download</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ViewDocumentModal />
    </div>
</template>
<script setup>
import IdSelect from '@/components/reusable/CustomInputs/IdSelect.vue';
import { uploadOrderDoc, getOrderDocs } from '@/services/AdminServices.js';
import ViewDocumentModal from '@/views/admin/adminViews/reusable/ViewDocumentModal.vue';
// import { uploadOrderDoc } from '@/services/VendorServices.js';
import ProgressBar from '/src/components/reusable/ProgressBar.vue';
import { Log, Constants } from '/src/util';
import { ref, reactive, watch, defineEmits, inject, onMounted, provide } from 'vue';
import { v4 as uuidv4 } from 'uuid';
onMounted(() => {
    // downloadFile();
    // downloader();
    getOrderDocuments();
    populateUploadedFiles();
});
const allFiles = ref([]);
const docsLoading = ref(false);
const isViewerOpen = ref(false);
const toggleViewer = () => {
    isViewerOpen.value = !isViewerOpen.value;
};
const docType = ref(1);
const selectedDocForViewing = ref({});

const viewReport = (file) => {
    selectedDocForViewing.value = file;
    toggleViewer();
};
const uploadedFiles = inject('uploadedFiles');
const orderId = inject('orderId');

const isDragOver = ref(false);
const fileInputButton = ref({});
const form = inject('form');
const emits = defineEmits(['filesUpdated']);

const pushSelectedFiles = (files) => {
    Object.entries(files).forEach(([key, value]) => {
        let reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = (e) => {
            let res = e.target.result;
            let file = reactive({
                size: value.size,
                name: value.name,
                src: res,
                base64Photo: res.split(',')[1],
                fileId: uuidv4(),
                uploadProgress: 0,
            });
            allFiles.value.push(file);
            vehicleUpload(file);
        };
    });
};

const populateUploadedFiles = () => {
    uploadedFiles.value = form.documents;
};
const onFileSelected = (e) => {
    console.log(e);
    const selectedFiles = e.target.files;
    pushSelectedFiles(selectedFiles);
    isDragOver.value = false;
};
const dropHandler = (e) => {
    const droppedFiles = e.dataTransfer.files;
    pushSelectedFiles(droppedFiles);
    isDragOver.value = false;
};
const limitedInterval = (file) => {
    // file.uploadProgress = 0;
    file.uploadProgress += 15;
    // console.log(file.uploadProgress);
    if (file.uploadProgress >= 90) {
        clearInterval(limitedInterval);
        return;
    }
};
function extractUrlPath(url) {
    const parts = url.split('/');
    const startIndex = 3; // start from the third slash
    const endIndex = parts.length - 1; // end at the last part
    const pathParts = parts.slice(startIndex, endIndex + 1);
    return '/' + pathParts.join('/');
}

function getFileExtension(filename) {
    return '.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}
const vehicleUpload = (file) => {
    //keep inncreasing progress

    setInterval(limitedInterval(file), 1000);
    const fileToUpload = file;
    uploadOrderDoc(
        {
            orderId: orderId.value,
            documentName: fileToUpload.name,
            fileExtension: getFileExtension(fileToUpload.name),
            base64string: fileToUpload.base64Photo,
            documentType: Number(docType.value),
        },
        (res) => {
            const data = res.data.data;
            file.uploadProgress = 100;
            const obj = {
                fileName: data.fileName,
                fileUrl: data.url,

                photoname: data.documentName,
                // size: file.size,
            };
            //we may need to check if file is still in allFiles
            //and hasnt been deleted
            allFiles.value = allFiles.value.filter((item) => item.fileId !== file.fileId);
            uploadedFiles.value.unshift(obj);
        },
        (err) => {}
    );
};

const getOrderDocuments = () => {
    docsLoading.value = true;
    getOrderDocs(
        {
            orderId: orderId.value,
        },
        (res) => {
            docsLoading.value = false;

            const orderDocs = res.data.data.map((file) => {
                const obj = {
                    fileName: file.fileName,
                    fileUrl: file.url,

                    photoname: file.documentName,
                };
                return obj;
            });
            uploadedFiles.value = [...orderDocs, ...uploadedFiles.value];
        },
        (err) => {
            docsLoading.value = false;
        }
    );
};

// const humanFileSize = (size) => {
//     const i = Math.floor(Math.log(size) / Math.log(1024));
//     return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
// };
const deleteImageBeforeUpload = (file) => {
    allFiles.value = allFiles.value.filter((f) => f !== file);
};
const deleteImageAfterUpload = (fileName) => {
    uploadedFiles.value = uploadedFiles.value.filter((file) => file.fileName !== fileName);
};
const setIsDragOver = (bool) => {
    isDragOver.value = bool;
};
const chooseFiles = () => {
    fileInputButton.value = document.getElementById('dropzone-file');
    fileInputButton.value.click();
};

const setDefault = (fileName) => {
    let itemToPushToFront = null; // item to push to front of array
    let propToMatch = 'isDefault'; // property to match
    uploadedFiles.value.forEach((image) => {
        if (image.fileName === fileName) {
            image.isDefault = true;
            itemToPushToFront = image;
            let index = uploadedFiles.value.findIndex((item) => item[propToMatch] === itemToPushToFront[propToMatch]); // get index of item with matching property
            if (index !== -1) {
                uploadedFiles.value.splice(index, 1); // remove item from original position
                uploadedFiles.value.unshift(itemToPushToFront); // add item to front of array
            }
        } else {
            image.isDefault = false;
        }
    });
};

watch(
    uploadedFiles,
    (newValue) => {
        emits('filesUpdated', newValue);
    },
    { deep: true }
);

provide('toggleViewer', toggleViewer);
provide('isViewerOpen', isViewerOpen);
provide('selectedDocForViewing', selectedDocForViewing);
</script>
<style lang="scss" scoped>
.dragOverCss {
    background-color: rgb(111, 109, 109);
}

.scopedMaxWidth {
    max-width: 696px;
}
</style>
