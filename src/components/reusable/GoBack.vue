<template>
    <div class="cursor-pointer flex items-center gap-2">
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8627 3.225L13.3794 1.75L5.1377 10L13.3877 18.25L14.8627 16.775L8.0877 10L14.8627 3.225Z" fill="#8692A6" />
            </svg>
        </div>
        <p class="font-medium text-base text-[#8692A6]">{{ text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'Back',
        },
    },
};
</script>

<style lang="scss" scoped></style>
