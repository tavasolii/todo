<template>
  <v-dialog
    :modelValue="modal"
    max-width="600"
    @update:modelValue="modal = $event"
    persistent
  >
    <v-card class="pa-8">
      <v-card-title class="d-flex justify-space-between">
        Add A New TodoList

        <v-btn icon flat @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <form @submit.prevent="submit" class="my-6">
        <span>list info:</span>

        <v-text-field
          v-model="todo.title"
          variant="outlined"
          label="title"
        ></v-text-field>

        <v-textarea
          v-model="todo.todoListDesc"
          variant="outlined"
          label="todo list description"
        ></v-textarea>
        <span>items info:</span>
        <div v-for="(item, index) in items" :key="item">
          item {{ index+1 }}:
          <v-text-field
            v-model="item.itemTitle"
            variant="outlined"
            :counter="10"
            label="item title"
            @input="tt()"
          ></v-text-field>

          <v-textarea
            v-model="item.itemDesc"
            variant="outlined"
            label="item description"
          ></v-textarea>
          <v-row>
            <v-col>
              <v-text-field
                v-model="item.date"
                variant="outlined"
                type="date"
                label="due date"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="item.time"
                variant="outlined"
                type="time"
                label="due time"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-select
            v-model="item.priority"
            label="priority"
            variant="outlined"
            :items="[1, 2, 3, 4]"
          ></v-select>
          <v-divider :thickness="8" ></v-divider>
        </div>

        <v-btn @click="addItem" icon flat color="success"><v-icon>mdi-plus</v-icon></v-btn>


      </form>
      <v-card-actions>
        <v-btn class="me-4" type="submit" @click="submit()"> submit </v-btn>

        <v-btn @click="$emit('close')"> close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex'


export default {
  props: {
    modal: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup(props, { emit }) {
const store = useStore()

    const title = ref("");
    const todoListDesc = ref("");
    const date = ref("");
    const select = ref("");
    const checkbox = ref("");
    const itemDesc = ref("");
    const itemTitle = ref("");
    const priority = ref("");

    const todo = ref({
      title: "",
      todoListDesc: "",

    });

    const items = ref([
      {
        itemTitle: "",
        itemDesc: "",
        date: "",
        time: "",
        priority: "",
      },
    ]);

    const addItem = () => {
      items.value.push({
        itemTitle: "",
        itemDesc: "",
        date: "",
        time: "",
        priority: "",
      });
    };

    const time = ref("");
    console.log("knknknknkn");
    const tt = () => {
      console.log(todoListDesc);
    };

    const submit = () => {
      console.log('sdasdsadddsadasadsdaasd');
      const temp = JSON.parse(localStorage.getItem("todos") || "[]");
      const newItem = {}
      newItem.title = todo.value.title
      newItem.todoListDesc = todo.value.todoListDesc
      newItem.items = items.value
      console.log(newItem);
      temp.push(newItem);
      console.log(temp);
      window.localStorage.setItem("todos", JSON.stringify(temp));
      store.commit('storeTodos', temp )

      emit("close");
    };

    return {
      todo,
      store,
      time,
      addItem,
      title,
      priority,
      todoListDesc,
      date,
      select,
      checkbox,
      items,
      submit,
      itemTitle,
      itemDesc,
      tt,
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
    };
  },
};
</script>
