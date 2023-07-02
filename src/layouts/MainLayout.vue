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
        <q-btn dense flat round icon="menu" @click="toggleMenu" />
        <q-btn v-if="loggedUser" dense flat round icon="logout" @click="logoutUser" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header>
          Choose an option
        </q-item-label>
        
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        
      </q-list>
      <q-footer v-if="loggedUser"
        class="bg-grey-3 text-dark"
      >
        <q-item>
          <q-item-section>
            {{ loggedUser.username }}
          </q-item-section>
            <q-item-section
              avatar
            >
              <q-icon name="settings" />
            </q-item-section>   
        </q-item>
      </q-footer>
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
const { loggedUser } = storeToRefs(authStore);

const rightDrawerOpen = ref(false);

const essentialLinks = [
  {
    title: 'Babel.me',
    caption: 'Online chat with direct translations',
    icon: 'chat',
    link: 'https://quasar.dev',
    loginRequired: false
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