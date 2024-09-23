<template>
  <div>
    <ul class="nav flex-column">

      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link  text-light " :class="$route.path == '/dashboard' ? 'active' : ''"

        >Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/pre-order" class="nav-link text-light "

                     :class="$route.path == '/pre-order' ? 'active' : ''"
        >Pre Order
        </router-link>
      </li>


    </ul>

  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
.active {
  background-color: #115679 !important;
}
</style>
