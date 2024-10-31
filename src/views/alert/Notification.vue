<template>
  <transition name="slideDown">
    <div
      id="notifications"
      v-if="message.show"
      class="main fixed z-50 top-5 right-0 mr-6 min-w-min-content flex sm:max-w-md m-auto over rounded-md p-3"
      @click="close"
    >
      <div
        style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05)"
        class="flex bg-white rounded-md cursor-pointer"
      >
        <div class="rounded-l-md w-5 h-full bg-blue-400"></div>

        <div class="ml-1 flex flex-col px-4 py-3">
          <div class="flex justify-between items-center mb-2">
            <h1 class="fw-700 fs-18 blacktext">Header</h1>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#999999"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#999999"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="fs-14 fw-400 tx-666666 leading-5 mr-3">
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { Util } from "@/components/util";
export default {
  name: "Notification",
  setup() {
    const store = useStore();
    const message = computed(() => store.state.notification);
    const close = () => Util.handleNotification(false, "", "");

    return { message, close };
  },
};
</script>

<style lang="scss" scoped>
.slideDown-enter-active,
.slideDown-leave-active {
  transition: all 0.2s ease-out;
}
.slideDown-leave-to,
.slideDown-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
