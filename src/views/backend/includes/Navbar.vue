<template>
  <div>
    <ul class="nav navbar-dark  justify-content-end p-3 dashboard_navbar">
      <li class="nav-item">
        <div class="dropdown">
          <button class="btn btn-info  dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
            dfg
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item " href="javascript:void(0)" @click="logout()">Logout</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { useAuthStore } from "@/stores/auth";
import ApiService from "@/service/api.service";
import JwtService from "@/service/jwt.service";
import sweetalert from "@/service/sweetalert";
import jwtService from "@/service/jwt.service";

export default {
  name: "Navbar",
  methods: {
    async logout() {
      const token = JwtService.getToken();
      const authStore = useAuthStore();
      try {
        if (token) {
          await ApiService.post('/logout');
          authStore.SET_AUTHENTICATED(false);
          authStore.SET_USER({});
          authStore.SET_TOKEN(null);
          jwtService.destroyToken();
        }
      } catch (error) {
        console.log('Error during logout:', error.response ? error.response.data : error);
        sweetalert.error(error.response ? error.response.data.message : 'Error during logout');
      } finally {
        this.$router.push({ name: "login" });
      }
    }

  }
}
</script>

<style scoped>
.dashboard_navbar {
  position: fixed;
  width: 100%;
  background-color: #2d3748;
  z-index: 999;
}
</style>
