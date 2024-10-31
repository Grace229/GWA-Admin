<template>
    <HeroSection />
    <CarsForRent />
    <EligibilityAndBenefits :text="text" />
    <GetInTouch />
</template>

<script setup>
import HeroSection from '/src/views/LandingPages/RentACar/HeroSection.vue'
import CarsForRent from '/src/views/LandingPages/RentACar/CarsForRent.vue'
import EligibilityAndBenefits from '/src/components/reusable/EligibilityAndBenefits.vue'
import GetInTouch from '/src/components/reusable/GetInTouch.vue'

const text = {
    eligibility: {
        title: 'Eligibility for Car Rent',
        items: ['Must be a salary earner/ entrepreneur', 'Valid BVN with 6 months bank statement', 'Must not have un-serviced financial obligations ', 'Good credit score'],
    },
    benefits: {
        title: 'Benefits of AltDrive Renting',
        items: ['No down payments', 'Enjoy convenience and comfort', 'No cost of maintenance', 'Convenient for visitors/international travellers.'],
    },
}
</script>

<style lang="scss" scoped></style>
