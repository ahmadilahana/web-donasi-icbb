<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 bg-light"
    style="width: 280px"
  >
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link" :class="{ 'active': this.$route.path === '/', 'link-dark': !(this.$route.path==='/')}" aria-current="page">
          <i class="fas fa-home"></i>
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/data-donasi" class="nav-link" :class="{ 'active': this.$route.path === '/data-donasi', 'link-dark': !(this.$route.path==='/data-donasi')}">
          <i class="fas fa-database"></i>
          Data Donasi
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>
