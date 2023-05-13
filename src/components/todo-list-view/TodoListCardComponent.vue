<template>
  <v-card class="" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="text-h6 mb-1">
            {{ title }}
          </div>
          <div>
            <v-btn flat icon="mdi-trash-can" @click="$emit('delete')" outlined
              ><v-icon color="error">mdi-trash-can</v-icon></v-btn
            >
            <v-btn flat icon="mdi-pen" outlined @click="$emit('edit')"
              ><v-icon color="warning">mdi-pencil</v-icon></v-btn
            >
          </div>
        </div>

        <div class="text-caption">{{ list_desc }}</div>
      </div>
    </v-card-item>

    <v-card-actions class="d-flex justify-end">
      <div class="text-overline mb-1">
        {{ date }}
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  list_desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const test = ref("i want thisss");
</script>
