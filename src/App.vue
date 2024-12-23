<template>
 <div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <div class="container">
    <div class="btn-group-sm">
     <router-link
       class="btn btn-outline-primary mx-2"
       to="/"
       active-class="active-link"
     >
      ROI Calculator
     </router-link>
     <router-link
       class="btn btn-outline-primary mx-2"
       to="/tokens"
       active-class="active-link"
     >
      Token Calculator
     </router-link>
     <router-link
       class="btn btn-outline-primary mx-2"
       to="/about"
       active-class="active-link"
     >
      About
     </router-link>
    </div>
   </div>
  </nav>

  <!-- Main content area where the pages will load -->
  <router-view />
 </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import './assets/styles/main.css';

const router = useRouter()

onMounted(() => {
 // Listen for navigation events from the main process
 window.electronAPI.onNavigate((event, route) => {
  router.push(route)
 })
})
</script>

<style scoped>
/* Add your custom active link style */
.active-link {
 background-color: #0d6efd;
 color: white !important;
 border-color: #0d6efd;
}

.navbar {
 margin-bottom: 1rem;
}

.navbar-light .navbar-nav .nav-link {
 font-size: 1rem;
}

.navbar-light .navbar-nav .nav-link.active-link {
 background-color: #0d6efd;
 color: white;
}

.btn-group-sm .btn {
 font-weight: bold;
}

/* Additional styles to fine-tune the look of the navigation bar */
.navbar-light .navbar-nav .nav-link:hover {
 background-color: #e2e6ea;
}
</style>
