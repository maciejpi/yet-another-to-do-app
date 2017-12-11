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
      <button @click="remove">&#10005;</button>
    </div>
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
    remove (task) {
      task = this.taskItem
      this.$emit('removeTask', task)
    },
    edit () {
      this.isEdited = true
    },
    save (task) {
      task = this.taskItem
      this.$emit('updateTask', task)
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
  }
}
</script>

