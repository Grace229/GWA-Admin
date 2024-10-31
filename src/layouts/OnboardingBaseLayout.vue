<template>
    <div class="h-screen overflow-y-auto bg-white">
        <div class="flex overflow-y-auto min-h-screen">
            <!-- <div class="py-10 px-6 sm:px-20 w-full sm:min-w-[450px] mx-auto lg:w-[40rem] xl:w-[45%] onboarding overflow-y-auto"> -->
            <div class="w-full max-w-[45rem] mx-auto flex justify-center">
                <router-view></router-view>
            </div>
            <!-- </div> -->

            <OnboardingImageSection class="hidden lg:flex" />
        </div>
    </div>
</template>

<script>
import OnboardingImageSection from '/src/components/reusable/OnboardingImageSection.vue'
export default {
    name: 'OnboardingBaseLayout',
    components: {
        OnboardingImageSection,
        // HelloWorld,
    },
}
</script>
