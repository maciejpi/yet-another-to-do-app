import { eventBus } from '../main'

export const taskStateAnimation = {
  data () {
    return {
      animation: ''
    }
  },
  created () {
    eventBus.$on('taskStatusChange', task => (this.animation = 'rotate'))
    eventBus.$on('removeTask', task => (this.animation = ''))
  }
}
