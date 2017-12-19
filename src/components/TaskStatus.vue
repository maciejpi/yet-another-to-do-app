<template>
  <div class="completed-state">
    <input type="checkbox"
           id="status-change"
           @change="statusChange"
           v-model="task.completed">
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: 'TaskStatus',
  props: ['task'],
  methods: {
    statusChange () {
      eventBus.$emit('taskStatusChange', this.task)
    }
  }
}
</script>
