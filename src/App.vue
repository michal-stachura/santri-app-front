<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth-store';
import { useSettingsStore } from './stores/store-settings';
import { onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
const settingsStore = useSettingsStore();
const authStore = useAuthStore();

const { openWebSocket, closeWebSocket } = authStore;
const { loggedUser } = storeToRefs(authStore);
const { getSettings } = settingsStore;

onMounted(() => {
  if (loggedUser.value) {
    openWebSocket();
  }
  getSettings();
});
onBeforeUnmount(() => {
  closeWebSocket();
});
</script>
