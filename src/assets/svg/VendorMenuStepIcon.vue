<template>
    <div>
        <div v-if="itemId === Number(step)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" fill="#F9F9FB" />
                <circle cx="12" cy="12" r="4" fill="#4A5578" />
                <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#4A5578" stroke-width="1.5" />
            </svg>
        </div>

        <div class="m-[-4px]" v-if="Number(step) < itemId">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_2828_41757)">
                    <g clip-path="url(#clip0_2828_41757)">
                        <rect x="4" y="4" width="24" height="24" rx="12" fill="white" />
                        <circle cx="16" cy="16" r="4" fill="#EAECF0" />
                        <rect x="4.75" y="4.75" width="22.5" height="22.5" rx="11.25" stroke="#EAECF0" stroke-width="1.5" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_2828_41757" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_2828_41757" />
                        <feOffset />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.949765 0 0 0 0 0.955804 0 0 0 0 0.967882 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2828_41757" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2828_41757" result="shape" />
                    </filter>
                    <clipPath id="clip0_2828_41757">
                        <rect x="4" y="4" width="24" height="24" rx="12" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>

        <div v-if="Number(step) > itemId" class="m-[-4px]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_502_11925)">
                    <g clip-path="url(#clip0_502_11925)">
                        <rect x="4" y="4" width="24" height="24" rx="12" fill="#F9F9FB" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.096 11.3902L13.936 18.3002L12.036 16.2702C11.686 15.9402 11.136 15.9202 10.736 16.2002C10.346 16.4902 10.236 17.0002 10.476 17.4102L12.726 21.0702C12.946 21.4102 13.326 21.6202 13.756 21.6202C14.166 21.6202 14.556 21.4102 14.776 21.0702C15.136 20.6002 22.006 12.4102 22.006 12.4102C22.906 11.4902 21.816 10.6802 21.096 11.3802V11.3902Z"
                            fill="#4A5578"
                        />
                        <rect x="4.75" y="4.75" width="22.5" height="22.5" rx="11.25" stroke="#4A5578" stroke-width="1.5" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_502_11925" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_502_11925" />
                        <feOffset />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.949765 0 0 0 0 0.955804 0 0 0 0 0.967882 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_502_11925" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_502_11925" result="shape" />
                    </filter>
                    <clipPath id="clip0_502_11925">
                        <rect x="4" y="4" width="24" height="24" rx="12" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>

        <!-- {{ step }} - {{ itemId }} -->
    </div>
</template>

<script setup>
const props = defineProps({
    itemId: Number,
    step: [String, Number],
});
</script>

<style lang="scss" scoped></style>
