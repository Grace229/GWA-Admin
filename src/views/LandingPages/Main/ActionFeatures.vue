<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 container text-[#FFFFFF] text-[32px] font-[510] py-[90px]">
        <div class="grid grid-cols-2 gap-6 w-full">
            <div  class="col-span-2 w-full leaseACar rounded-[10px] min-h-[208px]">
                <div class="cursor-pointer w-full h-full overlay flex justify-center items-end pb-[40px]">
                    <span>Dive Into Fitness</span>
                </div>
            </div>
            <div  class="col-span-2 w-full applyForFinancing rounded-[10px] min-h-[208px]">
                <div class="cursor-pointer w-full h-full overlay flex justify-center items-end pb-[40px]">
                    <span>Gain Access To Tennis Court</span>
                </div>
            </div>
        </div>

        <div class="min-h-[208px] cursor-pointer w-full sellACar rounded-[10px] h-full">
            <div class="w-full h-full overlay flex justify-center items-end pb-[40px]">
                <span>Join the Gym</span>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>

.leaseACar {
    background-image: url('@/assets/images/poool.jpg');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.applyForFinancing {
    background-image: url('@/assets/images/tennis.jpg');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.sellACar {
    background-image: url('@/assets/images/gym2.jpg');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.overlay {
    background: rgba(0, 0, 0, 0.42);
    border-radius: 10px;
}
</style>
