<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";

import Sidebar from "./Layout/LeftColumn.vue";
import Topbar from "./Layout/Topbar.vue";
import Toast from "./Notifications/Toast.vue";
</script>

<template>
  <div>
    <div id="sidebar">
      <Sidebar />
    </div>

    <div id="main" class="layout-navbar navbar-fixed">
      <Topbar />

      <!-- Page Content -->
      <div id="main-content">
        <RouterView />
      </div>

      <footer>
        <div class="footer clearfix mb-0 text-muted">
          <div class="float-start">
            <p>2023 &copy; Mazer</p>
          </div>
          <div class="float-end">
            <p>
              Crafted with
              <span class="text-danger"
                ><i class="bi bi-heart-fill icon-mid"></i
              ></span>
              by <a href="https://saugi.me">Saugi</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>

  <Toast />
</template>

<style lang="scss" scoped>
#main {
  margin-left: 300px;
  //padding: 2rem;
  min-height: 100vh;
  @media screen and (max-width: 1199px) {
    margin-left: 0;
  }
  &.layout-navbar {
    padding: 0;
    transition: margin-left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &.layout-horizontal {
    padding: 0;
    margin: 0;
  }
  #main-content {
    padding: 0.5rem 2rem;
  }
}
//.page {
//  padding: 2rem;
//}
</style>
>
