<template>
    <div class="mb-[34px]">
        <div class="w-full warning p-4 flex items-start justify-center">
            <div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.99963 7.49824V10.8316M9.99963 14.1649H10.008M8.84573 3.24134L1.99166 15.0802C1.61149 15.7369 1.4214 16.0652 1.4495 16.3347C1.474 16.5697 1.59714 16.7833 1.78828 16.9222C2.00741 17.0816 2.38679 17.0816 3.14556 17.0816H16.8537C17.6125 17.0816 17.9919 17.0816 18.211 16.9222C18.4021 16.7833 18.5253 16.5697 18.5498 16.3347C18.5779 16.0652 18.3878 15.7369 18.0076 15.0802L11.1535 3.24134C10.7747 2.58704 10.5853 2.25989 10.3382 2.15001C10.1227 2.05416 9.8766 2.05416 9.66105 2.15001C9.41394 2.25989 9.22454 2.58704 8.84573 3.24134Z"
                        stroke="#DC6803"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="ml-[13.4px] flex-1">
                <p class="mb-[10px] font-semibold text-sm text-[#B54708]">{{ header }}</p>
                <ul class="space-y-1 ml-[10px] list-disc text-xs font-normal text-[#B54708]">
                    <!-- <li v-for="reason in reasons" :key="reason">{{ reason }}</li> -->
                    <li>{{ reasons }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['header', 'reasons']);
</script>

<style lang="scss" scoped>
.warning {
    /* Warning/25 */

    background: #fffcf5;
    /* Warning/300 */

    border: 1px solid #fec84b;
    border-radius: 12px;
}
</style>
