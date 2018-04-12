<template>
   <button @click="remove"
              class="btn-secondary">Delete</button>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'RemoveButton',
  props: ['task'],
  methods: {
    remove () {
      eventBus.$emit('removeTask', this.task)
    }
  }
}
</script>
