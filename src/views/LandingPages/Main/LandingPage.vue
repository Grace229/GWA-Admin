<template>
    <!-- Hero Section -->
    <section class="bg-blue-800 text-white py-16">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold">KAVI Systems Limited</h1>
            <p class="mt-4 text-xl">Innovative Tech Solutions for Africa</p>
        </div>
    </section>

    <!-- About Section -->
    <section class="py-12 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold mb-4">About KAVI</h2>
            <p class="text-lg">
                KAVI Systems Limited is a technology, logistics, and trading company providing high-tech solutions.
                We specialize in software development, web development, hardware supply, and courier services.
            </p>
        </div>
    </section>

    <!-- Products and Services -->
    <section class="py-12 bg-gray-100">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold mb-4">Our Products & Services</h2>

            <!-- Software Development -->
            <div class="mb-6">
                <h3 class="text-2xl font-semibold">Software Development</h3>
                <p>We design, create, test, and maintain applications, focusing on solutions for the financial industry, including core banking and POS systems.</p>
            </div>

            <!-- Payment Solutions -->
            <div class="mb-6">
                <h3 class="text-2xl font-semibold">Payment Solutions</h3>
                <p>KAVI offers integrated payment solutions, including POS terminals and mobile payment systems.</p>
            </div>

            <!-- Equipment Supply -->
            <div class="mb-6">
                <h3 class="text-2xl font-semibold">Equipment Supply</h3>
                <p>We supply computer and allied systems, sourcing hardware components that complement our software products.</p>
            </div>

            <!-- Courier Service -->
            <div class="mb-6">
                <h3 class="text-2xl font-semibold">Courier Service</h3>
                <p>KAVI provides licensed courier services for transporting packages and items, partnering with merchants and vendors.</p>
            </div>

            <!-- Consultancy -->
            <div>
                <h3 class="text-2xl font-semibold">Research & Consultancy</h3>
                <p>With over 40 years of combined expertise, we provide consultancy services across finance, fintech, ICT, and more.</p>
            </div>
        </div>
    </section>

    <!-- Partners -->
    <section class="py-12 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold mb-4">Our Partners</h2>
            <p>KAVI collaborates with major players, such as Aztec MFB in finance and The Gallery in hospitality, providing end-to-end tech solutions.</p>
        </div>
    </section>

    <!-- Team -->
    <section class="py-12 bg-gray-100">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold mb-4">Meet the Team</h2>
            <ul>
                <li class="mb-2">Samuel Adjei – CEO</li>
                <li class="mb-2">Uwem Okon – CTO</li>
                <li class="mb-2">Frank Odiase</li>
                <li>Isaac Appiah</li>
            </ul>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-800 text-white py-6">
        <div class="container mx-auto text-center">
            <p>&copy; 2023 KAVI Systems Limited. All Rights Reserved.</p>
        </div>
    </footer>

</template>

<script setup>
import HeroSection from '/src/views/LandingPages/Main/HeroSection.vue';
import CarLogos from '/src/views/LandingPages/Main/CarLogos.vue';
import ActionFeatures from '/src/views/LandingPages/Main/ActionFeatures.vue';
import ReecommendedDeals from '/src/views/LandingPages/Main/ReecommendedDeals.vue';
import MainCTA from '/src/views/LandingPages/Main/MainCTA.vue';
import DownloadApp from '/src/views/LandingPages/Main/DownloadApp.vue';
const faker = require('faker');  // Use Faker.js for realistic mock data

const records = Array.from({ length: 500 }, () => ({
  organization: faker.company.companyName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  phone_number: faker.phone.phoneNumber('+1-###-###-####'),
  date_joined: faker.date.past(3).toISOString().split('T')[0], // Random date within the last 3 years
  status: faker.random.arrayElement(['active', 'inactive', 'pending']) // Random status
}));

console.log(JSON.stringify(records, null, 2)); 

</script>

<style lang="scss" scoped></style>
