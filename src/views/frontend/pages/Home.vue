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
              <form @submit.prevent="submit">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="form.email" @input="checkEmail" />
                </div>

                <div class="mb-3">
                  <label for="product" class="form-label">Product</label>
                  <select class="form-select" v-model="form.product_id">
                    <option selected disabled>Select a product</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="mb-3" v-if="showPhone">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="text" class="form-control" id="phone" v-model="form.phone">
                </div>
                <div class="text-center">
                  <div :data-sitekey="recaptchaSiteKey" class="g-recaptcha">

                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="submit">Submit</button>
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
  name: "PreOrder",
  data() {
    return {
      form: {},
      showPhone: false,
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  },
  methods: {
    checkEmail() {
      this.showPhone = this.form.email.endsWith("@xyz.com");
    },
    submit() {
      const recaptchaResponse = grecaptcha.getResponse();
      if (recaptchaResponse.length === 0) {
        SweetAlert.error('Please complete the reCAPTCHA.');
        return;
      }

      this.form.recaptcha = recaptchaResponse; // Include the reCAPTCHA response in the form

      ApiService.post('pre-order', this.form)
          .then(response => {
            console.log(response);
            SweetAlert.success(response.data.message);
          })
          .catch(error => {
            console.log(error);
            SweetAlert.error(error.response.data.message || 'An error occurred.');
          });
    }
  }
}
</script>
