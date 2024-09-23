<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex bd-highlight mb-3">
                            <h2> Pre Order List </h2>
                        </div>
                    </div>
                    <div id="loader" v-if="loader">
                        <loader/>
                    </div>
                    <div class="card-body" v-else>
                        <div class="from-group d-flex flex-row-reverse">
                            <button type="button" class="btn btn-success" @click="getPreOrders()">Search</button>
                            <input type="text" class="search form-control" id="search-box" placeholder="Search"
                                   v-model="form.search">

                        </div>
                        <table class="table table-striped product-table">
                            <thead>
                            <tr>
                                <th scope="col">Sl <i class="fad fa-laugh-wink"></i></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Product</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-if="preOrders.length">
                                <tr v-for="(preOrder,index) in preOrders " :key="index">
                                    <td scope="row"> {{ ++index }}</td>
                                    <td scope="row"> {{ preOrder.name }}</td>
                                    <td scope="row"> {{ preOrder.email }}</td>
                                    <td scope="row"> {{ preOrder.phone ?? "-" }}</td>
                                    <td scope="row"> {{ preOrder?.product.name }}</td>

                                    <td>
                                        <div class="d-grid gap-2 d-md-block">

                                            <button class="btn btn-danger" type="button" @click="destroy(preOrder.id)">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="6" class="text-center fs-2">
                                        No data Found!
                                    </td>
                                </tr>
                            </template>

                            </tbody>
                        </table>
                        <div>
                            <pagination v-if="preOrders.length > 0" :pagination="pagination"
                                        @paginate="getPreOrders()" @callParentMethod="getPreOrders" :offset="5"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ApiService from '@/service/api.service';
import pagination from '@/components/Pagination';
import SweetAlert from "@/service/sweetalert";

export default {
    name: "index",
    data() {
        return {
            preOrders: [],
            pagination: {
                current_page: 1,
            },
            form: {
                per_page: 10,
                search: '',
            },
            loader: false,

        }
    },
    components: {
        pagination,
    },
    mounted() {
        this.getPreOrders();
    },
    methods: {
      getPreOrders() {
            this.loader = true;
            let params = {
                ...this.form,
                page: this.pagination.current_page
            }
            ApiService.get('/pre-order', {params: params}).then((response) => {
                console.log('response',response.data.data)
                this.preOrders = response.data.data;
                this.pagination = response.data.meta;
                this.loader = false;
            }).catch((error) => {
                console.log('error', error)
            });
        },
        destroy(id) {
            console.log('id', id);
            ApiService.delete(`/pre-order/${id}`).then((response) => {
                this.getPreOrders();
                SweetAlert.success(response.data.message);
            }).catch((error) => {
                console.log('error', error)
            });
        },
    }
}
</script>


