<template>
  <li>
    <div v-if="isEdited">
      <div @keyup.enter="save"
           @keyup.esc="cancel">
        <input type="text"
               v-model.lazy="taskItem.content"
               autofocus
               v-focus>
        <button @click="save">Save</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>

    <div v-else>
      <input type="checkbox"
             name="markCompleted"
             :checked="this.taskItem.completed"
             @change="markCompleted">
      <label for="markCompleted"
             @dblclick="edit">{{ taskItem.content }}</label>
      <button @click="edit">Edit</button>
    </div>
    <span>{{ taskItem.id | toDate }}</span>
    <button @click="remove">&#10005;</button>
  </li>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'ToDoItem',
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
    edit () {
      this.isEdited = true
    },
    save () {
      this.taskItem.content === '' ? this.remove() : eventBus.$emit('updateTask', this.taskItem)
      this.isEdited = false
    },
    cancel () {
      this.isEdited = false
      this.taskItem.content = this.task.content
    },
    markCompleted () {
      this.task.completed = true
      eventBus.$emit('taskStatusChange', this.taskItem)
    }
  }
}
</script>

