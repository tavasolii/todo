<template>
<v-layout>
  <v-app-bar>
    <v-breadcrumbs  :items="items"></v-breadcrumbs>
  </v-app-bar>

  <v-main>
    <router-view />
  </v-main>
</v-layout>
</template>

<script setup>
import { ref } from 'vue'
  const items = ref([
        {
          title: 'Home',
          disabled: false,
          href: '../',
        },
        {
          title: 'Todo list',
          disabled: false,
          href: '',
        },

      ])
</script>
