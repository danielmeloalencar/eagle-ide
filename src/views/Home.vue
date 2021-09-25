<template>
<div class="container">
    <Welcome msg="EAGLE IDE" />
</div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

export default {
    name: 'Home',
    components: {
        Welcome
    }
}
</script>

<style scoped>
.container {
    color: rgb(119, 118, 118);
    margin: 20px;
    font-style: italic;
}
</style>
