import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { LocalStorage } from 'quasar';

interface Language {
  label: string;
  value: string;
}

interface Settings {
  motherLanguage: Language;
}

function isObject(value: unknown): value is object {
  return typeof value === 'object';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive<Settings>({
    motherLanguage: { label: 'English', value: 'en' }
  });

  watch(
    () => settings,
    (newValue) => {
      LocalStorage.set('settings', newValue);
    },
    { deep: true }
  );

  const getSettings = () => {
    const localStorageSettings = LocalStorage.getItem('settings');

    if (isRecord(localStorageSettings)) {
      for (const key in localStorageSettings) {
        const value = localStorageSettings[key];
        if (
          localStorageSettings.hasOwnProperty(key) &&
          settings.hasOwnProperty(key) &&
          isObject(value)
          ) {
          settings[key as keyof Settings] = value as Language;
        }
      }
    }
  };

  return {
    settings,
    getSettings
  };
});
