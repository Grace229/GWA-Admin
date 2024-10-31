<template>
    <div class="flex items-center justify-between rounded-[4px] border border-[#B9C0D4] px-[14px] py-[10px]">
        <p class="mr-2 font-normal text-sm text-[#5D6B98]">{{ label }}</p>
        <div>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#5D6B98" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
    },
    setup() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
