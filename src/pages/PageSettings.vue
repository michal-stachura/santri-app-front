<template>
  <q-page padding>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Base settings</div>
      </q-card-section>

      <q-card-section>
        <q-select filled map-options v-model="selectedLanguage" :options="languages" label="Your native language" @update:modelValue="updateLanguage" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useSettingsStore } from 'src/stores/store-settings';

  const store = useSettingsStore();
  const selectedLanguage = ref(store.settings.native_language);
  const languages = [
    {label: 'English', value: 'en' },
    {label: 'Polish', value: 'pl' },
  ];

  const updateLanguage = (newLanguage: {label: string, value: string}) => {
    store.settings.native_language = newLanguage.value;
  };
</script>
