import { defineStore } from 'pinia';
import { Loading, LocalStorage } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { LoginForm } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const loggedIn = ref<boolean>(false);

  const loginUser = async (payload: LoginForm) => {
    console.log(payload);
    Loading.show();
    setTimeout(() => {
      loggedIn.value = true;
      LocalStorage.set('sapp_loggedIn', true);
      router.push('/').catch((err: Error) => {
        showErrorMessage(err.message);
      });
      showErrorMessage('Logged in successfully');
      Loading.hide();
    }, 1000);
  };

  const logoutUser = async () => {
    loggedIn.value = false;
    LocalStorage.set('sapp_loggedIn', false);
    router.replace('/auth').catch((error: Error) => {
      showErrorMessage(error.message);
    });
  };

  return {
    loggedIn,
    loginUser,
    logoutUser
  };
});
