<template>
  <q-item
    v-if="shouldDisplayItem"
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
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
