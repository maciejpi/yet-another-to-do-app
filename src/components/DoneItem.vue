<template>
  <div class="tasks-list">

    <input type="checkbox"
           name="markUncompleted"
           v-model="taskItem.completed"
           @change="undoTask">
    <label for="markUncompleted"
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
      this.$emit('removeTask', this.taskItem)
    },
    undoTask () {
      eventBus.$emit('taskStatusChange', this.taskItem)
      this.$emit('taskStatusChange', this.taskItem)
    }
  }
}
</script>

