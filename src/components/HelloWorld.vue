<template>
  <v-container class="">
    <app-bar-component @add="showModal = true"></app-bar-component>

    <v-responsive class="d-flex align-start text-start ">
      <todo-list-form-component
        :modal="showModal"
        @close="showModal = false"
      ></todo-list-form-component>
      {{ fuck }}
      <v-row v-if="todos">
        <v-col cols="12" lg="4" md="6" sm="12" v-for="todo in todos" :key="todo">
          <todo-list-card-component
            @delete="deleteTodo(todo)"
            :title="todo.title"
            :list_desc="todo.todoListDesc"
            :date="'5/12/2023'"
          ></todo-list-card-component>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex'
import AppBarComponent from "@/components/app-bar/AppBarComponent.vue";
import TodoListCardComponent from "./todo-list-view/TodoListCardComponent.vue";
import TodoListFormComponent from "./todo-list-view/TodoListFormComponent.vue";

const todos = ref([]);
onMounted(() => {
  console.log(`the component is now mounted.`);
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
const showModal = ref(false);
const store = useStore()
store.commit('increment')

console.log(store.state.count)

const deleteTodo = (todo) => {
  todos.value = todos.value.filter((x) => x !== todo);
};
watch(
  todos, (newTodoValue) => {
    console.log('kchanges');
    localStorage.setItem("todos", JSON.stringify(newTodoValue));
  },
  { deep: true }
);
document.addEventListener('storage', console.log('lklklk'));
window.addEventListener("storage", () => {
  // When local storage changes, dump the list to
  console.log('lklklk')
  console.log(JSON.parse(window.localStorage.getItem("todos")));
});
const event = new Event('itemInserted');
document.dispatchEvent(event);

const fuck = computed(() => JSON.parse(localStorage.getItem("todos")) || [])
console.log(fuck);
window.addEventListener('storage', function() {
 console.log('Woohoo, someone changed my localstorage va another tab/window!');
});
</script>

