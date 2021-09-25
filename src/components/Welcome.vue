<template>
<div class="container">
    <div class="logo"><img alt="Vue logo" src="../assets/logo.png"> </div>
    {{msg}}
    <Projects />
</div>
</template>

<script>
import Projects from "@/components/projects";
export default {
    components: {
        Projects
    },
    name: 'Welcome',
    props: {
        msg: String
    }
}
</script>

<style scoped>
.container {
    color: #FFF;
     display: flex;
     flex: 1;
     flex-direction: column;
     justify-items: center;
}
.logo {
  justify-content: center;
  align-items: center;
  display: flex;
}
.logo img {
  width: 10vh;
}
</style>
