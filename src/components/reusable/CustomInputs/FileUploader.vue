<template>
    <div>
      <div
        @click="chooseFile"
        @drop.prevent="handleDrop($event)"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        :class="{ 'bg-gray-100': isDragOver }"
        class="w-full h-32 border border-dashed rounded-lg cursor-pointer flex items-center justify-center"
      >
        <div v-if="!previewUrl" class="text-gray-500 text-center">
          <p><span class="font-semibold text-blue-500">Click to upload</span> or drag and drop</p>
          <p class="text-xs">PNG or JPG (max. size 5MB)</p>
        </div>
        <img v-if="previewUrl" :src="previewUrl" class="max-w-full max-h-28 rounded-lg" />
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileChange"
          accept="image/png, image/jpeg"
        />
      </div>
      <button
        v-if="previewUrl"
        @click="removeFile"
        class="mt-2 px-4 py-1 text-white  rounded-lg"
      >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.3333 12.9993V12.3327C21.3333 11.3993 21.3333 10.9326 21.1517 10.576C20.9919 10.2624 20.7369 10.0075 20.4233 9.84767C20.0668 9.66602 19.6001 9.66602 18.6667 9.66602H17.3333C16.3999 9.66602 15.9332 9.66602 15.5767 9.84767C15.2631 10.0075 15.0081 10.2624 14.8483 10.576C14.6667 10.9326 14.6667 11.3993 14.6667 12.3327V12.9993M16.3333 17.5827V21.7493M19.6667 17.5827V21.7493M10.5 12.9993H25.5M23.8333 12.9993V22.3327C23.8333 23.7328 23.8333 24.4329 23.5608 24.9677C23.3212 25.4381 22.9387 25.8205 22.4683 26.0602C21.9335 26.3327 21.2335 26.3327 19.8333 26.3327H16.1667C14.7665 26.3327 14.0665 26.3327 13.5317 26.0602C13.0613 25.8205 12.6788 25.4381 12.4392 24.9677C12.1667 24.4329 12.1667 23.7328 12.1667 22.3327V12.9993"
                                stroke="#667085"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
      </button>
    </div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    emits: ["fileSelected"],
    setup(_, { emit }) {
      const fileInput = ref(null);
      const isDragOver = ref(false);
      const previewUrl = ref(null);
      const file = ref(null);
  
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
          file.value = selectedFile;
          console.log(file)
          setPreview(file.value)
          emit("fileSelected", file.value);
        }
      };
  
      const setPreview = (file) =>{
        if (file instanceof Blob) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      previewUrl.value = e.target.result; // Set image preview URL
    };
  } else {
    console.error("Invalid file type");
  }
      }

      const handleDrop = (event) => {
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.size <= 5 * 1024 * 1024) {
          file.value = droppedFile;
          setPreview(file.value)
          emit("fileSelected", file.value);
        }
        isDragOver.value = false;
      };
  
      const chooseFile = () => fileInput.value.click();
      const removeFile = () => {
        file.value = null;
        previewUrl.value = null;
        emit("fileSelected", null);
      };
      
  
      watch(previewUrl, (newVal) => {
        if (newVal) setPreview(newVal);
      });
  
      return {
        fileInput,
        isDragOver,
        previewUrl,
        chooseFile,
        handleFileChange,
        handleDrop,
        removeFile,
      };
    },
  };
  </script>
  
  <style scoped>
  .bg-gray-100 {
    background-color: #f3f4f6;
  }
  </style>
  