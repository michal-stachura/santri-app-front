import { defineStore } from 'pinia';
import { Loading, LocalStorage } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { LoginForm } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const loggedIn = ref<boolean>(false);

  const loginUser = async (payload: LoginForm) => {
    Loading.show();
    console.log(payload);

    axios
      .post('http://127.0.0.1:8000/auth-token/', {
        username: payload.username,
        password: payload.password
      })
      .then((response) => {
        console.log(response);
        loggedIn.value = true;
        // LocalStorage.set('sapp_loggedIn', true);
      })
      .catch((error: Error) => {
        showErrorMessage(error.message);
      });
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
