<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div id="news-container">
          <ul class="">
            <li class="daftar-list" id="list-donatur">
              <span>{{formatDate(data.date)}} | {{data.name}} ({{data.address}}) - Rp {{formatNomminal(data.nominal)}},-</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import moment from 'moment'
require('moment/locale/id')
export default {
  data () {
    return {
      info: [],
      data: []
    }
  },
  computed: {
    namesLength: function () {
      return this.info.length
    }
  },
  mounted: function () {
    $('#list-donatur').hide()
    axios.get('https://backenddonasitv.binbaz.or.id/api/donatur')
      .then((response) => {
        // console.log(response.data.data)
        var now = new Date()
        now = moment(now).format('YYYY-MM-D')
        for (let i = 0; i < response.data.data.length; i++) {
          var date = moment(response.data.data[i].date).diff(now, 'day')
          console.log(date + '>= -30')
          if (date >= -30) {
            this.info.push(response.data.data[i])
            this.data = response.data.data[i]
          }
        }
        console.log(this.info)
        // setTimeout(() => {
        $('#list-donatur').slideDown()
        $('#list-donatur').show()
        setTimeout(() => {
          $('#list-donatur').slideUp()
        }, 5000)

        // }, 1000);
      })
  },
  created: function () {
    let i = 0
    setInterval(() => {
      const index = i++ % this.namesLength
      // console.log(index + '= ' + i + '%' + this.namesLength)
      this.data = this.info[index]
      // setTimeout(() => {
      $('#list-donatur').slideDown()
      // }, 1000);
      setTimeout(() => {
        $('#list-donatur').slideUp()
      }, 6500)
    }, 7000)
  },
  methods: {
    formatDate: function (tgl) {
      return moment(tgl).local('id').format('D MMMM YYYY')
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
#news-container ul li
{
font-size: 30px;
}
#news-container{
position: absolute !important;
top: 0;
/* height: 100px; */
width: 100%;
background: transparent;
font-weight: 1000;
color: black;
padding: 2px;
}
.daftar-list{
  list-style-type: none;
  background: transparent;
  margin: 0;
  padding: 0;
}
</style>
