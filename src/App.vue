<template>
 <div id="app">
  <nav>
   <div class="btn-group-sm">
    <router-link class="btn btn-outline-primary mx-2" to="/">ROI Calculator</router-link>
    <router-link class="btn btn-outline-primary me-2" to="/tokens">Token Calculator</router-link>
    <router-link class="btn btn-outline-primary me-2" to="/about">About</router-link>
   </div>
  </nav>
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
</style>
