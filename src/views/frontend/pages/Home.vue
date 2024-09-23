<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 m-auto ">
          <div class="card mt-5">
            <div class="card-header">
              <h2 class="text-center"> Pre Order </h2>
            </div>
            <div class="card-body">

              <form>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name"
                         v-model="form.name">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="form.email" @input="checkEmail" />

                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label">Product</label>

                  <select class="form-select" aria-label="Default select example" v-model="form.product_id">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="mb-3" v-if="showPhone">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="text" class="form-control" id="phone"
                         v-model="form.phone">
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="button" @click="submit()">Submit</button>
                </div>
                <div>
                  <p class="text-center"> Don't Have an account?
                    <router-link to="/register">Sign Up</router-link>
                  </p>
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
import SweetAlert from "@/service/sweetalert";

export default {
  name: "Login.vue",
  data() {
    return {
      form: {},
      showPhone: false
    }
  },
  methods: {
    checkEmail() {
      this.showPhone = this.form.email.endsWith("@xyz.com");
    },
    submit() {
      console.log(this.form)
      ApiService.post('pre-order', this.form)
        .then(response => {
          console.log(response)
          SweetAlert.success(response.data.message);
        })
        .catch(error => {
          console.log(error)
          SweetAlert.error(error.data.message);
        })

    }
  }
}
</script>

