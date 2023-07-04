<template>
  <q-btn
    v-if="shouldDisplayItem"
    :to="link"
    size="md"
    align="left"
    flat
    class="w-full"
  >
    <q-item>
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>
  
      <q-item-section align="left">
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption lines="1">{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth-store';
import { computed } from 'vue';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  loginRequired?: boolean
}

const authStore = useAuthStore();
const { loggedUser } = storeToRefs(authStore);

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  loginRequired: true
});

const shouldDisplayItem = computed(() => {
  return (loggedUser.value !== null) || (!loggedUser.value && !props.loginRequired);
});

</script>
