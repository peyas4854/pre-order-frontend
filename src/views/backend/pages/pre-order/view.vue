<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex bd-highlight mb-3">
              <h2> Pre Order View </h2>
            </div>
          </div>
          <div id="loader" v-if="loader">
            <loader/>
          </div>

          <div class="card-body" v-else>
            <div v-if="preOrder && preOrder.product">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> {{ preOrder.name }}</p>
              <p><strong>Email:</strong> {{ preOrder.email }}</p>

              <h4>Product Information</h4>
              <p><strong>Product Name:</strong> {{ preOrder.product.name }}</p>

              <h4>Order Dates</h4>
              <p><strong>Created At:</strong> {{ preOrder.created_at }}</p>
              <p><strong>Updated At:</strong> {{ preOrder.updated_at }}</p>
            </div>
            <div v-else>
              <p>No pre-order information available.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import ApiService from "@/service/api.service";

export default {
  name: "index",
  data() {
    return {
      loader: false,
      preOrder: {}
    }
  },
  mounted() {
    this.viewPreOrder();
  },
  methods: {
    viewPreOrder() {
      this.loader = true;
      const id = this.$route.params.id;
      ApiService.get(`/pre-order/${id}`).then((response) => {
        console.log('response', response.data.data)
        this.preOrder = response.data.data;
        this.loader = false;
      }).catch((error) => {
        console.log('error', error)
      });

    }

  }
}
</script>


