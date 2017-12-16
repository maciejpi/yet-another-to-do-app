<template>
  <div class="tasks-list">

    <div>{{ !tasksList.length ? 'You haven\'t completed any tasks yet' : `${tasksList.length} task${tasksList.length === 1 ? '' : 's' } done` }}</div>
    <button @click="deleteAll">Delete all</button>

    <transition-group tag="ul"
                      :name="transition">
      <done-item v-for="task in tasksList"
                 :key="task.id"
                 @taskStatusChange="moveTaskTransition"
                 @removeTask="cancelTransition"
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
      transition: ''
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
    },
    moveTaskTransition () {
      this.transition = 'rotate'
    },
    cancelTransition () {
      this.transition = ''
    }
  },
  computed: {
    tasksList () {
      return this.tasks.filter(item => item.completed)
    }
  }
}
</script>
