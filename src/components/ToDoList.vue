<template>
  <div class="tasks-list">

    <div class="tasks-list-header">
      <p>{{ tasksCountInfo }}</p>
    </div>

    <transition-group tag="ul"
                      :name="animation">
      <to-do-item v-for="task in tasksList"
                  :key="task.id"
                  :task="task"></to-do-item>
    </transition-group>

  </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue'
import { eventBus } from '../main'

export default {
  name: 'ToDoList',
  props: ['tasks'],
  components: {
    ToDoItem
  },
  data () {
    return {
      animation: ''
    }
  },
  computed: {
    tasksList () {
      return this.tasks.filter(item => !item.completed)
    },
    tasksCountInfo () {
      return !this.tasksList.length
        ? 'You have no tasks to do.'
        : `You have ${this.tasksList.length} task${
            this.tasksList.length === 1 ? '' : 's'
          } to do.`
    }
  },
  created () {
    eventBus.$on('taskStatusChange', task => {
      this.animation = 'rotate'
    })
    eventBus.$on('removeTask', task => {
      this.animation = ''
    })
  }
}
</script>
