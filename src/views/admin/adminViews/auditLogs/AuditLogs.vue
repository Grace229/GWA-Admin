<template>
    <div>
        <div class="flex justify-between mt-5 mb-[22px] text-base text-[#475467] font-semibold">Audit Logs</div>
        <!-- <SpinnerLoader class="ml-2 h-[14px] w-[14px]" /> -->
        <!-- //table -->
        <div class="mb-10">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div v-if="auditLogs.length === 0 && loading">
                            <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                        </div>
                        <div v-else-if="auditLogs.length === 0 && !loading" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                            <!-- <div>
                                <TransactionHistoryEmptySvg />
                            </div> -->
                            <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                        </div>

                        <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="overflow-y-auto z-[9999] min-w-full divide-y divide-[#EAECF0]">
                                <thead class="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-xs font-medium text-[#475467]">Username</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Role</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">IP Address</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Activity</th>

                                        <th scope="col" class="px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Time</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr
                                        v-for="(data, index) in auditLogs"
                                        :key="data.id"
                                        :class="[index + 1 === auditLogs.length ? 'border-t border-[#EAECF0] rounded-b-lg' : 'border-b border-[#EAECF0]']"
                                    >
                                        <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-normal text-[#475467]">
                                            <!-- <div class="flex items-center gap-3"> -->
                                            <span>{{ data.userName }}</span>
                                            <!-- </div> -->
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.role }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-[#475467]">{{ data.ipAddress }}</td>

                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-normal text-[#475467]">{{ data.activity }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-[#475467]">{{ Util.dateFormat(data.created) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <PaginationComponent v-if="auditLogs.length > 0" class="mt-2" />
            </div>
        </div>
        <!-- <PositiveModal /> -->
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, provide, watch } from 'vue';
import { Log, Util } from '@/util';
import { getAuditLogs } from '@/services/AdminServices.js';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';

onMounted(() => {
    fetchAuditLogs();
});
const state = reactive({
    searchParams: {
        descending: true,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
    },
});
const loading = ref(false);
const auditLogs = ref([]);

const fetchAuditLogs = () => {
    loading.value = true;
    getAuditLogs(
        state.searchParams,
        (res) => {
            auditLogs.value = res.data.data;
            state.searchParams.total = res.data.total;
            loading.value = false;
        },
        (err) => {
            loading.value = false;
        }
    );
};

watch(
    () => state.searchParams.pageNumber,
    () => {
        fetchAuditLogs();
    },
    { deep: true }
);
provide('searchParams', state.searchParams);
</script>

<style lang="scss" scoped>
.overflowVisible {
    overflow: visible;
}
</style>
