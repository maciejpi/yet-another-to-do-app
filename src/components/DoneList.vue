<template>
  <div class="tasks-list">

    <div class="tasks-list-header">
      <p>{{ tasksCountInfo }}</p>
      <button v-if="tasksList.length >=2"
              @click="deleteAll"
              class="btn-secondary large">Delete all</button>
    </div>

    <transition-group tag="ul"
                      :name="animation">
      <done-item v-for="task in tasksList"
                 :key="task.id"
                 :task="task"></done-item>
    </transition-group>

  </div>
</template>

<script>
import DoneItem from './DoneItem.vue'
import { eventBus } from '../main'

export default {
  name: 'DoneList',
  props: ['tasks'],
  data () {
    return {
      animation: ''
    }
  },
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
    },
    tasksCountInfo () {
      return !this.tasksList.length
        ? "You haven't completed any tasks yet."
        : `${this.tasksList.length} task${
            this.tasksList.length === 1 ? '' : 's'
          } done.`
    }
  },
  created () {
    eventBus.$on('taskStatusChange', task => {
      this.animation = 'rotate'
    })
    eventBus.$on('removeTask', task => {
      this.animation = ''
    })
  }
}
</script>
