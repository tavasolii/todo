<template>
  <v-container class="fill-height">
    <app-bar-component></app-bar-component>

    <v-responsive class="d-flex align-start text-start fill-height">
      <todo-list-card-component :title="'sidjf'" :list_desc="'bjdbbjb'" :date="'5/12/2023'"></todo-list-card-component>

      <!-- <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
      <h1 class="text-h2 font-weight-bold">Vuetify</h1>
{{ test }}
      <div class="py-14" /> -->
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import AppBarComponent from '@/components/app-bar/AppBarComponent.vue'
import TodoListCardComponent from "./todo-list-view/TodoListCardComponent.vue";


const test = ref("i want thisss");
</script>

