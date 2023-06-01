<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">CurrentUser</div>
      {{ loggedUser }}
    </q-card-section>
    <q-card-section>
      <p v-for="message in dashboardMessages" :key="message">
        {{ message }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();

const { loggedUser, dashboardMessages } = storeToRefs(authStore);
</script>