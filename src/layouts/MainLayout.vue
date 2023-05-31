<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat class="q-pl-none" to="/">
            <q-avatar class="q-mr-sm" size="36px">
              <img src="logo.png">
            </q-avatar>
            Santri App
          </q-btn>
        </q-toolbar-title>
        <q-btn v-if="userToken" dense flat round icon="menu" @click="toggleMenu" />
        <q-btn v-if="userToken" dense flat round icon="logout" @click="logoutUser" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="left" bordered>
      <q-list v-if="userToken">
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-info text-dark">
      <q-toolbar>
        v 1.0
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth-store';
import EssentialLink from 'components/EssentialLink.vue';

const authStore = useAuthStore();
const { logoutUser } = authStore;
const { userToken } = storeToRefs(authStore);

console.log(userToken.value);

const rightDrawerOpen = ref(false);

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];



const toggleMenu = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

</script>