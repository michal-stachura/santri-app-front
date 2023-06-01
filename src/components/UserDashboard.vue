<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">CurrentUser</div>
      {{ userToken }}
    </q-card-section>
    <q-card-section>
      <p v-for="message in chatMessages" :key="message">
        {{ message }}
      </p>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">user@example.com</div>
      97b7553bad039949265583cfc80ef3ae427e1208
      <p v-for="message in chatMessages" :key="message">
        {{ message }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const chatMessages = ref<string[]>([]);
const chatMessages2 = ref<string[]>([]);

const { userToken } = storeToRefs(authStore);


const chatSocket = new WebSocket(
  `ws://127.0.0.1:8000/ws/chat/lobby/?token=${userToken.value}`
);

const chatSocket2 = new WebSocket(
  'ws://127.0.0.1:8000/ws/chat/lobby/?token=97b7553bad039949265583cfc80ef3ae427e1208'
);



chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  chatMessages.value.push(data.message);
};

chatSocket.onclose = function (e) {
  console.log(e);
  console.error('Chat socket closed unexpectedly');
};

chatSocket2.onmessage = function (e) {
  const data = JSON.parse(e.data);
  chatMessages2.value.push(data.message);
};

chatSocket2.onclose = function (e) {
  console.log(e);
  console.error('Chat socket closed unexpectedly');
};
</script>