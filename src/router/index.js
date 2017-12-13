import Vue from 'vue'
import Router from 'vue-router'
import ToDoList from '@/components/ToDoList'
import DoneList from '@/components/DoneList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/todo', name: 'todoList', component: ToDoList },
    { path: '/done', name: 'doneList', component: DoneList },
    { path: '*', redirect: '/todo' }
  ]
})
