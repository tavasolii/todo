<template>
  <v-card class="ma-6">
    <v-btn @click="modal = true" variant="outlined" color="success">Add Item</v-btn>
    <v-dialog
    v-model="modal"
    max-width="600"
    persistent
  >
    <v-card class="pa-8">
      <v-card-title class="d-flex justify-space-between">
        Add A New TodoList Item

        <v-btn icon flat @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <form @submit.prevent="submit" class="my-6">

          <v-text-field
            v-model="items.itemTitle"
            variant="outlined"
            :counter="10"
            label="item title"
          ></v-text-field>

          <v-textarea
            v-model="items.itemDesc"
            variant="outlined"
            label="item description"
          ></v-textarea>
          <v-row>
            <v-col>
              <v-text-field
                v-model="items.date"
                variant="outlined"
                type="date"
                label="due date"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="items.time"
                variant="outlined"
                type="time"
                label="due time"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-select
            v-model="items.priority"
            label="priority"
            variant="outlined"
            :items="[1, 2, 3, 4]"
          ></v-select>
          <v-divider :thickness="8"></v-divider>


      </form>
      <v-card-actions>
        <v-btn class="me-4" type="submit" @click="submit()"> submit </v-btn>

        <v-btn @click="modal = false"> close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">title</th>
          <th class="text-left">description</th>
          <th class="text-left">Date</th>
          <th class="text-left">priority</th>
          <th class="text-left">actions</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todo.items" :key="item">
          <td>{{ item.itemTitle }}</td>
          <td>{{ item.itemDesc }}</td>
          <td>{{ item.date }} {{ item.time }}</td>

          <td>{{ item.priority }}</td>
          <td><v-btn >edit</v-btn></td>
        </tr>
      </tbody>
    </v-table>

  </v-card>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const todo = computed(() => store.getters.getTodo);
    const modal = ref(false)

    const items = ref(
      {
        itemTitle: "",
        itemDesc: "",
        date: "",
        time: "",
        priority: "",
      },
    );

    const edit = value => {
      modal.value = true
      console.log(value);
      items.value = value

    }

    const submit = () => {
      const temp = JSON.parse(localStorage.getItem("todos") || "[]");
      temp.forEach(element => {
        console.log(element);
        console.log(todo.value);
        if( element.title === todo.value.title && element.todoListDesc == todo.value.todoListDesc){
          element = items.value

          console.log('element');
          console.log(element);
        }
      });
      window.localStorage.setItem("todos", JSON.stringify(temp));
      store.commit("storeTodos", temp);
      window.localStorage.setItem("todo", JSON.stringify(items.value));
      store.commit("storeTodo", items.value);
      modal.value = false
    }

    watch()

    return {
      todo,
      submit,
      modal,
      items,
      edit,
    };
  },
};
</script>
