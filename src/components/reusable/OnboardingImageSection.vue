<template>
    <div class="relative flex items-center justify-end bgImg">
        <div class="h-full w-full overlay">
            <div class="mt-[239px] px-[120px]">
                <h1 class="text-[#FFFFFF] font-bold text-[64px] leading-[90px] mb-4">Your Fitness, Your Way</h1>
                <p class="text-[#FCFCFD] font-normal text-xl leading-[30px]">Customize workouts to match your goals! Strength! flexibility & endurance.</p>
            </div>
            <!-- <img src="/src/assets/images/AltDriveOnboarding.png" class="z-[99] h-full" /> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    background: linear-gradient(26.57deg, #1d2939 8.33%, #344054 91.67%);
    mix-blend-mode: normal;
    opacity: 0.78;
}

.bgImg {
    background-image: url('/src/assets/images/AdminOnboarding.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
