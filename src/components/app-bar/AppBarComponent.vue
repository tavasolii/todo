<template>
  <v-container>
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>TODO LISTS</v-app-bar-title>

      </template>
      <template v-slot:append>
        <v-tooltip text="add a new todo list" location="bottom"  >
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus" outlined color="success" size="small">
              <v-icon class="pa-4" size="30px" style="border: 3px solid green; border-radius: 50% ;">
                mdi-plus
              </v-icon></v-btn>
          </template>
        </v-tooltip>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
  </v-container>
</template>
