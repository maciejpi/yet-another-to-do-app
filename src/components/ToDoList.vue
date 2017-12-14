<template>
  <div class="tasks-list">

    <div>{{ !tasksList.length ? '' : `You have ${tasksList.length} task${tasksList.length === 1 ? '' : 's' } to do` }}</div>

    <ul>
      <to-do-item v-for="task in tasksList"
                  :key="task.id"
                  :task="task"></to-do-item>
    </ul>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue'

export default {
  name: 'ToDoList',
  props: ['tasks'],
  components: {
    ToDoItem
  },
  computed: {
    tasksList () {
      return this.tasks.filter(item => !item.completed)
    }
  }
}
</script>
