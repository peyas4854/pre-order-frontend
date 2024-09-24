<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 m-auto">
          <div class="card mt-5">
            <div class="card-header">
              <h2 class="text-center">Login</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="login"> <!-- Prevent default form submission -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="form.email"
                         required/>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="form.password" required/>
                </div>
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="submit">Sign In</button> <!-- Changed to submit button -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/service/api.service";
import JwtService from "@/service/jwt.service"; // Uncomment if you want to save the token
import SweetAlert from "@/service/sweetalert";
import {useAuthStore} from "@/stores/auth";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      const authStore = useAuthStore();
      try {
        const res = await ApiService.post('/login', this.form);
        console.log('Response:', res.data.data.token);
        JwtService.saveToken(res.data.data.token);
        ApiService.init();
        authStore.SET_USER(res.data.data.user);
        authStore.SET_TOKEN(res.data.data.token);
        authStore.SET_AUTHENTICATED(true);
        authStore.REDIRECT_AFTER_LOGIN();
      } catch (error) {
        SweetAlert.error(error.response.data.message);
        console.log('Error:', error.response.data.message);
      }
    }
  }
}
</script>
