<template>
    <div>
        <div class="slider">
            <div class="progress"></div>
        </div>
        <div class="range-input">
            <input type="range" class="range-min" min="0" max="10000" value="2500" step="100" />
            <input type="range" class="range-max" min="0" max="10000" value="7500" step="100" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {});
const rangeInput = document.querySelectorAll('.range-input input'),
    priceInput = document.querySelectorAll('.price-input input'),
    range = document.querySelector('.slider .progress');
let priceGap = 10000;

priceInput.forEach((input) => {
    input.addEventListener('input', (e) => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
            if (e.target.className === 'input-min') {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + '%';
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + '%';
            }
        }
    });
});

rangeInput.forEach((input) => {
    input.addEventListener('input', (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === 'range-min') {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + '%';
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
        }
    });
});
</script>

<style lang="scss" scoped>
.slider {
    height: 5px;
    position: relative;
    background: #ddd;
    border-radius: 5px;
}
.slider .progress {
    height: 100%;
    left: 25%;
    right: 25%;
    position: absolute;
    // border-radius: 5px;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);
    border-radius: 12px;
}
.range-input {
    position: relative;
}
.range-input input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -5px;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
input[type='range']::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);

    pointer-events: auto;
    -webkit-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
input[type='range']::-moz-range-thumb {
    height: 17px;
    width: 17px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(270deg, #f60e0e 0.12%, #ffa800 99.99%);

    pointer-events: auto;
    -moz-appearance: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
</style>
