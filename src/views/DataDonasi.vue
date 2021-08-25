<template>
  <div class="container mt-5 mb-5">
    <router-link to="/to-tv" class="btn btn-primary mb-4" :class="{ 'active': this.$route.path === '/'}" aria-current="page">
      Show Table on Tv
    </router-link>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3 row">
            <label for="per-page" class="col-sm-2 col-form-label">Show</label>
            <div class="col-sm-8">
              <b-form-select id="per-page" :options="pageOptions" v-model="perPage" size="sm" class="form-select"></b-form-select>
            </div>
            <label for="per-page" class="col-sm-2 col-form-label" style="padding-left: 0">Data</label>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-3">
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <b-table striped responsive
          :items="info"
          :fields="field"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          @filtered="onFiltered"
          ref="data_tabel"
          >
          <template #cell(no)="row">
            <span>{{ row.index+1 }}</span>
          </template>
          <template #cell(date)="row">
            <span>{{ textDate(row.item.date) }}</span>
          </template>
          <template #cell(nominal)="row">
            <span>Rp {{formatNomminal(row.item.nominal)}},-</span>
          </template>
          <!-- Tombol Aksi -->
          <template #cell(aksi)="row">
            <b-button type="button" variant="primary" size="sm" @click="editForm(row.item)" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Edit
            </b-button>
            <button class="btn btn-danger btn-sm" style="margin-left: 2px" @click="hapus(row.item.id)">Hapus</button>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0 col-sm-6"
        ></b-pagination>
        <!-- MODAL -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="form-data" @submit.prevent="store">
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Tanggal</label>
                    <div class="col-sm-10">
                      <b-form-datepicker id="datepicker-placeholder" v-model="editData.date" name='date' placeholder="Chouse Date" locale="id"></b-form-datepicker>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Nama</label>
                    <div class="col-sm-10">
                      <input type="text" v-model="editData.name" class="form-control" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Alamat</label>
                    <div class="col-sm-10">
                      <input type="text" v-model="editData.address" class="form-control" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Nominal</label>
                    <div class="col-sm-10">
                      <input type="text" v-model="editData.nominal" class="form-control" />
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="storeEdit" data-bs-dismiss="modal">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import axios from 'axios'
import moment from 'moment'
require('moment/locale/id')
export default {
  data () {
    return {
      sortBy: 'no',
      sortDesc: false,
      info: [],
      filter: '',
      totalRows: 1,
      currentPage: 1,
      pageOptions: [5, 10, 20],
      perPage: 10,
      editData: {
        id: '',
        date: '',
        name: '',
        nominal: '',
        address: ''
      },
      field: [
        { key: 'no', label: 'No', sortable: true },
        { key: 'date', label: 'Tanggal', sortable: true },
        { key: 'name', label: 'Nama', sortable: true },
        { key: 'address', label: 'Alamat', sortable: true },
        { key: 'nominal', label: 'Nominal', sortable: true },
        { key: 'aksi', label: 'Aksi', sortable: true }
      ],
      row: []
    }
  },
  beforeMount: function () {
    this.getData()
  },
  methods: {
    hapus: function (id) {
      axios.post('https://backenddonasitv.binbaz.or.id/api/donatur/' + id + '/delete')
        .then((response) => {
          alert('Data berhasil dihapus')
          console.log(response)
          this.getData()
          this.$refs.data_tabel.refresh()
        }).catch((error) => {
          console.log(error.response)
        })
    },
    getData: function () {
      axios.get('https://backenddonasitv.binbaz.or.id/api/donatur')
        .then((response) => {
          this.info = response.data.data
          this.totalRows = this.info.length
        }).catch((error) => {
          console.log(error.response)
        })
    },
    onFiltered: function (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    editForm: function (item) {
      // const date = new Date(item.date)
      this.editData.id = item.id
      this.editData.date = moment(item.date).format('YYYY-MM-DD')
      this.editData.name = item.name
      this.editData.address = item.address
      this.editData.nominal = item.nominal
      // console.log(this.editData.date)
    },
    storeEdit: function () {
      axios.post('https://backenddonasitv.binbaz.or.id/api/donatur/' + this.editData.id, {
        name: this.editData.name,
        date: this.editData.date,
        nominal: this.editData.nominal,
        address: this.editData.address
      }).then((result) => {
        this.getData()
        this.$refs.data_tabel.refresh()
      }).catch((error) => {
        console.log(error.response)
      })
      console.log(this.editData.date)
    },
    textDate: function (tgl) {
      return moment(tgl).local('id').format('dddd, D MMMM YYYY')
    },
    formatNomminal: function (nominal) {
      // console.log(nominal)
      const reverse = nominal.toString().split('').reverse().join('')
      var ribuan = reverse.match(/\d{1,3}/g)
      ribuan = ribuan.join('.').split('').reverse().join('')
      // console.log(ribuan)
      return ribuan
    }
  }
}

</script>

<style>
</style>
