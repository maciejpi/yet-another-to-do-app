<template>
  <div class="tasks-list">
    <form @keyup.prevent.enter="createTask">
      <input type="text"
             v-model="taskText">
      <button :disabled="this.taskText === ''"
              @click.prevent="createTask">Create</button>
    </form>

    <div>{{ !tasks.length ? 'you have no tasks' : `you have ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks' }` }}</div>
    <ul v-for="task in tasks"
        :key="task.id">
      <app-task :task="task"
                @removeTask="removeTask(task)"></app-task>
    </ul>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'ToDoList',
  components: {
    AppTask: Task
  },
  data () {
    return {
      taskText: '',
      tasks: []
    }
  },
  methods: {
    createTask () {
      if (this.taskText !== '') {
        this.tasks.push({
          id: Date.now(),
          content: this.taskText
        })
        this.taskText = ''
      }
    },
    removeTask (task) {
      this.tasks = this.tasks.filter(item => item.id !== task.id)
    }
  }
}
</script>
