<template>
    <Popover class="relative">
        <PopoverButton @click="fetchNotifications" id="notificationButton" class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.7695 9.64534C16.039 8.79229 15.7071 8.05305 15.7071 6.79716V6.37013C15.7071 4.73354 15.3304 3.67907 14.5115 2.62459C13.2493 0.986993 11.1244 0 9.04423 0H8.95577C6.91935 0 4.86106 0.941671 3.577 2.5128C2.71333 3.58842 2.29293 4.68822 2.29293 6.37013V6.79716C2.29293 8.05305 1.98284 8.79229 1.23049 9.64534C0.676907 10.2738 0.5 11.0815 0.5 11.9557C0.5 12.8309 0.787226 13.6598 1.36367 14.3336C2.11602 15.1413 3.17846 15.6569 4.26375 15.7466C5.83505 15.9258 7.40634 15.9933 9.0005 15.9933C10.5937 15.9933 12.165 15.8805 13.7372 15.7466C14.8215 15.6569 15.884 15.1413 16.6363 14.3336C17.2118 13.6598 17.5 12.8309 17.5 11.9557C17.5 11.0815 17.3231 10.2738 16.7695 9.64534Z"
                    fill="#575267"
                />
                <path
                    opacity="0.2"
                    d="M11.0088 17.2285C10.5088 17.1217 7.46266 17.1217 6.96275 17.2285C6.53539 17.3272 6.07324 17.5568 6.07324 18.0604C6.09809 18.5408 6.37935 18.9648 6.76895 19.2337L6.76795 19.2347C7.27184 19.6275 7.86319 19.8773 8.48236 19.9669C8.81232 20.0122 9.14825 20.0102 9.49014 19.9669C10.1083 19.8773 10.6997 19.6275 11.2036 19.2347L11.2026 19.2337C11.5922 18.9648 11.8734 18.5408 11.8983 18.0604C11.8983 17.5568 11.4361 17.3272 11.0088 17.2285Z"
                    fill="#575267"
                />
            </svg>
        </PopoverButton>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <PopoverPanel class="absolute right-0 z-10 mt-5 flex w-screen max-w-max">
                <div class="w-screen max-w-[320px] sm:max-w-[500px] flex-auto overflow-hidden rounded-[20px] bg-white text-sm leading-6 shadow-lg ring-0 ring-gray-900/5">
                    <div class="pb-4">
                        <div class="flex p-[30px] items-center justify-between">
                            <span class="text-[#1D2939] font-semibold text-[20px]"> Notifications </span>
                            <span @click="markAllAsRead" class="cursor-pointer text-sm font-medium text-[#30374F]"> Mark all as read</span>
                        </div>
                        <div class="max-h-[300px] sm:max-h-[500px] overflow-y-auto">
                            <div
                                @click="markAsRead(item)"
                                v-for="item in notifications"
                                :key="item.id"
                                :class="item.isRead ? 'bg-[#ffffff]' : 'bg-[#FEF6F0]'"
                                class="group relative px-[30px] hover:bg-gray-50"
                            >
                                <div class="flex items-start gap-x-4 py-[15px] border-b border-gray-100">
                                    <div class="mt-1 flex h-[50px] w-[50px] flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                                        {{ item.title[0] }}
                                        <!-- <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> -->
                                    </div>
                                    <div class="flex-1">
                                        <a :href="item.href" class="font-medium text-sm text-[#1D2939]">
                                            {{ item.title }}
                                            <span class="absolute inset-0" />
                                        </a>
                                        <p class="mt-1 font-normal text-sm text-[#475467]">{{ item.details }}</p>
                                        <div class="h-[13px]"></div>

                                        <!-- <span class="text-[#1D2939] font-semibold text-xs">View Details</span> -->
                                    </div>

                                    <div class="ml-auto mb-auto max-h-max">
                                        <span class="text-sm text-[#667085] font-normal">{{ Util.dateFormat(item.date) }}</span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="notifications.length > 5" @click="loadMore" class="cursor-pointer flex items-center justify-center py-3">
                                <span class="">Load more </span>
                                <SpinnerLoader v-if="loading" class="ml-2 h-[14px] w-[14px]" />
                            </div>
                            <div v-if="notifications.length === 0" @click="loadMore" class="cursor-pointer flex py-6">
                                <span class="mx-auto">empty</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                            <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            {{ item.name }}
                        </a>
                    </div> -->
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid';
import { ArrowPathIcon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon } from '@heroicons/vue/24/outline';
import { Log, Util, Constants } from '@/util';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/services/GeneralServices.js';
import { reactive, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// onMounted(() => {
//     fetchNotifications();
// });

const loading = ref(false);
const store = useStore();
const roles = store.getters['authToken/roles'];
// const loadIndex = ref(0)
const router = useRouter();
const notifications = ref([]);

const searchParams = reactive({
    pageNumber: 1,
    pageSize: 5,
});

const fetchNotifications = () => {
    loading.value = true;
    getNotifications(
        searchParams,
        (res) => {
            loading.value = false;
            // console.log('notifications: ', res.data.data);
            notifications.value = res.data.data;
        },
        (err) => {
            loading.value = false;
            // console.log('notificationsErr: ', err);
        }
    );
};

const markAsRead = (notification) => {
    if (notification.notificationType == Constants.notificationTypeEnum.NewOrder) {
        if (roles.includes('Vendor')) {
            router.push('/ordered-cars');
            const button = document.getElementById('notificationButton');
            button.click();
        }
    }

    markNotificationAsRead(
        {
            notificationId: notification.id,
        },
        (res) => {
            fetchNotifications();
        },
        (err) => {}
    );
};
const markAllAsRead = () => {
    markAllNotificationsAsRead(
        (res) => {
            const button = document.getElementById('notificationButton');
            button.click();
            fetchNotifications();
        },
        (err) => {}
    );
};

const loadMore = () => {
    searchParams.pageSize += 3;
};

// watch(
//     () => searchParams.pageSize,
//     () => {
//         fetchNotifications();
//     }
// );
</script>
