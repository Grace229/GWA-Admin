<template>
    <HeroSection />
    <CarsForLease />
    <EligibilityAndBenefits :text="text" />
    <GetInTouch />
</template>

<script setup>
import HeroSection from '/src/views/LandingPages/LeaseACar/HeroSection.vue'
import CarsForLease from '/src/views/LandingPages/LeaseACar/CarsForLease.vue'
import EligibilityAndBenefits from '/src/components/reusable/EligibilityAndBenefits.vue'
import GetInTouch from '/src/components/reusable/GetInTouch.vue'

const text = {
    eligibility: {
        title: 'Eligibility for Car Lease',
        items: ['Must be a salary earner/ entrepreneur', 'Valid BVN with 6 months bank statement', 'Must not have un-serviced financial obligations elsewhere', 'Good credit score'],
    },
    benefits: {
        title: 'Benefits of AltDrive Leasing',
        items: [
            'Early liquidation of facility at no extra charge',
            'Reduced overall payment for early liquidation',
            'Flexible tenure and repayment options',
            'Insurance renewal is paid by Altdrive',
            'Zero worries on car depreciation',
        ],
    },
}
</script>

<style lang="scss" scoped></style>
