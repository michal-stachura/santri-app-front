<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth-store';
import { onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();

const { openWebSocket, closeWebSocket } = authStore;
const { loggedUser } = storeToRefs(authStore);

onMounted(() => {
  if (loggedUser.value) {
    openWebSocket();
  }
});
onBeforeUnmount(() => {
  closeWebSocket();
});
</script>
