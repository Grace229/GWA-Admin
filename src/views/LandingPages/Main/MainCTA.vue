<template>
    <div class="bgImg">
        <div class="h-full w-full overlay">
            <div class="container py-[154px] grid grid-cols-1 gap-6 h1-p-text">
                <h1 class="font-bold text-[#FFFFFF] leading-[60px] md:w-[544px]">Make money on the move.</h1>

                <p class="mb-[25px] font-normal text-[#F2F4F7] md:w-[480px]">Make more money when you sell your vehicles on Altdrive. Upload vehicles and set prices that work for you.</p>

                <GetStartedBtn class="w-[206px]" />
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bgImg {
    background-image: url('/src/assets/images/MainCTA.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.overlay {
    // mix-blend-mode: normal;
    // opacity: 0.78;
    background: rgba(0, 0, 0, 0.63);
}
</style>
