/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0,
      todos: window.localStorage.todos ? JSON.stringify(window.localStorage.todos) : [],
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    storeTodos(state, todos) {
      state.todos = todos
      window.localStorage.setItem("todos", JSON.stringify(todos));
      console.log('log+++++');

    },
  },

  getters: {
    getTodos(state) {
      return state.todos
    },
  }
})



// Install the store instance as a plugin
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(store)

registerPlugins(app)

app.mount('#app')
