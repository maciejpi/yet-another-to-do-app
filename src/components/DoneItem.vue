<template>
  <li class="task-item-wrapper">

    <task-status :task="task"></task-status>

    <div class="task-item-inner">
      <div class="task-content is-done">
        <p class="task-text strike">{{ taskItem.content }}</p>
        <p class="created-date">Created on {{ taskItem.id | toDate }}</p>
      </div>

      <remove-button :task="task"></remove-button>
    </div>

  </li>
</template>

<script>
import TaskStatus from './TaskStatus.vue'
import RemoveButton from './RemoveButton.vue'

export default {
  name: 'DoneItem',
  props: ['task'],
  components: {
    TaskStatus,
    RemoveButton
  },
  data () {
    return {
      taskItem: {
        id: this.task.id,
        content: this.task.content
      }
    }
  }
}
</script>
