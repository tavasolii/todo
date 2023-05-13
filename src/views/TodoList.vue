<template>
  <v-card class="ma-6">
    <!-- <v-btn @click="modal = true" variant="outlined" color="success"
      >Add Item</v-btn
    > -->
    <v-dialog v-model="modal" max-width="600" persistent>
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
    <v-row class="my-6">
      <v-col cols="12" sm="12" lg="4" md="6">
        <v-select
          v-model="selectedCols"
          :items="cols"
          item-title="state"
          item-value="val"
          label="columns to show"
          multiple
          dense
          hint="Pick your favorite columns"
          persistent-hint
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th
            v-if="selectedCols.findIndex((e) => e === 1) !== -1"
            class="text-left"
          >
            title
          </th>
          <th
            v-if="selectedCols.findIndex((e) => e === 2) !== -1"
            class="text-left"
          >
            description
          </th>
          <th
            v-if="selectedCols.findIndex((e) => e === 3) !== -1"
            class="text-left"
          >
            Date
          </th>
          <th
            v-if="selectedCols.findIndex((e) => e === 4) !== -1"
            class="text-left"
          >
            priority
          </th>
          <!-- <th v-if="selectedCols.title" class="text-left">actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todo.items" :key="item">
          <td v-if="selectedCols.findIndex((e) => e === 1) !== -1">
            {{ item.itemTitle }}
          </td>
          <td v-if="selectedCols.findIndex((e) => e === 2) !== -1">
            {{ item.itemDesc }}
          </td>
          <td v-if="selectedCols.findIndex((e) => e === 3) !== -1">
            {{ item.date }} {{ item.time }}
          </td>

          <td v-if="selectedCols.findIndex((e) => e === 4) !== -1">
            {{ item.priority }}
          </td>
          <!-- <td v-if="selectedCols.title"><v-btn >edit</v-btn></td> -->
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
    const modal = ref(false);

    const items = ref({
      itemTitle: "",
      itemDesc: "",
      date: "",
      time: "",
      priority: "",
    });

    const selectedCols = ref([1, 2, 3, 4]);
    const cols = ref([
      { state: "title", val: 1 },
      { state: "description", val: 2 },
      { state: "date", val: 3 },
      { state: "priority", val: 4 },
    ]);
    watch(selectedCols.value, () => {
      console.log("kmkmk");
    });

    const edit = (value) => {
      modal.value = true;
      console.log(value);
      items.value = value;
    };

    const submit = () => {
      const temp = JSON.parse(localStorage.getItem("todos") || "[]");
      temp.forEach((element) => {
        console.log(element);
        console.log(todo.value);
        if (
          element.title === todo.value.title &&
          element.todoListDesc == todo.value.todoListDesc
        ) {
          element = items.value;

          console.log("element");
          console.log(element);
        }
      });
      window.localStorage.setItem("todos", JSON.stringify(temp));
      store.commit("storeTodos", temp);
      window.localStorage.setItem("todo", JSON.stringify(items.value));
      store.commit("storeTodo", items.value);
      modal.value = false;
    };

    watch();

    return {
      todo,
      selectedCols,
      cols,
      submit,
      modal,
      items,
      edit,
    };
  },
};
</script>
