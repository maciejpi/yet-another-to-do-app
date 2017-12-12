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
             id=""
             v-model="isCompleted">
      <label for="markCompleted"
             :class="{ strike : isCompleted }"
             @dblclick="edit">{{ task.content }}</label>
      <button @click="edit">Edit</button>
    </div>
    <span>{{ task.id | toDate }}</span>
    <button @click="remove">&#10005;</button>
  </li>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return {
      isEdited: false,
      isCompleted: false,
      taskItem: {
        id: this.task.id,
        content: this.task.content
      }
    }
  },
  methods: {
    remove () {
      this.$emit('removeTask', this.taskItem)
    },
    edit () {
      this.isEdited = true
    },
    save () {
      this.taskItem.content === '' ? this.remove() : this.$emit('updateTask', this.taskItem)
      this.isEdited = false
    },
    cancel () {
      this.isEdited = false
      this.taskItem.content = this.task.content
    }
  },
  // autofocus seems not to work in firefox (57)
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  filters: {
    toDate (value) {
      function formatDate (date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      }
      return formatDate(new Date(value))
    }
  }
}
</script>

