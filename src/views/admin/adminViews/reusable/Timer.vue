<template>
    <div class="font-semibold">
        {{ formattedTime.slice(1, formattedTime.length) }}
    </div>
</template>

<script setup>
import { ref, watchEffect, computed, inject } from 'vue';
const time = ref(90); // 90 seconds
const intervalId = ref(null);
const startTimerFlag = inject('startTimerFlag');
const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const clear = () => {
    startTimerFlag.value = false;
    clearInterval(intervalId.value);
};

const startTimer = () => {
    intervalId.value = setInterval(() => {
        if (time.value > 1) {
            // console.log(startTimerFlag.value);
            time.value--;
        } else {
            // console.log(startTimerFlag.value);
            clear();
        }
    }, 1000); // 1 second
};

watchEffect(() => {
    startTimer();
    return () => clear();
});

// watch(time, (newValue) => []);
</script>

<style lang="scss" scoped></style>
