<template>
    <footer class="flex items-center justify-between text-sm px-6 py-4">
        <!-- {{ searchParams.total }}
        {{ state.searchParams.total }} -->
        <button
            :disabled="searchParams.pageNumber == 1"
            @click="prev"
            class="text-sm text-[#344054] rounded-lg border border-[#DDDCE1] p-2 hover:bg-gray-50 flex items-center gap-x-3 disabled:opacity-50"
        >
            <ArrowLeftIcon class="w-4 h-4" /> Previous
        </button>
        <div class="flex items-center gap-x-2 text-sm">
            <span class="bg-[#F9F5FF] rounded-lg text-[#7F56D9] cursor-pointer h-10 w-10 flex items-center justify-center">{{ searchParams.pageNumber }}</span>
            <span class="flex items-center justify-center">of</span>
            <span class="flex items-center justify-center"> {{ pages }}</span>
            <!-- <span
          class="hover:bg-[#F9F5FF] rounded-lg cursor-pointer flex items-center justify-center text-[#667085]"
          >2</span
        ><span
          class="hover:bg-[#F9F5FF] rounded-lg cursor-pointer flex items-center justify-center text-[#667085]"
          >3</span
        ><span class="flex items-center justify-center text-[#667085]">...</span
        ><span
          class="hover:bg-[#F9F5FF] rounded-lg cursor-pointer flex items-center justify-center text-[#667085]"
          >8</span
        ><span
          class="hover:bg-[#F9F5FF] rounded-lg cursor-pointer flex items-center justify-center text-[#667085]"
          >9</span
        ><span
          class="hover:bg-[#F9F5FF] rounded-lg cursor-pointer flex items-center justify-center text-[#667085]"
          >10</span
        > -->
        </div>
        <button
            @click="next"
            :disabled="searchParams.pageNumber >= pages"
            class="text-sm text-[#344054] rounded-lg border border-[#DDDCE1] p-2 hover:bg-gray-50 flex items-center gap-x-3 disabled:opacity-50"
        >
            Next <ArrowRightIcon class="w-4 h-4" />
        </button>
    </footer>
</template>
<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import { inject, computed } from 'vue';

const searchParams = inject('searchParams');
// const state = inject('state');
function next() {
    if (searchParams.pageNumber < pages.value) {
        searchParams.pageNumber++;
    }
}
function prev() {
    if (searchParams.pageNumber > 1) {
        searchParams.pageNumber--;
    }
}
const pages = computed(() => {
    return Math.ceil(searchParams.total / 10);
});
</script>
