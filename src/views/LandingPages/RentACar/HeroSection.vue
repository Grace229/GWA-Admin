<template>
    <div class="bgImg">
        <div class="h-full w-full overlay">
            <div class="container py-[154px] grid grid-cols-1 gap-6">
                <h1 class="font-bold text-[48px] md:text-[60px] text-[#FFFFFF] leading-[60px] md:w-[472px]">Rent Now and Pay Monthly</h1>

                <p class="mb-[25px] font-normal text:[18px] md:text-[20px] text-[#F2F4F7] md:w-[480px]">Up to 48 months repayment period</p>

                <GetStartedBtn class="w-[206px]" />
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bgImg {
    background-image: url('/src/assets/images/RentCar.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.overlay {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(270deg, rgba(246, 14, 14, 0.3) 0.12%, rgba(255, 168, 0, 0.3) 99.99%);
}
</style>
