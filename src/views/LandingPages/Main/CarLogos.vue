<template>
    <div class="bg-[#FFFFFF] pt-[60px] pb-[45px]">
        <div class="container">
            <div class="flex items-center justify-between">
                <div class="image-container" v-for="carLogo in carLogos" :key="carLogo"><img :src="carLogo" alt="" /></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const carLogos = [
    '/Logos/BMW.png',
    '/Logos/lexus.png',
    '/Logos/Hyundai.png',
    '/Logos/Nissan.png',
    '/Logos/Peugeot.png',
    '/Logos/Mercedes.png',
    '/Logos/Kia.png',
    '/Logos/Jag.png',
    '/Logos/Toyota.png',
    '/Logos/Honda.png',
];
</script>

<style lang="scss" scoped>
.image-container {
    max-width: 300px; /* Set the maximum width of the container */
}

.image-container img {
    max-width: 100%; /* Set the maximum width of the image to 100% of its parent container */
    height: auto; /* Allow the height to adjust proportionally */
}
</style>
