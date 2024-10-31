<template>
    <div class="grid grid-cols-1">
        <div class="relative">
            <!-- <div class="absolute right-0 top-0"> -->
            <!-- <button class="carousel__prev z-20" @click="prev">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </button>
            <button class="carousel__next z-20 text-red-400" @click="next">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                    />
                </svg>
            </button> -->
            <!-- </div> -->
            <!-- <Carousel :items-to-show="1" :wrap-around="false">
                <Slide v-for="slide in 10" :key="slide">
                    <div class="carousel__item">{{ slide }}</div>
                </Slide>

            </Carousel> -->

            <Carousel ref="myCarousel" class="carousel-container" id="gallery" :items-to-show="1" :wrap-around="false" v-model="slideIndex">
                <Slide class="h-full !w-[100%] !mr-[0px] rounded-lg" v-for="slide in car.pictures" :key="slide">
                    <!-- <div class="carousel__item">{{ slide }}</div> -->
                    <div
                        :style="{
                            'background-image': 'url(' + `${slide.fileUrl}` + ')',
                        }"
                        class="carousel-container bgImg h-full carousel__item rounded-lg !w-[100%]"
                    >
                        <!-- <img class="rounded-t-lg !w-[100%] text-center" :src="slide" :alt="car.make" /> -->
                    </div>
                </Slide>
                <!-- 
                <template #addons>
                    <Navigation style="color: red" />
                </template> -->
                <template #addons>
                    <navigation>
                        <template #next>
                            <CarouselNext class="text-white" />
                        </template>
                        <template #prev> <CarouselPrev class="text-white" /></template>
                    </navigation>
                </template>
            </Carousel>

            <div class="hidden md:block" v-if="car.pictures.length > 2">
                <div class="mt-[10px]"></div>
                <Carousel id="thumbnails" :items-to-show="6" :wrap-around="true" v-model="slideIndex" ref="carousel">
                    <Slide v-for="(slide, index) in car.pictures" :key="slide">
                        <!-- {{ index }} -->
                        <div class="carousel__item" @click="slideTo(index)">
                            <img class="rounded-lg h-[80px] !w-[100%] text-center" :src="slide.fileUrl" :alt="slide.photoName" />
                        </div>
                    </Slide>
                </Carousel>
            </div>
            <div v-else class="absolute inset-x-0 bottom-0 w-full flex items-center justify-center gap-[7px] mb-[15px]">
                <button
                    v-for="(content, index) in car.pictures"
                    :key="content"
                    :class="car.pictures[slideIndex] === car.pictures[index] ? 'bg-white' : 'inactivePagination'"
                    @click="changeView(index)"
                    class="bottom-2 h-[6px] w-[6px] rounded-[100%] bg-white"
                ></button>
            </div>
        </div>

        <!-- des:{{ car.description }} -->
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, defineProps } from 'vue';
import CarouselPrev from '/src/components/reusable/CarouselPrev.vue';
import CarouselNext from '/src/components/reusable/CarouselNext.vue';
const props = defineProps(['car']);
const myCarousel = ref(null);
const slideIndex = ref(0);
const changeView = (index) => {
    slideIndex.value = index;
};

const prev = () => {
    myCarousel.value.prev();
};

const next = () => {
    myCarousel.value.next();
};
// const car = {
//     id: 1,
//     make: '2017 BMW X5',
//     mileage: '58,911 mi',
//     location: 'Lagos',
//     locallyUsed: false,
//     price: '$68,987',
//     pictures: ['/Car2.png', '/Car1.png', '/Car2.png', '/Car1.png', '/Car2.png', '/Car1.png'],
// };

const slideTo = (val) => {
    slideIndex.value = val;
    // console.log(val);
};
</script>

<style lang="scss" scoped>
.carousel-container {
    height: 442px;
}
.carousel__item {
    // min-height: 400px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    // padding: 10px;
    margin-right: 5px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}

.bgImg {
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

// .carousel__prev,
// .carousel__next {
//     box-sizing: content-box;
//     background: var(--vc-nav-background);
//     border-radius: var(--vc-nav-border-radius);
//     width: var(--vc-nav-width);
//     height: var(--vc-nav-height);
//     text-align: center;
//     font-size: var(--vc-nav-height);
//     padding: 0;
//     color: red;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     border: 0;
//     cursor: pointer;
//     margin: 0 10px;
//     top: 50%;
//     transform: translateY(-50%);
// }
</style>
<style>
.carousel__next {
    color: #ff6600;
}
.carousel__next:hover {
    color: #ff6600;
}

.carousel__prev {
    color: #ff6600;
}
.carousel__prev:hover {
    color: #ff6600;
}
</style>
