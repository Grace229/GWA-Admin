<template>
    <div>
        <div class="w-full">
            <div class="mt-8 flow-root">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <div class="flex px-6 justify-between items-center border-b border-[#EAECF0] pt-5 pb-[21px]">
                                <h1 class="font-semibold text-[18px] text-[#1D2939]">Admin Users</h1>
                                <button @click="toggleOpenAddUser" class="gap-3 rounded-lg text-white flex items-center justify-center py-[10px] px-4 bg-[#12B76A]">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <span>Add User</span>
                                </button>
                            </div>

                            <div v-if="adminUsers?.length === 0 && loadingUsers">
                                <SpinnerLoader class="mx-auto my-40 h-[50px] w-[50px]" />
                            </div>
                            <div v-else-if="adminUsers.length === 0 && !loadingUsers" class="py-40 w-full bg-white flex flex-col items-center justify-center">
                                <span style="color: #999999" class="mt-6 fs-16 fw-400">Nothing to see</span>
                            </div>
                            <div v-else class="overflow-auto shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black ring-opacity-5 sm:rounded-b-lg">
                              
                                <table class="overflow-y-auto min-w-full divide-y divide-[#EAECF0]">
                                    <thead class="">
                                        <tr>
                                            <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-xs font-medium text-[#475467] sm:pl-6">FullName</th>
                                            <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Email address</th>
                                            <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Phone Number</th>
                                            <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Accounnt Type</th>
                                            <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Join Date</th>
                                            <th scope="col" class="whitespace-nowrap px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Status</th>
                                            <th scope="col" class="sr-only px-3 py-3.5 text-left text-xs font-medium text-[#475467]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="(adminUser, index) in adminUsers" :key="adminUser.id" :class="index % 2 !== 0 ? undefined : 'bg-gray-50'">
                                            <td class="capitalize whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#101828] sm:pl-6">
                                                <div class="flex flex-col">
                                                    <span class="font-normal text-[#475467]">{{ adminUser.fullName }} </span>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-[#101828]">
                                                <div class="flex flex-col">
                                                    <span class="font-normal text-[#475467]">{{ adminUser.email }}</span>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-[#101828]">
                                                <div class="flex flex-col">
                                                    <span class="font-normal text-[#475467]">{{ adminUser.phoneCode }} {{ adminUser.phoneNumber }}</span>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-[#101828]">
                                                <div class="flex flex-col">
                                                    <span class="font-normal text-[#475467]">{{ adminUser.roles[0].roleId.name }}</span>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-[#101828]">
                                                <div class="flex flex-col">
                                                    <span class="font-normal text-[#475467]">{{ Util.dateFormat(adminUser.createdAt) }}</span>
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-[#101828]">
                                                <div v-if="adminUser.status === 'active'" class="flex items-center gap-1 text-[#027A48] bg-[#ECFDF3] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="4.00001" cy="4" r="3" fill="#12B76A" />
                                                    </svg>
                                                    <span>Active</span>
                                                </div>

                                                <div v-if="adminUser.status === 'pending'" class="flex items-center gap-1 text-[#DC6803] bg-[#FEF0C7] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="4" cy="4" r="3" fill="#F79009" />
                                                    </svg>

                                                    <span>Pending</span>
                                                </div>

                                                <div v-if="adminUser.status === 'blocked'" class="flex items-center gap-1 text-[#B42318] bg-[#FEF3F2] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="4.00001" cy="4" r="3" fill="#F04438" />
                                                    </svg>
                                                    <span>Blocked</span>
                                                </div>
                                                <div v-if="adminUser.status === 'PasswordLocked'" class="flex items-center gap-1 text-[#B42318] bg-[#FEF3F2] py-[2px] px-2 max-w-max rounded-[16px]">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="4.00001" cy="4" r="3" fill="#F04438" />
                                                    </svg>
                                                    <span>Locked</span>
                                                </div>
                                            </td>

                                            <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-xs font-normal text-[#475467]">
                                                <div>
                                                    <RecentOrdersMenu @proceed="optionPrompt" :adminUser="adminUser" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <PaginationComponent v-if="adminUsers.length > 0" class="mt-2" />
            </div>
        </div>
        <AddUserModal />
        <EditUserModal />
        <PositiveModal />
        <NegativeModal />
    </div>
</template>

<script setup>
import { Log, Util, Constants } from '@/util';
import { ref, provide, onMounted, reactive, watch } from 'vue';
import RecentOrdersMenu from '@/views/admin/adminViews/reusable/RecentOrdersMenu.vue';
import EditUserModal from '@/views/admin/adminViews/reusable/EditUserModal.vue';
import AddUserModal from '@/views/admin/adminViews/reusable/AddUserModal.vue';
import { getAdminUsers } from '@/services/AdminServices.js';
import PaginationComponent from '@/components/reusable/PaginationComponent.vue';
import PositiveModal from '@/views/admin/adminViews/reusable/PositiveModal.vue';
import NegativeModal from '@/views/admin/adminViews/reusable/NegativeModal.vue';

onMounted(() => {
    getAllAdminUsers();
});
const loadingUsers = ref(false);
const openAddUser = ref(false);
const openEditUser = ref(false);

const menuOptions = ['Edit', 'Delete', 'Block User', 'Unblock User', 'Resend Invite'];
const searchParams = reactive({
    adminOnly: true,
    pageNumber: 1,
    pageSize: 10,
    total: 0,
});

const toggleOpenAddUser = () => {
    openAddUser.value = !openAddUser.value;
};

const toggleOpenEditUser = () => {
    openEditUser.value = !openEditUser.value;
};
const isPositiveModalOpen = ref(false);
const isNegativeModalOpen = ref(false);

const togglePositiveModal = () => {
    isPositiveModalOpen.value = !isPositiveModalOpen.value;
};
const toggleNegativeModal = () => {
    isNegativeModalOpen.value = !isNegativeModalOpen.value;
};
const negativeModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const positiveModalText = ref({
    title: '',
    description: '',
    buttonText: '',
});

const userToEdit = ref({});
const adminUsers = ref([]);

const optionPrompt = ({ menuItem, adminUser }) => {
    // alert(JSON.stringify(adminUser));
    const option = menuItem;
    if (option === 'Block User') {
        negativeModalText.value = {
            title: 'Block Admin',
            description: 'Are you sure you want to block this admin?',
            buttonText: 'Confirm',
            adminUser: adminUser,
            actionName: 'Block Admin',
            setAdminUserStatus: () => {
                const objectIdToUpdate = adminUser.id;
                const newStatus = 'Blocked';

                const objectIndex = adminUsers.value.findIndex((obj) => obj.id === objectIdToUpdate);

                if (objectIndex !== -1) {
                    adminUsers.value[objectIndex].status = newStatus;
                } else {
                    return;
                }
            },
        };

        toggleNegativeModal();
        return;
    }

    if (option === 'Delete') {
        negativeModalText.value = {
            title: 'Delete Admin',
            description: 'Are you sure you want to delete this admin?',
            buttonText: 'Confirm',
            adminUser: adminUser,
            actionName: 'Delete Admin',
        };

        toggleNegativeModal();
        return;
    }

    if (option === 'Unblock User') {
        positiveModalText.value = {
            title: 'Unblock Admin',
            description: 'Are you sure you want to unblock this admin',
            buttonText: 'Confirm',
            adminUser: adminUser,
            actionName: 'Unblock User',
            setAdminUserStatus: () => {
                const objectIdToUpdate = adminUser.id;
                const newStatus = 'Active';

                const objectIndex = adminUsers.value.findIndex((obj) => obj.id === objectIdToUpdate);

                if (objectIndex !== -1) {
                    adminUsers.value[objectIndex].status = newStatus;
                } else {
                    return;
                }
            },
        };

        togglePositiveModal();
        return;
    }

    if (option === 'Resend Invite') {
        positiveModalText.value = {
            title: 'Resend Invite ',
            description: 'Resend invite to this user’s email address',
            buttonText: 'Confirm',
            adminUser: adminUser,
            actionName: 'Resend Admin Invite',
        };

        togglePositiveModal();
        return;
    }

    if (option === 'Edit') {
        openEdit(adminUser);
    }
};

const openEdit = (adminUser) => {
    userToEdit.value = adminUser;
    toggleOpenEditUser();
};
const emptyadminUsersObj = ref({});

const getAllAdminUsers = () => {
    loadingUsers.value = true;
    getAdminUsers(
        // searchParams,
        (res) => {
            loadingUsers.value = false;
            console.log(res)
            adminUsers.value = res.data.data.data;
            searchParams.total = res.data.data.total;
        },
        (err) => {
            loadingUsers.value = false;
        }
    );
};

// const setAdminUserStatus = () => {

// }
const refetch = () => {
    getAllAdminUsers();
};

watch(
    () => searchParams.pageNumber,
    () => {
        getAllAdminUsers();
    }
);

provide('menuOptions', menuOptions);
provide('openAddUser', openAddUser);
provide('toggleOpenAddUser', toggleOpenAddUser);
provide('openEditUser', openEditUser);
provide('toggleOpenEditUser', toggleOpenEditUser);
provide('searchParams', searchParams);
provide('isPositiveModalOpen', isPositiveModalOpen);
provide('togglePositiveModal', togglePositiveModal);
provide('positiveModalText', positiveModalText);
provide('isNegativeModalOpen', isNegativeModalOpen);
provide('toggleNegativeModal', toggleNegativeModal);
provide('negativeModalText', negativeModalText);
provide('userToEdit', userToEdit);
provide('refetch', refetch);
// provide("setAdminUserStatus", setAdminUserStatus)
</script>

<style lang="scss" scoped></style>
