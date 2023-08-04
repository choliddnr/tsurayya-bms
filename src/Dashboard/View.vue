<script setup>
import { onMounted } from 'vue'
import '@/assets/scss/app.scss'
import '@/assets/scss/themes/dark/app-dark.scss'
import '@/assets/static/images/logo/favicon.svg'
import '@/assets/static/images/logo/favicon.png'
import '@/assets/static/js/initTheme.js'
import '@/assets/scss/iconly.scss'

import ApexCharts from "apexcharts"

var optionsProfileVisit = {
  annotations: {
    position: "back",
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    type: "bar",
    height: 300,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {},
  series: [
    {
      name: "sales",
      data: [9, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
    },
  ],
  colors: "#435ebe",
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
}
let optionsVisitorsProfile = {
  series: [70, 30],
  labels: ["Male", "Female"],
  colors: ["#435ebe", "#55c6e8"],
  chart: {
    type: "donut",
    width: "100%",
    height: "350px",
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "30%",
      },
    },
  },
}

var optionsEurope = {
  series: [
    {
      name: "series1",
      data: [310, 800, 600, 430, 540, 340, 605, 805, 430, 540, 340, 605],
    },
  ],
  chart: {
    height: 70,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#5350e9"],
  stroke: {
    width: 2,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
      "2018-09-19T07:30:00.000Z",
      "2018-09-19T08:30:00.000Z",
      "2018-09-19T09:30:00.000Z",
      "2018-09-19T10:30:00.000Z",
      "2018-09-19T11:30:00.000Z",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  show: false,
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
}

let optionsAmerica = {
  ...optionsEurope,
  colors: ["#008b75"],
}
let optionsIndonesia = {
  ...optionsEurope,
  colors: ["#dc3545"],
}




onMounted(() => {
  
  var chartProfileVisit = new ApexCharts(
    document.getElementById("chart-profile-visit"),
    optionsProfileVisit
  )
  var chartVisitorsProfile = new ApexCharts(
    document.getElementById("chart-visitors-profile"),
    optionsVisitorsProfile
  )
  var chartEurope = new ApexCharts(
    document.querySelector("#chart-europe"),
    optionsEurope
  )
  var chartAmerica = new ApexCharts(
    document.querySelector("#chart-america"),
    optionsAmerica
  )
  var chartIndonesia = new ApexCharts(
    document.querySelector("#chart-indonesia"),
    optionsIndonesia
  )
  chartIndonesia.render()
  chartAmerica.render()
  chartEurope.render()
  chartProfileVisit.render()
  chartVisitorsProfile.render()
})


</script>

<template>
  <div class="page">
    <div class="page-heading">
      <h3>Dashboard</h3>
    </div>
    <div class="page-content">
      <section class="row">
        <div class="col-12 col-lg-9">
          <div class="row">
            <div class="col-6 col-lg-4 col-md-6">
              <div class="card">
                
                <!-- <div id="chart-europe" class="chart"></div> -->
                <!-- <div class="card-header">
                  
                </div> -->
                <div class="card-body">
                  <h6 class="text-muted font-semibold">
                    Profile Views
                  </h6>
                  <h6 class="font-extrabold mb-0">112.000</h6>
                  <!-- <div class="row">
                    
                  </div> -->
                  <!-- <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon purple mb-2">
                        <b class="account-name-tile">BRI</b>
                        <i class="iconly-boldShow"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">
                        Profile Views
                      </h6>
                      <h6 class="font-extrabold mb-0">112.000</h6>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-4 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon blue mb-2">
                        <b class="account-name-tile">Flip</b>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Followers</h6>
                      <h6 class="font-extrabold mb-0">183.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-4 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon blue mb-2">
                        <b class="account-name-tile">Mlg</b>
                        <!-- <i class="iconly-boldProfile"></i> -->
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Followers</h6>
                      <h6 class="font-extrabold mb-0">183.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-4 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon blue mb-2">
                        <i class="iconly-boldProfile"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Followers</h6>
                      <h6 class="font-extrabold mb-0">183.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-3 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon blue mb-2">
                        <i class="iconly-boldProfile"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Followers</h6>
                      <h6 class="font-extrabold mb-0">183.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-3 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon blue mb-2">
                        <i class="bi bi-arrow-down-circle-fill"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Followers</h6>
                      <h6 class="font-extrabold mb-0">183.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-3 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon green mb-2">
                        <i class="iconly-boldAdd-User"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Following</h6>
                      <h6 class="font-extrabold mb-0">80.000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-3 col-md-6">
              <div class="card">
                <div class="card-body px-4 py-4-5">
                  <div class="row">
                    <div
                      class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start"
                    >
                      <div class="stats-icon red mb-2">
                        <!-- <i class="bi bi-arrow-down-circle"></i> -->
                        <i class="iconly-boldDownload"></i>
                      </div>
                    </div>
                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                      <h6 class="text-muted font-semibold">Saved Post</h6>
                      <h6 class="font-extrabold mb-0">112</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h4>Profile Visit</h4>
                </div>
                <div class="card-body">
                  <div id="chart-profile-visit"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-xl-4">
              <div class="card">
                <div class="card-header">
                  <h4>Profile Visit</h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-7">
                      <div class="d-flex align-items-center">
                        <i class="bi-circle-fill"></i>
                        <h5 class="mb-0 ms-3">Europe</h5>
                      </div>
                    </div>
                    <div class="col-5">
                      <h5 class="mb-0 text-end">862</h5>
                    </div>
                    <div class="col-12">
                      <div id="chart-europe"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-7">
                      <div class="d-flex align-items-center">
                        
                        <i class="bi-circle-fill"></i>
                        <h5 class="mb-0 ms-3">America</h5>
                      </div>
                    </div>
                    <div class="col-5">
                      <h5 class="mb-0 text-end">375</h5>
                    </div>
                    <div class="col-12">
                      <div id="chart-america"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-7">
                      <div class="d-flex align-items-center">
                        <i class="bi-circle-fill"></i>
                        <h5 class="mb-0 ms-3">Indonesia</h5>
                      </div>
                    </div>
                    <div class="col-5">
                      <h5 class="mb-0 text-end">1025</h5>
                    </div>
                    <div class="col-12">
                      <div id="chart-indonesia"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-xl-8">
              <div class="card">
                <div class="card-header">
                  <h4>Latest Comments</h4>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover table-lg">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="col-3">
                            <div class="d-flex align-items-center">
                              <div class="avatar avatar-md">
                                <img src="@/assets/static/images/faces/5.jpg" />
                              </div>
                              <p class="font-bold ms-3 mb-0">Si Cantik</p>
                            </div>
                          </td>
                          <td class="col-auto">
                            <p class="mb-0">
                              Congratulations on your graduation!
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td class="col-3">
                            <div class="d-flex align-items-center">
                              <div class="avatar avatar-md">
                                <img src="@/assets/static/images/faces/2.jpg" />
                              </div>
                              <p class="font-bold ms-3 mb-0">Si Ganteng</p>
                            </div>
                          </td>
                          <td class="col-auto">
                            <p class="mb-0">
                              Wow amazing design! Can you make another
                              tutorial for this design?
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <!-- <div class="card">
            <div class="card-body py-4 px-4">
              <div class="d-flex align-items-center">
                <div class="avatar avatar-xl">
                  <img src="@/assets/static/images/faces/1.jpg" alt="Face 1" />
                </div>
                <div class="ms-3 name">
                  <h5 class="font-bold">John Duck</h5>
                  <h6 class="text-muted mb-0">@johnducky</h6>
                </div>
              </div>
            </div>
          </div> -->
          <div class="card">
            <div class="card-body">
               
              <div class="d-flex align-items-center">
                <div class="stats-icon blue mb-2">
                  <i class="iconly-boldWallet"></i>
                  <!-- <b class="account-name-tile">Flip</b> -->
                </div>
                <div class="ms-3 name">
                  <h6 class="font-extrabold mb-0">Rp 1.000.000</h6>
                  <h6 class="text-muted mb-0">Balance</h6>
                </div>
              </div>
              <hr>
              <div class="d-flex align-items-center">
                <div class="stats-icon green mb-2">
                  <i class="iconly-boldDownload"></i>
                  <!-- <b class="account-name-tile">Flip</b> -->
                </div>
                <div class="ms-3 name">
                  <h6 class="font-extrabold mb-0">Rp 1.000.000</h6>
                  <h6 class="text-muted mb-0">Cash In</h6>
                </div>
              </div>
              <hr>
              <div class="d-flex align-items-center">
                <div class="stats-icon red mb-2">
                  <i class="iconly-boldUpload"></i>
                  <!-- <b class="account-name-tile">Flip</b> -->
                </div>
                <div class="ms-3 name">
                  <h6 class="font-extrabold mb-0">Rp 1.000.000</h6>
                  <h6 class="text-muted mb-0">Cash Out</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h4>Recent Messages</h4>
            </div>
            <div class="card-content pb-4">
              <div class="recent-message d-flex px-4 py-3">
                <div class="avatar avatar-lg">
                  <img src="@/assets/static/images/faces/4.jpg" />
                </div>
                <div class="name ms-4">
                  <h5 class="mb-1">Hank Schrader</h5>
                  <h6 class="text-muted mb-0">@johnducky</h6>
                </div>
              </div>
              <div class="recent-message d-flex px-4 py-3">
                <div class="avatar avatar-lg">
                  <img src="@/assets/static/images/faces/5.jpg" />
                </div>
                <div class="name ms-4">
                  <h5 class="mb-1">Dean Winchester</h5>
                  <h6 class="text-muted mb-0">@imdean</h6>
                </div>
              </div>
              <div class="recent-message d-flex px-4 py-3">
                <div class="avatar avatar-lg">
                  <img src="@/assets/static/images/faces/1.jpg" />
                </div>
                <div class="name ms-4">
                  <h5 class="mb-1">John Dodol</h5>
                  <h6 class="text-muted mb-0">@dodoljohn</h6>
                </div>
              </div>
              <div class="px-4">
                <button
                  class="btn btn-block btn-xl btn-outline-primary font-bold mt-3"
                >
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h4>Visitors Profile</h4>
            </div>
            <div class="card-body">
              <div id="chart-visitors-profile"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  html[data-bs-theme=dark] .stats-icon .account-name-tile, .stats-icon .account-name-tile {
    color: #fff;
    font-size: 1.2rem;
  }
  .chart {
    width: 200px;
    position: sticky;
    left: -500px;
  }
  .apexcharts-canvas {
    position: absolute;
    user-select: none;
}
</style>