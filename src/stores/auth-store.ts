import { defineStore } from 'pinia';
import { Loading, LocalStorage, useQuasar } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { LoginForm } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { DrfError } from 'src/types/DrfError';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const $q = useQuasar();
  const userToken = ref<string | null>(
    LocalStorage.getItem('sapp_userToken') === 'null'
      ? null
      : `${LocalStorage.getItem('sapp_userToken')}`
  );

  const loginUser = async (payload: LoginForm) => {
    Loading.show();

    axios
      .post('http://127.0.0.1:8000/api/auth-token/', {
        username: payload.username,
        password: payload.password
      })
      .then((response) => {
        if (response.status === 200) {
          userToken.value = response.data.token;
          LocalStorage.set('sapp_userToken', userToken.value);
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Successfully logged in'
          });

          router.push('/').catch((error: Error) => {
            showErrorMessage(error.message);
          });
        }
        Loading.hide();
      })
      .catch((error: Error | DrfError) => {
        if ('response' in error) {
          const errorData = error.response.data;
          const message = errorData.non_field_errors.join(', ');
          showErrorMessage(message);
        } else {
          showErrorMessage(error.message);
        }
      });
  };

  const logoutUser = async () => {
    userToken.value = null;
    LocalStorage.set('sapp_userToken', null);
    router.replace('/auth').catch((error: Error) => {
      showErrorMessage(error.message);
    });
  };

  return {
    userToken,
    loginUser,
    logoutUser
  };
});
