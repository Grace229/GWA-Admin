<template>
    <div>
        <div v-if="!isTrue">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_143_7508)">
                    <path d="M5.5 0C2.46718 0 0 2.46718 0 5.5C0 8.53282 2.46718 11 5.5 11C8.53282 11 11 8.53282 11 5.5C11 2.46718 8.53282 0 5.5 0Z" fill="#D4D4D4" />
                    <path
                        d="M8.28787 4.33426L5.30868 7.31337C5.2193 7.40275 5.10197 7.44773 4.98465 7.44773C4.86733 7.44773 4.75 7.40275 4.66062 7.31337L3.17107 5.82381C2.99181 5.64464 2.99181 5.35494 3.17107 5.17576C3.35024 4.9965 3.63986 4.9965 3.81912 5.17576L4.98465 6.34129L7.63982 3.6862C7.81899 3.50694 8.10861 3.50694 8.28787 3.6862C8.46705 3.86538 8.46705 4.155 8.28787 4.33426Z"
                        fill="#FAFAFA"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_143_7508">
                        <rect width="11" height="11" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>

        <div v-else>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_143_7975)">
                    <path d="M5.5 0C2.46718 0 0 2.46718 0 5.5C0 8.53282 2.46718 11 5.5 11C8.53282 11 11 8.53282 11 5.5C11 2.46718 8.53282 0 5.5 0Z" fill="#1ED69E" />
                    <path
                        d="M8.28787 4.3345L5.30868 7.31361C5.2193 7.40299 5.10197 7.44798 4.98465 7.44798C4.86733 7.44798 4.75 7.40299 4.66062 7.31361L3.17107 5.82406C2.99181 5.64488 2.99181 5.35518 3.17107 5.176C3.35024 4.99674 3.63986 4.99674 3.81912 5.176L4.98465 6.34153L7.63982 3.68645C7.81899 3.50719 8.10861 3.50719 8.28787 3.68645C8.46705 3.86562 8.46705 4.15524 8.28787 4.3345Z"
                        fill="#FAFAFA"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_143_7975">
                        <rect width="11" height="11" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isTrue: Boolean,
    },
}
</script>

<style lang="scss" scoped></style>
