<!-- <template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// must match the `path` values in router/index.js
const cycleRoutes = ['/', '/cycle1', '/cycle2']
let currentIndex = 0

onMounted(() => {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cycleRoutes.length
    router.push(cycleRoutes[currentIndex])
  }, 10000) // 10 seconds per screen
})
</script> -->
<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Must match the paths in router/index.js
const cycleRoutes = ['/', '/cycle1', '/cycle2']
let currentIndex = 0

onMounted(() => {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cycleRoutes.length
    router.push(cycleRoutes[currentIndex])
  }, 10000) // 10 seconds per screen
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

