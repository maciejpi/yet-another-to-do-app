<template>
  <li class="task-item-wrapper">

    <task-status :task="taskItem"></task-status>

    <div v-if="isEdited"
         @keyup.enter="save"
         @keyup.esc="cancel"
         class="task-item-inner">

      <div class="task-content is-edited">
        <input type="text"
               v-model.lazy="taskItem.content"
               autofocus
               v-focus
               class="text-input">
      </div>
      <div class="controls">
        <button @click="save"
                class="btn-primary small">Save</button>
        <button @click="cancel"
                class="btn-secondary">Cancel</button>
      </div>
    </div>

    <div v-else
         class="task-item-inner">
      <div class="task-content">
        <p @dblclick="edit"
           class="task-text">{{ taskItem.content }}</p>
        <p class="created-date">Created on {{ taskItem.id | toDate }}</p>
      </div>
      <div class="controls">
        <button @click="edit"
                class="btn-secondary">Edit</button>
        <button @click="remove"
                class="btn-secondary">Delete</button>
      </div>
    </div>

  </li>
</template>

<script>
import { eventBus } from '../main'
import TaskStatus from './TaskStatus.vue'

export default {
  name: 'ToDoItem',
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
    },
    edit () {
      this.isEdited = true
    },
    save () {
      this.taskItem.content === '' ? this.remove() : eventBus.$emit('updateTask', this.taskItem)
      this.isEdited = false
    },
    cancel () {
      this.taskItem.content = this.task.content
      this.isEdited = false
    }
  }
}
</script>

