<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 container text-[#FFFFFF] text-[32px] font-[510] pb-[90px]">
        <div class="grid grid-cols-2 gap-6 w-full">
            <div @click="$router.push('rent')" class="col-span-2 sm:col-span-1 w-full carRenting rounded-[10px] min-h-[208px]">
                <div class="cursor-pointer w-full h-full overlay flex justify-center items-end pb-[40px]">
                    <span>Rent a car</span>
                </div>
            </div>
            <div @click="$router.push('lease')" class="col-span-2 sm:col-span-1 w-full leaseACar rounded-[10px] min-h-[208px]">
                <div class="cursor-pointer w-full h-full overlay flex justify-center items-end pb-[40px]">
                    <span>Lease a car</span>
                </div>
            </div>
            <div @click="$router.push('/search')" class="col-span-2 w-full applyForFinancing rounded-[10px] min-h-[208px]">
                <div class="cursor-pointer w-full h-full overlay flex justify-center items-end pb-[40px]">
                    <span>Apply for Financing</span>
                </div>
            </div>
        </div>

        <div @click="$router.push('buy')" class="min-h-[208px] cursor-pointer w-full applyForFinancing rounded-[10px] h-full">
            <div class="w-full h-full overlay flex justify-center items-end pb-[40px]">
                <span>Sell a car</span>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.carRenting {
    background-image: url('@/assets/images/CarRenting.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.leaseACar {
    background-image: url('@/assets/images/RentACar.png');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.applyForFinancing {
    background-image: url('@/assets/images/ApplyForFinancing.png');
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
