<template>
  <q-card class="my-card">
    <q-card-section class="bg-info">
      <div class="text-h6">Login</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit()">
        <div class="q-gutter-md">
          <div>
            <q-input v-model="formData.login" label="Email" :rules="[
              (val) =>
                isValidEmailAddress(val) || 'Please enter a valid email address'
            ]" />
          </div>
          <div>
            <q-input v-model="formData.password" type="password" label="Password"
              :rules="[(val) => val.length >= 6 || 'Please use minimum 6 characters']" />
          </div>

        </div>
        <div>
          <q-card-actions class="q-pl-none">
            <q-btn label="Submit" type="submit" color="primary" />
          </q-card-actions>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>


<script setup lang="ts">

import { LoginForm } from 'src/types/User';
import { reactive } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';

const authStore = useAuthStore();
const { loginUser } = authStore;
const formData = reactive<LoginForm>({
  login: '',
  password: ''
});

const isValidEmailAddress = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
const onSubmit = () => {
  console.log(formData);
  loginUser(formData);
}

</script>