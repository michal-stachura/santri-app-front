<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Test Dashboard component</div>
    </q-card-section>
    <q-card-section>
      <p v-for="message in chatMessages" :key="message">
        {{ message }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const chatSocket = new WebSocket(
  'ws://127.0.0.1:8000/ws/chat/lobby/'
);
const chatMessages = ref<string[]>([]);


chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  chatMessages.value.push(data.message);
};

chatSocket.onclose = function (e) {
  console.log(e);
  console.error('Chat socket closed unexpectedly');
};
</script>