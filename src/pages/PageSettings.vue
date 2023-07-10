<template>
  <q-page padding>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Base settings</div>
      </q-card-section>

      <q-card-section>
        <q-select filled map-options v-model="settings.nativeLanguage" :options="languages" label="Your native language" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
  import { useSettingsStore } from 'src/stores/store-settings';

  const store = useSettingsStore();
  const { settings } = store;

  const languages = [
    {label: 'English', value: 'en' },
    {label: 'Polish', value: 'pl' },
  ]
</script>