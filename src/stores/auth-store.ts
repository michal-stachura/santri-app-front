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

  if (process.env.APP_API_URL) {
  }
  console.log(process.env.APP_API_URL)

  const loggedUser = ref<User | null>(
    LocalStorage.getItem('sapp_user') === 'null'
      ? null
      : LocalStorage.getItem('sapp_user')
  );
  const dashboardSocket = ref<WebSocket | null>(null);
  
  const openWebSocket = async () => {
    if (loggedUser.value) {
      const wss = process.env.APP_WEBSOCKET_URL
      if (wss) {
        dashboardSocket.value = new WebSocket(
          wss
        );
  
        dashboardSocket.value.onopen = () => {
          dashboardSocket.value?.send(
            JSON.stringify({ token: loggedUser.value?.token })
          );
        };
  
        dashboardSocket.value.onmessage = (e) => {
          const data = JSON.parse(e.data);
          switch (data.type) {
            case 'dashboard.notification':
              console.log(data.message);
              break;
  
            default:
              break;
          }
        };
  
        dashboardSocket.value.onclose = (e) => {
          console.log(e);
          console.error('Dashboard socket closed unexpectedly');
        };
      }
    }
  };

  const closeWebSocket = async () => {
    if (dashboardSocket.value) {
      dashboardSocket.value.close();
      dashboardSocket.value = null;
    }
  };

  const loginUser = async (payload: LoginForm) => {
    Loading.show();
    const url = process.env.APP_API_URL;
    if (url) {
      axios
        .post(url, {
          username: payload.username,
          password: payload.password
        })
        .then((response) => {
          if (response.status === 200) {
            loggedUser.value = {
              token: response.data.token
            };
            LocalStorage.set('sapp_user', loggedUser.value);
            openWebSocket();
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
    }
  };

  const logoutUser = async () => {
    loggedUser.value = null;
    LocalStorage.set('sapp_user', null);
    closeWebSocket();
    router.replace('/auth').catch((error: Error) => {
      showErrorMessage(error.message);
    });
  };

  return {
    loggedUser,
    dashboardSocket,
    loginUser,
    logoutUser,
    openWebSocket,
    closeWebSocket
  };
});
