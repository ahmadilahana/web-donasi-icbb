<template>
  <div>
    <form class="form-data" @submit.prevent="store">
      <div class="title">
        <h4>
          <strong>Input Donasi</strong>
        </h4>
      </div>
      <hr />
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Tanggal</label>
        <div class="col-sm-4">
          <b-form-datepicker id="datepicker-placeholder" v-model="date" placeholder="Choose a date" locale="id"></b-form-datepicker>
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Nama</label>
        <div class="col-sm-4">
          <input type="text" v-model="nama" class="form-control" />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Alamat</label>
        <div class="col-sm-4">
          <input type="text" v-model="alamat" class="form-control" />
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Nominal</label>
        <div class="col-sm-4">
          <input type="text" v-model="nominal" class="form-control" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary form-control">Tambah</button>
    </form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      token: Cookies.get('token'),
      date: '',
      nama: '',
      alamat: '',
      nominal: ''
    }
  },
  methods: {
    store () {
      // console.log( dateFormat(date, 'Y-m-d') ) py ws nemu?
      return axios.post('https://backenddonasitv.binbaz.or.id/api/donatur', {
        name: this.nama,
        date: this.date,
        nominal: this.nominal,
        address: this.alamat
      }).then((result) => {
        console.log(result.data)
        this.$router.push('/data-donasi')
      }).catch((error) => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style>
.form-data {
  padding: 20px;
}
</style>
