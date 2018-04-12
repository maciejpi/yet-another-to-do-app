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
import { taskStateAnimation } from '../helpers/mixins'

export default {
  name: 'ToDoList',
  mixins: [taskStateAnimation],
  props: ['tasks'],
  components: {
    ToDoItem
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
  }
}
</script>
