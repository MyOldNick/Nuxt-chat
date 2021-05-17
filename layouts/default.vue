<template>
  <v-app>
    <div class="background-layout">
      <NavBar />
      <v-container>
        <nuxt />
      </v-container>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {}
</script>

<style>

  .background-layout {
    background-color: #586670;
    height: 100%;
    overflow-x: hidden;
  }
</style>
