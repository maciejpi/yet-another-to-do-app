<template>
  <div id="app">

    <form @keyup.prevent.enter="createTask">
      <input type="text"
             v-model="newTask">
      <button :disabled="this.newTask === ''"
              @click.prevent="createTask">Create</button>
    </form>

    <nav>
      <ul>
        <router-link tag="li"
                     :to="{ name: 'todoList' }">ToDo</router-link>
        <router-link tag="li"
                     :to="{ name: 'doneList' }">Done</router-link>
      </ul>
    </nav>

    <router-view :tasks="tasks"></router-view>

  </div>
</template>

<script>
import { eventBus } from './main'

export default {
  name: 'app',

  data () {
    return {
      newTask: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  methods: {
    createTask () {
      if (this.newTask !== '') {
        this.tasks.unshift({
          id: Date.now(),
          content: this.newTask,
          completed: false
        })
        this.newTask = ''
        this.syncLocalStorage()
        if (this.$route.name !== 'todoList') {
          this.$router.push({ name: 'todoList' })
        }
      }
    },
    syncLocalStorage () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  },
  created () {
    eventBus.$on('removeTask', task => {
      this.tasks = this.tasks.filter(item => item.id !== task.id)
      this.syncLocalStorage()
    })
    eventBus.$on('updateTask', task => {
      this.tasks.map(item => {
        if (item.id === task.id) {
          item.content = task.content
        }
      })
      this.syncLocalStorage()
    })
    eventBus.$on('taskStatusChange', task => this.syncLocalStorage())
  }
}
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
