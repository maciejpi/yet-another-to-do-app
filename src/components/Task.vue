<template>
  <li>
    <div v-if="isEdited">
      <input type="text"
             v-model="task.content"
             autofocus
             v-focus
             @keyup.esc="abort">
      <button @click="save">Save</button>
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
      isCompleted: false
    }
  },
  methods: {
    remove (task) {
      this.$emit('removeTask', task)
    },
    edit () {
      this.isEdited = true
      focus()
    },
    save () {
      this.isEdited = false
    },
    abort () {
      this.isEdited = false
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

