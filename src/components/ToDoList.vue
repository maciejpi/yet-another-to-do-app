<template>
  <div class="tasks-list">

    <div>{{ !tasksList.length ? 'You have no tasks to do' : `You have ${tasksList.length} task${tasksList.length === 1 ? '' : 's' } to do` }}</div>

    <transition-group tag="ul"
                      :name="transition">
      <to-do-item v-for="task in tasksList"
                  :key="task.id"
                  @taskStatusChange="moveTaskTransition"
                  @removeTask="cancelTransition"
                  :task="task"></to-do-item>
    </transition-group>
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
  data () {
    return {
      transition: ''
    }
  },
  methods: {
    moveTaskTransition () {
      this.transition = 'rotate'
    },
    cancelTransition () {
      this.transition = ''
    }
  },
  computed: {
    tasksList () {
      return this.tasks.filter(item => !item.completed)
    }
  }
}
</script>
