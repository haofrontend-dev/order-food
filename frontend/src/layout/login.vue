<template>
    <div class="container-login">
        <router-view />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .container-login {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        background: linear-gradient(-135deg,#c850c0,#4158d0);
    }
</style>