<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    document.title = 'Shopee Food'
})
</script>

<style scoped>

</style>