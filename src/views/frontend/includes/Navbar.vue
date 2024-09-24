<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-4 fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Shop</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
          </li>

        </ul>
        <ul class="navbar-nav" >
          <li class="nav-item">
            <router-link to="login" type="button" class="btn btn-primary me-2"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Login"
            ><i class="fa-solid fa-user"></i></router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>


import {useAuthStore} from "@/stores/auth";

export default {
  name: "Navbar",
  computed: {
    // Computed property to get the user from the auth store
    currentUser() {
      const authStore = useAuthStore();
      console.log('current',authStore.user);
      return authStore.user; // Assuming 'user' is the state that stores the current user
    }
  },
  methods: {
    logout() {

    }
  }

}
</script>
