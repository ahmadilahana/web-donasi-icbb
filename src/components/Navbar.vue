<template>
  <nav class="navbar navbar-expand navbar-light bg-light" aria-label="First navbar example">
    <div class="container-fluid">
      <a class="navbar-brand " href="#">Donasi</a>
    </div>
    <header class="">
      <div
        class="container-fluid d-grid gap-3 align-items-center"
        style="grid-template-columns: 1fr 2fr"
      >
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 dropdown">
            <a
              href="#"
              class="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
              <strong class="profile">name</strong>
            </a>
            <ul
              class="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser2"
            >
              <li><router-link class="dropdown-item" :class="{'active': this.$route.path === '/profile', 'link-dark': !(this.$route.path==='/')}" to="/profile">Profile</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" v-on:click="logout" href="">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </nav>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
export default {
  name: 'navbar',
  methods: {
    logout () {
      Cookies.remove('token')
      axios.post('https://backenddonasitv.binbaz.or.id/api/logout')
        .then((result) => {
          console.log(result.data)
        })
      return this.$router.push('/login')
    }
  }
}
</script>

<style>
.profile {
  margin: 5px;
}
</style>
