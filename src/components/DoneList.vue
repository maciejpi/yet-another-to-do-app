<template>
  <div class="tasks-list">

    <div>{{ !tasksList.length ? 'You haven\'t completed any tasks yet' : `${tasksList.length} task${tasksList.length === 1 ? '' : 's' } done` }}</div>
    <button @click="deleteAll()">Delete all</button>

    <ul v-for="task in tasksList"
        :key="task.id">
      <done-item :task="task"></done-item>

    </ul>
  </div>
</template>

<script>
import DoneItem from './DoneItem.vue'
import { eventBus } from '../main'

export default {
  name: 'DoneList',
  props: ['tasks'],
  components: {
    DoneItem
  },
  methods: {
    deleteAll () {
      this.tasksList.map(item => {
        eventBus.$emit('removeTask', item)
      })
    }
  },
  computed: {
    tasksList () {
      return this.tasks.filter(item => item.completed)
    }
  }
}
</script>
