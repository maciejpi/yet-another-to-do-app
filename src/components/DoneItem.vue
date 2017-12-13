<template>
  <div class="tasks-list">

    <input type="checkbox"
           name="markCompleted"
           :checked="this.taskItem.completed"
           @change="markUncompleted">
    <label for="markCompleted"
           class="strike">{{ taskItem.content }}</label>

    <span>{{ taskItem.id | toDate }}</span>
    <button @click="remove">&#10005;</button>
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'DoneItem',
  props: ['task'],
  data () {
    return {
      isEdited: false,
      taskItem: {
        id: this.task.id,
        content: this.task.content,
        completed: this.task.completed
      }
    }
  },
  methods: {
    remove () {
      eventBus.$emit('removeTask', this.taskItem)
    },
    markUncompleted () {
      this.task.completed = false
      eventBus.$emit('taskStatusChange', this.taskItem)
    }
  }
}
</script>

