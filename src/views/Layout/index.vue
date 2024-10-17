<template>
    <div class="flex flex-col h-screen">
        <Header />
        <Main />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from "./components/Header/index.vue";
import Main from "./components/Main/index.vue";
import Footer from "./components/Footer/index.vue";
</script>

<style scoped></style>