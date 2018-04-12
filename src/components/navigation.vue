<template>
  <nav>
    <ul class="main-nav">
      <li>
        <a href="#">
          <router-link tag="h2"
                        :to="{ name: 'todoList' }"
                        class="nav-link">To-Do
          </router-link>
        </a>
      </li>

      <li>
        <a href="#">
          <router-link tag="h2"
                        :to="{ name: 'doneList' }"
                        class="nav-link">Done
          </router-link>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navigation'
}
</script>
