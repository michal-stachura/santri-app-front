import { defineStore } from 'pinia';
import { Loading, LocalStorage, useQuasar } from 'quasar';
import { showErrorMessage } from 'src/composables/show-error-message';
import { LoginForm, User } from 'src/types/User';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { DrfError } from 'src/types/DrfError';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const $q = useQuasar();
  const loggedUser = ref<User | null>(
    LocalStorage.getItem('sapp_user') === 'null'
      ? null
      : LocalStorage.getItem('sapp_user')
  );
  const dashboardSocket = ref<WebSocket | null>(null);
  const dashboardMessages = ref<string[]>([]);

  const loginUser = async (payload: LoginForm) => {
    Loading.show();

    axios
      .post('http://127.0.0.1:8000/api/auth-token/', {
        username: payload.username,
        password: payload.password
      })
      .then((response) => {
        if (response.status === 200) {
          loggedUser.value = {
            token: response.data.token,
            email: payload.username
          };
          LocalStorage.set('sapp_user', loggedUser.value);
          dashboardSocket.value = new WebSocket(
            `ws://127.0.0.1:8000/ws/dashboard/${loggedUser.value.token}/?email=${loggedUser.value.email}`
          );

          dashboardSocket.value.onmessage = function (e) {
            const data = JSON.parse(e.data);
            dashboardMessages.value.push(data.message);
          };

          dashboardSocket.value.onclose = function (e) {
            console.log(e);
            console.error('Chat socket closed unexpectedly');
          };

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
    loggedUser.value = null;
    LocalStorage.set('sapp_user', null);
    if (dashboardSocket.value) {
      dashboardSocket.value.close();
      dashboardSocket.value = null;
    }
    router.replace('/auth').catch((error: Error) => {
      showErrorMessage(error.message);
    });
  };

  return {
    loggedUser,
    dashboardMessages,
    loginUser,
    logoutUser
  };
});
