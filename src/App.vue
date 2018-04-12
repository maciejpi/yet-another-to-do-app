<template>
  <div id="app"
       class="wrapper">

    <h1 class="title">Yet another to-do app</h1>

    <form @keyup.prevent.enter="createTask"
          class="new-task">
      <p>New task</p>
      <div class="new-task-inner">
        <input type="text"
               v-model="newTask"
               class="text-input">
        <button :disabled="this.newTask === ''"
                @click.prevent="createTask"
                class="btn-primary">Create</button>
      </div>
    </form>

    <navigation></navigation>

    <transition name="fade"
                mode="out-in">
      <router-view :tasks="tasks"></router-view>
    </transition>

  </div>
</template>

<script>
import { eventBus } from './main'
import navigation from './components/navigation.vue'

export default {
  name: 'app',
  components: {
    navigation
  },
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
        return (
          this.$route.name !== 'todoList' &&
          this.$router.push({ name: 'todoList' })
        )
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
    eventBus.$on('taskStatusChange', task => {
      this.tasks.map(item => {
        if (item.id === task.id) {
          item.completed = task.completed
        }
      })
      this.syncLocalStorage()
    })
  }
}
</script>
