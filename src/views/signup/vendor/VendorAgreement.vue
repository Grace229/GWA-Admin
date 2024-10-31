<template>
    <div v-if="!isSignedUp" class="vendorDignupContainer max-w-[600px] flex flex-col gap-[10px]">
        <VendorSignupGoBack class="mb-[37px]" />
        <h2 class="text-gray-900 font-semibold text-[30px] mb-2">Review Agreement</h2>

        <div class="border border-[#DCDFEA] rounded-[5px] bg-[#ffffff]">
            <div @click="toggleShow('Memo')" class="cursor-pointer w-full gap-4 flex px-[24px] py-[20px]">
                <div>
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M13 12H5M13 16H5M7 8H5M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z"
                            stroke="#404968"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <p class="font-semibold text-base text-gray-700 italic">Memorandum of Understanding</p>
            </div>
            <div v-if="showMemo" class="flex flex-col gap-6 px-[16px] py-[13px] bg-[#F9F9FB] rounded-b-[5px] border-t border-gray-200">
                <p class="text-[#404968] text-xs font-normal">
                    Adipiscing at in tellus integer. Pellentesque massa placerat duis ultricies lacus. Nisi porta lorem mollis aliquam ut porttitor leo. Venenatis cras sed felis eget. Duis ultricies
                    lacus sed turpis tincidunt. Interdum varius sit amet mattis. Libero justo laoreet sit amet cursus sit amet dictum sit. Consequat interdum varius sit amet mattis vulputate enim
                    nulla. Pellentesque habitant morbi tristique senectus et netus et. Elit duis tristique sollicitudin nibh sit. Aliquam etiam erat velit scelerisque in dictum non. Velit egestas dui
                    id ornare arcu odio ut sem nulla. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Quis hendrerit dolor magna eget est. Lobortis scelerisque fermentum dui
                    faucibus in ornare. Quam id leo in vitae. Vestibulum sed arcu non odio euismod lacinia at quis risus. Est sit amet facilisis magna etiam. Consequat nisl vel pretium lectus quam.
                    Non arcu risus quis varius.
                </p>
                <p class="text-[#404968] text-xs font-normal">
                    Adipiscing at in tellus integer. Pellentesque massa placerat duis ultricies lacus. Nisi porta lorem mollis aliquam ut porttitor leo. Venenatis cras sed felis eget. Duis ultricies
                    lacus sed turpis tincidunt. Interdum varius sit amet mattis. Libero justo laoreet sit amet cursus sit amet dictum sit. Consequat interdum varius sit amet mattis vulputate enim
                    nulla. Pellentesque habitant morbi tristique senectus et netus et. Elit duis tristique sollicitudin nibh sit. Aliquam etiam erat velit scelerisque in dictum non. Velit egestas dui
                    id ornare arcu odio ut sem nulla. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Quis hendrerit dolor magna eget est. Lobortis scelerisque fermentum dui
                    faucibus in ornare. Quam id leo in vitae. Vestibulum sed arcu non odio euismod lacinia at quis risus. Est sit amet facilisis magna etiam. Consequat nisl vel pretium lectus quam.
                    Non arcu risus quis varius.
                </p>
            </div>
        </div>

        <div class="border border-[#DCDFEA] rounded-[5px] bg-[#ffffff]">
            <div @click="toggleShow('Guide')" class="cursor-pointer w-full gap-4 flex px-[24px] py-[20px]">
                <div>
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M13 12H5M13 16H5M7 8H5M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z"
                            stroke="#404968"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <p class="font-semibold text-base text-gray-700 italic">Vendor Guide</p>
            </div>
            <div v-if="showGuide" class="flex flex-col gap-6 px-[16px] py-[13px] bg-[#F9F9FB] rounded-b-[5px] border-t border-gray-200">
                <p class="text-[#404968] text-xs font-normal">
                    Adipiscing at in tellus integer. Pellentesque massa placerat duis ultricies lacus. Nisi porta lorem mollis aliquam ut porttitor leo. Venenatis cras sed felis eget. Duis ultricies
                    lacus sed turpis tincidunt. Interdum varius sit amet mattis. Libero justo laoreet sit amet cursus sit amet dictum sit. Consequat interdum varius sit amet mattis vulputate enim
                    nulla. Pellentesque habitant morbi tristique senectus et netus et. Elit duis tristique sollicitudin nibh sit. Aliquam etiam erat velit scelerisque in dictum non. Velit egestas dui
                    id ornare arcu odio ut sem nulla. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Quis hendrerit dolor magna eget est. Lobortis scelerisque fermentum dui
                    faucibus in ornare. Quam id leo in vitae. Vestibulum sed arcu non odio euismod lacinia at quis risus. Est sit amet facilisis magna etiam. Consequat nisl vel pretium lectus quam.
                    Non arcu risus quis varius.
                </p>
                <p class="text-[#404968] text-xs font-normal">
                    Adipiscing at in tellus integer. Pellentesque massa placerat duis ultricies lacus. Nisi porta lorem mollis aliquam ut porttitor leo. Venenatis cras sed felis eget. Duis ultricies
                    lacus sed turpis tincidunt. Interdum varius sit amet mattis. Libero justo laoreet sit amet cursus sit amet dictum sit. Consequat interdum varius sit amet mattis vulputate enim
                    nulla. Pellentesque habitant morbi tristique senectus et netus et. Elit duis tristique sollicitudin nibh sit. Aliquam etiam erat velit scelerisque in dictum non. Velit egestas dui
                    id ornare arcu odio ut sem nulla. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Quis hendrerit dolor magna eget est. Lobortis scelerisque fermentum dui
                    faucibus in ornare. Quam id leo in vitae. Vestibulum sed arcu non odio euismod lacinia at quis risus. Est sit amet facilisis magna etiam. Consequat nisl vel pretium lectus quam.
                    Non arcu risus quis varius.
                </p>
            </div>
        </div>

        <div class="flex gap-3 mt-5 items-center">
            <input class="border-gray-300 rounded-[4px] focus:outline-none focus:ring-0" type="checkbox" v-model="agree" />
            <p class="font-normal text-sm text-[#404968]">I have read and accept all terms and conditions</p>
        </div>

        <button
            @click="createVendor"
            :class="!agree ? 'opacity-25' : 'opacity-100'"
            :disabled="!agree || loading"
            class="w-[264px] mx-auto brandButton mt-[32px] flex items-center justify-center gap-4"
        >
            Continue
            <div v-if="loading" class="h-4 w-4 ml-4 rounded-md block">
                <div class="roundLoader opacity-50 mx-auto"></div>
            </div>
        </button>
    </div>
    <SuccessfulVendorSignup v-else />
