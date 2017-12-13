import Vue from 'vue'

// autofocus seems not to work in firefox (57)
Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})
