<template>
    <div class="mx-6 max-w-[426px] w-full my-[40px] sm:my-[117px]">
        <div class="mb-[72px]">
            <Logo class="logoClass" />
        </div>
        <div class="grid grid-cols-1 gap-2">
            <div class="text-3xl font-semibold text-gray-800">Get Started</div>
            <p class="font-normal text-lg text-gray-600">To begin this journey, tell us what type of account you’d be opening.</p>
            <div class="mt-[27px] flex flex-col sm:flex-row gap-[28px]">
                <div
                    @click="accountType = option.name"
                    v-for="option in options"
                    :key="option.name"
                    :class="option.name === accountType ? 'active' : 'inactive'"
                    class="cursor-pointer flex flex-col text-center rounded-[6px] items-center justify-between gap-4 pt-[33px] px-[17.84px] pb-[29px]"
                >
                    <div>
                        <img :src="option.icon" class="z-[99] h-full" />
                    </div>
                    <div class="flex flex-grow flex-col">
                        <h4 class="text-gray-900 font-medium text-base">{{ option.name }}</h4>
                        <p class="text-sm text-gray-500 font-normal mt-1">{{ option.info }}</p>
                    </div>
                    <!-- <div class="hidden"><Tick :active="option.name === accountType" /></div> -->
                </div>
            </div>

            <button @click="goNext($route)" class="w-full brandButton mt-[32px]">Next</button>
            <p @click="$router.push('/login')" class="cursor-pointer mt-[26px] text-center text-[#8692A6] font-normal text-sm">Already have an account? <span class="text-[#F23B55]">Sign In</span></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import Tick from '/src/assets/svg/UserTypeTick.vue'
import Logo from '/src/components/reusable/SterlingLogo.vue';

const router = useRouter();
const accountType = ref('Individual');

const options = [
    {
        name: 'Individual',
        icon: 'IndividualUser.png',
        info: 'Personal account to manage all you activities.',
    },
    {
        name: 'Vendor',
        icon: 'VendorCar.png',
        info: 'Own or belong to a company, this is for you.',
    },
];

const goNext = (route) => {
    // console.log(accountType)
    if (accountType.value === 'Individual') {
        if (route.query.redirected_from) {
            router.push(`/signup/individual?redirected_from=${route.query.redirected_from}`);
        } else {
            router.push('/signup/individual');
        }
    }

    if (accountType.value === 'Vendor') {
        if (route.query.redirected_from) {
            router.push(`/vendor-signup/provide-contacts?redirected_from=${route.query.redirected_from}`);
        } else {
            router.push('/vendor-signup/provide-contacts');
        }
    }
};
</script>

<style lang="scss" scoped>
.active {
    background: #f5f9ff;
    /* Gray cool / 400 */

    border: 1px solid #7d89b0;
    box-shadow: 0px 4px 14px 1px rgba(0, 0, 0, 0.04);
}
.inactive {
    background: #ffffff;
    /* Gray/100 */

    border: 1px solid #f2f4f7;
    /* Shadow/xs */

    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
    border-radius: 6px;
}
</style>
