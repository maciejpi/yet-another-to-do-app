<template>
  <li class="task-item-wrapper">

    <task-status :task="task"></task-status>

    <div class="task-item-inner">
      <div class="task-content is-done">
        <p class="task-text strike">{{ taskItem.content }}</p>
        <p class="created-date">Created on {{ taskItem.id | toDate }}</p>
      </div>

      <button @click="remove"
              class="btn-secondary">Delete</button>
    </div>

  </li>
</template>

<script>
import { eventBus } from '../main'
import TaskStatus from './TaskStatus.vue'

export default {
  name: 'DoneItem',
  props: ['task'],
  components: {
    TaskStatus
  },
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
    }
  }
}
</script>

