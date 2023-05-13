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
      todos: window.localStorage.todos ? JSON.stringify(window.localStorage.todos) : [],
      todo: window.localStorage.todo ? JSON.parse(window.localStorage.todo) : {},
    }
  },
  mutations: {
    storeTodos(state, todos) {
      state.todos = todos
      window.localStorage.setItem("todos", JSON.stringify(todos));

    },

    storeTodo(state, todo) {
      state.todo = todo
      localStorage.setItem('todo', JSON.stringify(todo))
    },
  },

  getters: {
    getTodos(state) {
      return state.todos
    },
    getTodo(state) {
      return state.todo
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
