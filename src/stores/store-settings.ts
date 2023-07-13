import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { LocalStorage } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { DrfError } from 'src/types/DrfError';
import { authApi } from 'src/boot/axios-interceptor';


interface Settings {
  native_language: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const useSettingsStore = defineStore('settings', () => {
  const initialSettings = LocalStorage.getItem('sapp_settings') as Record<string, unknown>;
  const settings = reactive<Settings>({
    native_language: isRecord(initialSettings) && typeof initialSettings.native_language === 'string'
      ? initialSettings.native_language
      : 'en'
  });

  watch(
    // TODO: zapis i odczyt settingsów do bazy danych
    () => settings.native_language,
    (newValue) => {
      LocalStorage.set('sapp_settings', { native_language: newValue });
    }
  );


  const getSettings = () => {
    const localStorageSettings = LocalStorage.getItem('settings');
  
    if (isRecord(localStorageSettings)) {
      for (const key in localStorageSettings) {
        const value = localStorageSettings[key];
        if (
          localStorageSettings.hasOwnProperty(key) &&
          settings.hasOwnProperty(key) &&
          typeof value === 'string'
        ) {
          settings[key as keyof Settings] = value;
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
