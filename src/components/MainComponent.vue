<template>
  <v-container class="">
    <app-bar-component @add="showModal = true"></app-bar-component>

    <v-responsive class="d-flex align-start text-start ">
      <todo-list-form-component
        :modal="showModal"
        @close="showModal = false"
      ></todo-list-form-component>
      <v-row v-if="todos">
        <v-col cols="12" lg="4" md="6" sm="12" v-for="todo in todos" :key="todo">
          <todo-list-card-component
            @delete="deleteTodo(todo)"
            @edit="edit(todo)"
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
import { ref, onMounted, watch } from "vue";
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

const deleteTodo = todo => {
  todos.value = todos.value.filter((x) => x !== todo);
};

const edit = todo => {
  window.location.href = `/todolist/${todo.title}`
}
watch(
  todos, (newTodoValue) => {
    localStorage.setItem("todos", JSON.stringify(newTodoValue));
  store.commit('storeTodos', todos.value )

  },
  { deep: true }
);

watch(() => store.getters.getTodos, () => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];

   });

</script>

