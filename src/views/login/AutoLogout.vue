<template>
    <div v-if="isLoggedIn">
        <div v-if="warningZone" class="px-8 py-2 blacktext fw-400 fs-16 bg-yellow-100">
            <span>Are you there?</span>
        </div>
    </div>
    <!-- <div class="px-8 py-2 blacktext fw-400 fs-16 bg-yellow-100">
        <span>Are you there?</span>
    </div> -->
</template>

<script>
// import { Log } from "@/components/util";

import { useStore } from 'vuex';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { handleLogout } from '@/services/OnboardingServices.js';
import { useRoute } from 'vue-router';

export default {
    name: 'AutoLogout',
    setup() {
        const route = useRoute();
        onMounted(() => {
            events.forEach((event) => {
                window.addEventListener(event, resetTimer);
            });
            setTimers();
            // setRefreshTimer();
        });

        onUnmounted(() => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
            clearTimeout(warningTimer.value);
            clearTimeout(logoutTimer.value);
            // clearTimeout(refreshTimer.value);
        });
        const store = useStore();
        // const isLoggedIn = store.getters['authToken/loggedIn'];

        // const router = useRouter();

        const warningTimer = ref(null);
        // const refreshTimer = ref(null);
        const warningZone = ref(false);
        const logoutTimer = ref(null);
        const events = ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'];
        const isLoggedIn = computed(() => store.getters['authToken/loggedIn']);

        const setTimers = function () {
            warningTimer.value = setTimeout(warningMessage, 4.5 * 60 * 1000); // 4.5mins * 60 * 1000
            logoutTimer.value = setTimeout(logoutUser, 5 * 60 * 1000); // 5mins * 60 * 1000

            warningZone.value = false;
        };

        // const setRefreshTimer = function () {
        //     refreshTimer.value = setTimeout(refreshTheToken, 0.15 * 60 * 1000);
        // };
        const resetTimer = function () {
            clearTimeout(warningTimer.value);
            clearTimeout(logoutTimer.value);

            setTimers();
        };
        const warningMessage = function () {
            warningZone.value = true;
        };

        const logoutUser = function () {
            if (isLoggedIn.value === true) {
                handleLogout('auto', route.fullPath);
            }
        };

        // const refreshTheToken = () => {
        //     console.log('Refresh');
        // };
        return { isLoggedIn, warningZone };
    },
};
</script>

<style lang="scss" scoped></style>