</template>

<script setup>
import VendorSignupGoBack from '@/views/signup/vendor/VendorSignupGoBack.vue';
import SuccessfulVendorSignup from '/src/views/signup/vendor/SuccessfulVendorSignup.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { vendorSignup, handleSuccessfulLogin } from '/src/services/OnboardingServices.js';
import { Log, Util } from '/src/util/';
import { ref, inject, onMounted, computed, provide } from 'vue';
onMounted(() => {
    step.value = 6;
});
const store = useStore();
const router = useRouter();
const isSignedUp = ref(false);
const agree = ref(false);
const loading = ref(false);
const showMemo = ref(false);
const showGuide = ref(false);
const step = inject('step');
const successfulSignupRes = ref({});
const signupDetails = computed(() => store.state.vendorSignupDetails);
const toggleShow = (name) => {
    if (name === 'Guide') {
        showGuide.value = !showGuide.value;
    }
    if (name === 'Memo') {
        showMemo.value = !showMemo.value;
    }
};

const createVendor = () => {
    loading.value = true;
    const data = signupDetails.value;

    vendorSignup(
        data,
        (res) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'success', res.data.message);

            // empty out vendor details
            store.commit('setVendorSignupDetails', {});
            successfulSignupRes.value = res.data.data;
            goNext();
        },
        (err) => {
            loading.value = false;
            Util.handleGlobalAlert(true, 'failed', err.response.data.message);
        }
    );
};

const goNext = () => {
    isSignedUp.value = true;
};

const handleLoginDetails = () => {
    handleSuccessfulLogin(successfulSignupRes.value);
    const firstRole = successfulSignupRes.value.roles[0];

    if (firstRole == 'Vendor') {
        store.commit('authToken/vendorInfo', successfulSignupRes.value.vendorInfo);
    } else {
        store.commit('authToken/vendorInfo', null);
    }
    router.push('/dashboard');
};

provide('handleLoginDetails', handleLoginDetails);
</script>

<style lang="scss" scoped></style>
