<template>
    <HeroSection />
    <CarsForFinancing />
    <EligibilityAndBenefits :text="text" />
    <GetInTouch />
</template>

<script setup>
import HeroSection from '/src/views/LandingPages/BuyACar/HeroSection.vue'
import CarsForFinancing from '/src/views/LandingPages/BuyACar/CarsForFinancing.vue'
import EligibilityAndBenefits from '/src/components/reusable/EligibilityAndBenefits.vue'
import GetInTouch from '/src/components/reusable/GetInTouch.vue'

const text = {
    eligibility: {
        title: 'Eligibility for Car Loan',
        items: ['Must be a salary earner/ entrepreneur', 'Valid BVN with 6 months bank statement', 'Must not have un-serviced financial obligations ', 'Good credit score'],
    },
    benefits: {
        title: 'Benefits of AltDrive Loan',
        items: ['Convenient means of payment', 'Fit a car of choice into your budget', 'Own your car', 'Long financing period'],
    },
}
</script>

<style lang="scss" scoped></style>
