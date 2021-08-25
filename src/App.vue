<template>
  <div v-if="this.$route.path !== '/login' && this.$route.path !== '/to-tv'" style="height: 100%">
    <Navbar />
    <div class="row component" style="margin: 0">
      <Sidebar class="col-md-3"/>
      <router-view class="col-md-9"/>
    </div>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
        </a>
        <span class="text-muted">&copy; 2021 Company, Inc</span>
      </div>
    </footer>
  </div>
  <div v-else-if="this.$route.path === '/login'" class="d-flex align-content-center" style="height: 100%">
    <router-view />
  </div>
  <div v-else-if="this.$route.path === '/to-tv'" class="d-flex align-content-center" style="height: 100%">
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  created: function () {
    if (this.$route.path === '/login') {
      document.getElementById('app').classList.add('text-center')
    } else {
      document.getElementById('app').classList.remove('text-center')
    }
  }
}
</script>

<style>
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
nav{
  height: 10%;
}
.component{
  min-height: 80%;
  max-height: auto;
}
footer{
  height: 10%;
}
</style>
