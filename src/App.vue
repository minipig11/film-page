<template>
  <NavBar />
  <router-view></router-view>
  <Footer />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
/* 全局样式 */
</style>