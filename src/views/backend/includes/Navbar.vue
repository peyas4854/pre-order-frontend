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


import ApiService from "@/service/api.service";
import JwtService from "@/service/jwt.service";

export default {
    name   : "Navbar",

    methods: {

        logout() {
          const token = JwtService.getToken();
          if (typeof token != "undefined") {
            ApiService.post('/logout').then(res => {
              JwtService.destroyToken();
              // store.commit("LOG_OUT", {});
              this.$router.push({name: "login"});
            }).catch(error => {
              console.log('error', error);
            })
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
