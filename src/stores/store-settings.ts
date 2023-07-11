import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { LocalStorage } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { DrfError } from 'src/types/DrfError';
import { authApi } from 'src/boot/axios-interceptor';

interface Language {
  label: string;
  value: string;
}

interface Settings {
  nativeLanguage: Language;
}

function isObject(value: unknown): value is object {
  return typeof value === 'object';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive<Settings>({
    nativeLanguage: { label: 'English', value: 'en' }
  });

  watch(
    () => settings,
    (newValue) => {
      LocalStorage.set('settings', newValue);
      saveSettings(newValue)
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

  const saveSettings = async (payload: Settings) => {
    
    authApi
      .put(`${process.env.APP_API_URL}/users/me/`, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log('ok')
        }
      })
      .catch((error: Error | DrfError) => {
        if ('response' in error) {
          console.log(error.response.data)
          const errorMessage = error.response.data.detail;
          if (errorMessage) {
            showErrorMessage(errorMessage);
          }
        } else {
          showErrorMessage(error.message);
        }
      });
  }

  return {
    settings,
    getSettings
  };
});
