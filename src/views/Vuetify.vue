<template>
    <div class="bg-grey-400 py-20 h-full flex flex-col items-start justify-center">
        <!-- vuetify -->

        <span>Flutter</span>

        <div class="mt-4"><FlutterInline /></div>

        <!-- <input type="range" multiple min="0" max="100" step="5" value="20,50,80" /> -->
    </div>
</template>

<script setup>
import FlutterInline from '@/components/reusable/FlutterInline.vue';
import { reactive } from 'vue';
import AvatarInput from '/src/components/reusable/AvatarInput.vue';

const form = reactive({
    img: null,
});
// const image = ref([]);
// const imagePreview = ref('');

// const selectImage = async (e) => {
//     const file = e;
//     if (!file) return;
//     const readData = (f) =>
//         new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result);
//             reader.readAsDataURL(f);
//         });
//     const data = await readData(file);
//     imagePreview.value = data;
// };

// const clearImagePreview = async () => {
//     this.imagePreview = '';
// };
</script>

<style lang="scss" scoped></style>
